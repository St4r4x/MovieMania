import axios from "axios";
import { NextResponse } from "next/server";

// Fonction pour déterminer l'URL de base selon l'environnement d'exécution
const getBaseURL = () => {
  if (typeof window === 'undefined') {
    // On est côté serveur (dans Docker)
    return 'http://users_api:8888';
  } else {
    // On est côté client (navigateur)
    return 'http://localhost:8888';
  }
};

interface patchUserProfileProps {
  email?: string;
  nom?: string;
  prenom?: string;
  sexe?: string;
  birthday?: string;
}

export const getUserProfile = async (session: any) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/users/me`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    NextResponse.json({ error });
  }
};

export const postGenresUser = async (session: any, genres: string[]) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/genreusers/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
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

export const patchUserProfile = async (session: any, userData: patchUserProfileProps) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/users/me`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      data: userData,
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
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/users/me`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
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

export const UpdateUserPassword = async (session: any, userData: updateUserPasswordProps) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/users/me/password`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      data: userData,
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

export const getMovieUser = async (session: any) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/movieusers/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des films user:", error);
    throw error;
  }
};

export const getMovieUserBy = async (session: any, id: number) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/movieusers/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (response.status !== 200) {
      return { success: false };
    }
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des films user:", error);
    return { movie_id: id, note: 0, saved: false };
  }
};

export const postMovieUser = async (session: any, userData: movieUserProps) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/movieusers/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
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

export const updateMovieUser = async (session: any, userData: movieUserProps) => {
  try {
    const response = await axios({
      url: `${getBaseURL()}/api/v1/movieusers/`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      data: userData,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
    throw error;
  }
};
