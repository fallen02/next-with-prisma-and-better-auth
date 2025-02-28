import { Resend } from 'resend';
import { EmailVerificationEmail } from '@/email_templates/email_verification';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_EMAIL_API);

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log(body)
  try {
    const { data, error } = await resend.emails.send({
      from: 'MyPromo <info@mypromo.in>',
      to: [body.email],
      subject: 'Hello world',
      react: EmailVerificationEmail({ validationCode: body.otp }),
    });

    if (error) return NextResponse.json({ error }, { status: 500 });
    

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}