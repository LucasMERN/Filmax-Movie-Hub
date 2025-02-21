"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function AuthButton() {
  const router = useRouter();
  return (
    <>
      <SignedOut>
        <SignInButton
          mode="modal"
          appearance={{
            elements: {
              formButtonPrimary:
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-2 lg:h-10 lg:px-4",
              formFieldInput: "py-4",
              buttonArrowIcon: "hidden",
            },
          }}
        >
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            className="h-8 px-2 lg:h-10 lg:px-4"
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9 border-2 border-primary",
            },
          }}
        />
      </SignedIn>
    </>
  );
}

export default AuthButton;
