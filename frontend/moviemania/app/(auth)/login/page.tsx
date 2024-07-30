import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { LoginForm } from "@/src/components/forms/LoginForm";

export const metadata: Metadata = {
   title: "Connexion",
};

const LoginPage = () => {
   return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
         <Image src={Logo} alt="logo" width="300" height="300"></Image>
         <div className=" w-auto p-10 rounded-3xl bg-gradient-to-b from-[rgba(66,242,247,0.1)] to-[rgba(255,255,255,0.1)]">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
               <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-4xl font-semibold text-white">Login</h1>
               </div>

               <LoginForm />

               <p className="text-center text-sm text-muted-foreground text-white">
                  Pas encore de compte ?{" "}
                  <Link href="/signin" className="text-primary font-extrabold">
                     S'inscrire
                  </Link>
               </p>

               <p className="text-center text-sm text-muted-foreground text-white">
                  En cliquant sur continuer, vous acceptez nos <br />
                  <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
                     conditions de service{" "}
                  </Link>
                  et notre{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
                     politique de confidentialité
                  </Link>
                  .
               </p>
            </div>
         </div>
      </main>
   );
};

export default LoginPage;
