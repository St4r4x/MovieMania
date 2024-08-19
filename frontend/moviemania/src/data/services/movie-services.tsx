import axios from "axios";
import { NextResponse } from "next/server";

export const getAllMovieGenres = async () => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/genres/`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		NextResponse.json({ error });
	}
};

export const getMoviesRecommendations = async (session: any) => {
	console.log(session?.access_token);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/recommendations/`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `${session?.access_token}`,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		NextResponse.json({ error });
	}
}
