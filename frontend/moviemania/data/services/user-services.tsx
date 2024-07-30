import axios from "axios";
import { NextResponse } from "next/server";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMwMzI4NTQsInN1YiI6IjIifQ.BJl25Hm3ba2bo1n178zJJwGcKcWvQGHMLQoDrub465g";

export const postGenresUser = async (genres: string[]) => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/genreusers/`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${session?.access_token}`,
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify({
				genre_id: genres,
			}),
		});
		if (response.status === 200) {
			//router.push("/home");
            alert("Genres enregistrés avec succès !");
		}
	} catch (error) {
		NextResponse.json({ error });
	}
};
