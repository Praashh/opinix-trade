"use server";
import prisma from "@/server/prisma";

export const verifySMSOTPAction = async (otp: string, phoneNumber: string) => {
  try {
    const otpData = await prisma.oTP.findUnique({
      where: {
        otpID: phoneNumber,
        otp,
      },
    });
    console.log(otpData);

    if (!otpData) {
      return { verified: false, message: "OTP not found" };
    }

    if (otpData.otp !== otp) {
      return { verified: false, message: "Invalid OTP" };
    }

    if (otpData.expiresAt <= new Date()) {
      await prisma.oTP.delete({
        where: { otpID: phoneNumber, otp },
      });
      return { verified: false, message: "OTP expired" };
    }

    // Set OTP as verified
    await prisma.oTP.update({
      where: { otpID: phoneNumber, otp },
      data: { isVerified: true, }, // TODO: otp: "" fix
    });

    return { verified: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { verified: false, message: "An error occurred" };
  }
};
