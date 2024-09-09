"use server";

import axios from "axios";
import { error } from "console";

interface CheckUserProps {
	email: string;
}

export async function checkUserService(userData: CheckUserProps) {
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
	email: string;
	password: string;
}

export async function loginUserService(userData: LoginUserProps) {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/login/access-token`,
			userData, 
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("loginUserService error", error);
		return { error: "An error occurred while logging in" };
	}
}
