"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!session) {
    // Optionally, you can return null or a loading indicator here
    return null;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">{`Welcome, ${session.user.name}!`}</h1>
      <p className="mt-4">You are already logged in.</p>
      <Button
        className="mt-4"
        onClick={() => {
          authClient.signOut();
        }}
        variant="destructive"
      >
        Sign Out
      </Button>
    </div>
  );
}
