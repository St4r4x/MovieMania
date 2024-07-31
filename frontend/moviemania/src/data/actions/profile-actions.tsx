"use server";
import { z } from "zod";
import { updateUserService } from "@/src/data/services/user-services";

const schemaProfile = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
   }),
});

export async function profileUserAction(prevState: any, formData: FormData) {
   const validatedFields = schemaProfile.safeParse({
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

   const responseData = await updateUserService(validatedFields.data);

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