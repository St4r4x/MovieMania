"use server";

import axios from "axios";
import { error } from "console";
import { signIn } from "next-auth/react";

interface CheckUserProps {
	email: string;
}

export async function checkUserService(userData: CheckUserProps) {
	console.log("checkUserService userData", userData);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/check`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({ ...userData }),
		});
		return response.data;
	} catch (axiosError) {
		console.error(axiosError);
	}
}

interface RegisterUserProps {
	email: string;
	password: string;
	genres: number[];
}

export async function registerUserService(userData: RegisterUserProps) {
	console.log("registerUserService userData", userData);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/open`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({ ...userData }),
		});
		return response.data;
	} catch (axiosError) {
		console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
		throw error;
	}
}

interface LoginUserProps {
	username: string;
	password: string;
}

export async function loginUserService(userData: LoginUserProps) {
	console.log("loginUserService userData", userData);
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/login/access-token`,
			userData, // Utilise directement l'objet
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		console.log("loginUserService response", response);
		return response.data;
	} catch (error) {
		console.error("loginUserService error", error);
		return { error: "An error occurred while logging in" };
	}
}
