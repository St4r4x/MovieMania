import axios from "axios";
import { NextResponse } from "next/server";
import { MultipleMovieUserProps } from "@/src/types";

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
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/recommendations/`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${session?.access_token}`,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		NextResponse.json({ error });
	}
};

export const getMovieDetails = async (id: number) => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/movies/${id}`,
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

export const getHydratedMedia = async (movies: MultipleMovieUserProps) => {
	const mediaPromises = movies.data.map(async (movie) => {
		const details = await getMovieDetails(movie.movie_id);
		return {
			...details,
			note: movie.note,
			saved: movie.saved,
		};
	});

	const mediaList = await Promise.all(mediaPromises);

	return mediaList;
};
