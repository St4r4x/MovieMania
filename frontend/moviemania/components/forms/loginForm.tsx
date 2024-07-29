"use client";

import React from "react";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/data/actions/auth-actions";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { ZodErrors } from "@/components/custom/ZodErrors";

const INITIAL_STATE = {
   data: null,
   zodErrors: null,
   message: null,
};

export function LoginForm() {
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);

   console.log(formState, "client");

   return (
      <div className={cn("grid gap-6")}>
         <form action={formAction}>
            <div className="grid gap-4">
               <div className="grid gap-1">
                  <div className="sr-only">Email</div>
                  <input
                     className="p-3 border border-gray-300 rounded-md"
                     id="email"
                     name="email"
                     placeholder="Email"
                     type="email"
                     autoCapitalize="none"
                     autoComplete="email"
                     autoCorrect="off"
                     disabled={isLoading}
                  />
                  <ZodErrors error={formState?.zodErrors?.email} />
               </div>
               <div className="grid gap-1">
                  <div className="sr-only">Password</div>
                  <input
                     className="p-3 border border-gray-300 rounded-md"
                     id="password"
                     name="password"
                     placeholder="Mot de passe"
                     type="password"
                     autoCorrect="off"
                     disabled={isLoading}
                  />
                  <ZodErrors error={formState?.zodErrors?.password} />
               </div>
               <Button variant="default" disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  VALIDER
               </Button>
            </div>
         </form>
         <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-xs uppercase text-muted-foreground text-white">Ou continuez avec</span>
            <div className="flex-grow border-t border-gray-300"></div>
         </div>
         <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <Icons.google className="mr-5 h-4 w-4" />
            )}{" "}
            Google
         </Button>
      </div>
   );
}
