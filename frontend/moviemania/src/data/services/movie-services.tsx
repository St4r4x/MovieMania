import axios from "axios";
import { NextResponse } from "next/server";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMxOTU5MzYsInN1YiI6IjEifQ.dEzxsfR8tUuyoV8J6_lxoe163xDv3zhJ1FKgrjzgA3s";

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
