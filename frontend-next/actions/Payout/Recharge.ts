"use server";
import prisma from "@/server/prisma";

export const DepositeMoneyInWallet = async (userId: string, amount: number) => {
  const isUserExists = await prisma.user.findUnique({ where: { id: userId } });
  if (!isUserExists) {
    return { success: false, message: "User Doesn't Exists!" };
  }
  try {
    const newRechage = await prisma.user.update({
      where: { id: userId },
      data: { balance: isUserExists.balance + parseFloat(amount.toString()) },
    });
    if (newRechage) {
    } else {
    }
  } catch (error) {
    return { success: false, error: "Error while doing recharge", err: error };
  }
};
