"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEmailVerificationStore } from "@/store/email-verification";
import { emailOtp } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";

export default function EmailVerification() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { email, removeEmail } = useEmailVerificationStore();
  const handleSubmit = async () => {
    setLoading(true);
    await emailOtp.verifyEmail({
      email: email,
      otp: value,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("Email verified successfully");
          removeEmail();
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  useEffect(() => {
    if (!email) {
      router.push("/sign-in");
    }
  })
  return (
    <div className="flex flex-col justify-center items-center h-dvh gap-y-8">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button disabled={loading} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
