"use server";
import { z } from "zod";
import { loginUserService, registerUserService } from "@/src/data/services/auth-services";

const schemaRegister = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
   }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
   const validatedFields = schemaRegister.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedFields.success) {
      return {
         ...prevState,
         zodErrors: validatedFields.error.flatten().fieldErrors,
         message: "Missing Fields. Failed to Register.",
      };
   }

   const responseData = await registerUserService(validatedFields.data);

   console.log("registerUserAction", responseData);

   if (!responseData) {
      return {
         ...prevState,
         zodErrors: null,
         message: "Ops! Something went wrong. Please try again.",
      };
   }

   if (responseData.error) {
      return {
         ...prevState,
         zodErrors: null,
         message: "Failed to Register.",
      };
   }

   return {
      ...prevState,
      zodErrors: null,
      message: "Inscription réussie!",
   };
}

const schemaLogin = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
   }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
   const validatedFields = schemaLogin.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedFields.success) {
      return {
         ...prevState,
         zodErrors: validatedFields.error.flatten().fieldErrors,
         message: "Missing Fields. Failed to Login.",
      };
   }

   const responseData = await loginUserService(validatedFields.data);

   console.log("loginUserAction responseData", responseData);

   if (!responseData) {
      return {
         ...prevState,
         zodErrors: null,
         message: "Ops! Something went wrong. Please try again.",
      };
   }

   if (responseData.error) {
      return {
         ...prevState,
         zodErrors: null,
         message: "Failed to Login.",
      };
   }

   return {
      ...prevState,
      zodErrors: null,
      message: "Login successful!",
   };
}