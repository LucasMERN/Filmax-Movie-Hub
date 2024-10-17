"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getRequestToken } from "@/lib/api";
import { useRouter } from "next/navigation";

function SignInButton() {
  const router = useRouter();
  return (
    <Button
      type="submit"
      variant="secondary"
      size="sm"
      className="h-8 px-2 lg:h-10 lg:px-4"
      onClick={async () => {
        try {
          const { request_token } = await getRequestToken();
          if (request_token) {
            router.push(
              `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent(window.location.origin + "/")}`,
            );
          }
        } catch (error) {
          console.error("Error during sign-in process:", error);
        }
      }}
    >
      Sign In
    </Button>
  );
}

export default SignInButton;
