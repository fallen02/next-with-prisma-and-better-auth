"use client";
import { authClient, emailOtp, signOut } from "@/lib/auth-client";
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { useUserSession } from "@/store/user-session";

function HomePage() {
  const { data: session } =   authClient.useSession();
  const router = useRouter();
  // if(!session) {
  //   router.push("/sign-in");
  //   return null;
  // }

  // const {user, setUser} = useUserSession();

  useEffect(() => {
    
    // setUser();
    
    console.log('fetched');
  }, [router])


  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          console.error(ctx.error);
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
