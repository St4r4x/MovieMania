import React from "react";
import { SigninForm } from "@/src/components/forms/SigninForm";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import Logo from "@/public/logo.png";

export const metadata: Metadata = {
   title: "Créer un compte",
};

const SigninPage = () => {
   return (
      <main className="flex flex-col items-center justify-center min-h-screen w-full gap-7">
         <Image src={Logo} alt="logo" width="300" height="300"></Image>
         <div className="w-auto p-10 rounded-3xl bg-none sm:bg-gradient-to-b sm:from-[rgba(66,242,247,0.1)] sm:to-[rgba(255,255,255,0.1)]">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
               <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-4xl font-semibold text-white">Créer un compte</h1>
                  <p className="text-sm text-muted-foreground text-white">
                     Saisissez votre email et un mot de passe pour créer votre compte
                  </p>
               </div>

               <SigninForm />

               <p className="text-center text-sm text-muted-foreground text-white">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-primary font-extrabold">
                     Connexion
                  </Link>
               </p>

               <p className="text-center text-sm text-muted-foreground text-white">
                  En cliquant sur continuer, vous acceptez nos <br />
                  <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
                     conditions de service
                  </Link>{" "}
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

export default SigninPage;
