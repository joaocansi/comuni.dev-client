"use client";

import Image from "next/image";
import { Button, Input, Link } from "@heroui/react";

import { GithubIcon } from "@/src/shared/components/icons";
import { authClient } from "@/src/shared/clients/auth-client";

export default function SignIn() {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-2 max-w-sm w-full">
        <div className="flex gap-1 items-center">
          <Image alt="dev.gather" height={22} src="/logo.png" width={22} />
          <p className="font-bold text-2xl">
            dev<span className="text-primary">.gather</span>
          </p>
        </div>
        <p className="-mt-2">
          Join developer communities around you and connect with them.
        </p>
        <Input fullWidth label="Nome" variant="bordered" />
        <Input fullWidth label="Email" type="email" variant="bordered" />
        <Input fullWidth label="Password" type="password" variant="bordered" />
        <Button color="primary" size="lg">
          Sign Up
        </Button>
        <div className="flex gap-2">
          <Button
            fullWidth
            variant="bordered"
            onPress={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "http://localhost:8080",
              })
            }
          >
            <Image
              alt="Sign in with google"
              height={28}
              src="/google.webp"
              width={28}
            />
          </Button>
          <Button fullWidth variant="bordered">
            <GithubIcon size={32} />
          </Button>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="hover:underline" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
