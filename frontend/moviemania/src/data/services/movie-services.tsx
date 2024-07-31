import axios from "axios";
import { NextResponse } from "next/server";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMwMzE0MjcsInN1YiI6IjEifQ.Wo_Gh3RvmQ38TSj4bfR6DGCRXIrs6bPb3cft2bhlNZw";

export const getAllMovieGenres = async (genres: string[]) => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/genres/`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${session?.access_token}`,
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			//router.push("/home");
            console.log(response.data);
            return response.data;
		}
	} catch (error) {
		NextResponse.json({ error });
	}
};
