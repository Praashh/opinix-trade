"use server";
import twilio from "twilio";
import prisma from '@/server/prisma';

export const sendSMSOTP = async (phoneNumber: string) => {
  let OTP = Math.floor(1000 + Math.random() * 9000).toString();
  // TODO: isOTP present or user is verified ?
  const newOTP = await prisma.oTP.create({
    data: {
      otpID: phoneNumber,
      otp: OTP,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });
  console.log("newOTp", newOTP);
  
  try {
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    console.log(twilioClient);
    
    const message = await twilioClient.messages.create({
      body: `Your OTP for OpiniX is ${OTP}, Do not share it with anyone!`,
      from: process.env.TWILIO_NUMBER,
      to: phoneNumber,
    });
    return { sucess: true };
  } catch (error) {
    console.error(error);
    return { sucess: false };
  }
};