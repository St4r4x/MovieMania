import NextAuth from "next-auth";
import { authOptions } from "./authOptions"; // Assurez-vous que le chemin est correct

// Définir explicitement les handlers pour GET et POST
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);