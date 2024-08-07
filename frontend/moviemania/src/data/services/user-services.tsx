import axios from "axios";
import { NextResponse } from "next/server";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMyMDA5MTAsInN1YiI6IjMifQ.Zd4mt17m0NOnhbhXl5DNPHm8mLRmZzNXUYIKkAz05Mo";

interface patchUserProfileProps {
	nom: string;
	prenom: string;
	sexe: string;
	birthday: string;
}

export const getUserProfile = async (session: any) => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/me/`,
			method: "GET",
			headers: {
				"Content-Type": "application",
				Authorization: `Bearer ${session?.access_token}`,
			},
		});
		return response.data;
	} catch (error) {
		NextResponse.json({ error });
	}
};

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
			alert("Genres enregistrés avec succès !");
		}
	} catch (error) {
		NextResponse.json({ error });
	}
};

export const patchUserProfile = async (userData: patchUserProfileProps) => {
	console.log("userData", userData);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/me/`,
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${session?.access_token}`,
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify({
				userData,
			}),
		});
		if (response.status === 200) {
			setTimeout(() => {
				alert("Informations users mise à jour avec succès !");
			}, 2000); // Délai de 2 secondes
		}
	} catch (error) {
		console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
		if (axios.isAxiosError(error)) {
			console.error("Détails de l'erreur:", error.response?.data);
		}
	}
};

export const deleteUserProfile = async (session: any) => {
	console.log("session", session);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/me/`,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.access_token}`,
			},
		});
		if (response.status === 200) {
			setTimeout(() => {
				alert("User supprimé avec succès !");
			}, 2000); // Délai de 2 secondes
			return { success: true };
		}
	} catch (error) {
		console.error("Erreur lors de la suppression du profil utilisateur:", error);
		if (axios.isAxiosError(error)) {
			console.error("Détails de l'erreur:", error.response?.data);
		}
		return { success: false };
	}
};

interface updateUserPasswordProps {
	current_password: string;
	new_password: string;
}

export const UpdateUserPassword = async (userData: updateUserPasswordProps) => {
	console.log("userData", userData);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/me/password`,
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${session?.access_token}`,
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify({
				userData,
			}),
		});
		if (response.status === 200) {
			setTimeout(() => {
				alert("Informations users mise à jour avec succès !");
			}, 2000); // Délai de 2 secondes
		}
	} catch (error) {
		console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
		if (axios.isAxiosError(error)) {
			console.error("Détails de l'erreur:", error.response?.data);
		}
	}
};

interface movieUserProps {
	movie_id: number;
	note: number;
	saved: boolean;
}

export const postMovieUser = async (session: any, userData: movieUserProps) => {
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/movieusers/`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.access_token}`,
			},
			data: userData,
		});
		if (response.status === 200) {
			return { success: true };
		}
	} catch (error) {
		console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
		throw error;
	}
};

export const updateMovieUser = async (userData: movieUserProps) => {
	console.log("userData", userData);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/movieusers/`,
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: JSON.stringify({
				userData,
			}),
		});
		if (response.status === 200) {
			setTimeout(() => {
				alert("Informations users mise à jour avec succès !");
			}, 2000); // Délai de 2 secondes
		}
	} catch (error) {
		console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
		throw error;
	}
};
