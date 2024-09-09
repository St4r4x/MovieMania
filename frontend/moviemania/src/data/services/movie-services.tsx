import axios from "axios";
import { NextResponse } from "next/server";
import { MultipleMovieUserProps } from "@/src/types";

export const getAllMovieGenres = async () => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/genres`,
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
		if (!session?.accessToken) {
			throw new Error("Le token d'accès est manquant ou invalide.");
		}

		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/recommendations/`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.accessToken}`,
			},
		});

		if (response.status === 200) {
			return response.data;
		} else {
			console.error("Erreur lors de la récupération des recommandations :", response.statusText);
			return null;
		}
	} catch (error) {
		// Vérifiez si l'erreur est une instance d'Error avant d'accéder à error.message
		if (error instanceof Error) {
			console.error("Erreur dans getMoviesRecommendations :", error.message);
		} else {
			console.error("Erreur inconnue dans getMoviesRecommendations :", error);
		}
		return null;
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

export const getMovieDetailsByTitle = async (query: string) => {
	try {
		console.log("query", query);
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_RECOS_API_URL}/movies/search/?title=${query}`,
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
