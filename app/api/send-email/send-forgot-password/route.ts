import { Resend } from 'resend';
import { EmailVerificationEmail } from '@/email_templates/email_verification';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log(body)
  try {
    const { data, error } = await resend.emails.send({
      from: 'MyPromo <info@mypromo.in>',
      to: [body.email],
      subject: 'Hello world',
      react: EmailVerificationEmail(body.otp),
    });

    if (error) return Response.json({ error }, { status: 500 });
    

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}