import axios from "axios";
import { NextResponse } from "next/server";

interface RegisterUserProps {
	email: string;
	password: string;
}

export async function registerUserService(userData: RegisterUserProps) {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/open`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({ ...userData }),
		});
		return response.data;
	} catch (error) {
		NextResponse.json({ error });
	}
}
