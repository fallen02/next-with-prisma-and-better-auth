"use client";
import { authClient, emailOtp, signOut } from "@/lib/auth-client";
import React from "react"
import { useRouter } from "next/navigation";

function HomePage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    })
  }
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome {session?.user?.name}</p>
      <button
        onClick={() =>
          emailOtp.sendVerificationOtp({
            email: session?.user?.email || "",
            type: "email-verification",
          })
        }
      >
        Send
      </button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default HomePage;
