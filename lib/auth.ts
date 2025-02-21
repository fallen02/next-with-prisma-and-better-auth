import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { emailOTP } from "better-auth/plugins";
// import { sendEmailVerificatiomOTP } from "./functions";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if(type === "email-verification") {
          sendEmailVerificatiomOTP({ email, otp })
        }  
        else if(type === "forget-password") {

        }
        else{

        }
      },
      disableSignUp: true,
      sendVerificationOnSignUp: true,
    }),
  ],
});



const sendEmailVerificatiomOTP = async ({email, otp}: {email:string, otp: string}) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/send-email/send-verification-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
    })

    console.log(response)

} catch (error) {
    console.error(error)
}
}


