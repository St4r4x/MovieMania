import axios from "axios";
import { NextResponse } from "next/server";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMyMDA5MTAsInN1YiI6IjMifQ.Zd4mt17m0NOnhbhXl5DNPHm8mLRmZzNXUYIKkAz05Mo";

interface patchUserProfileProps {
	nom: string;
	prenom: string;
	sexe: string;
	birthday: string;
}

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

interface deleteUserProfileProps {
	id: number;
}

export const deleteUserProfile = async (id: deleteUserProfileProps) => {
	console.log("id", id);
	try {
		const response = await axios({
			url: `${process.env.NEXT_PUBLIC_USERS_API_URL}/api/v1/users/${id}/`,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${session?.access_token}`,
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			setTimeout(() => {
				alert("Users supprimé avec succès !");
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
