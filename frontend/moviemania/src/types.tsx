import { StaticImageData } from "next/image";

export interface MovieRecommendationsProps {
	movie_id: number;
	title: string;
	backdrop_path: string;
}

export interface MovieRecommendationsDictionary {
	[key: string]: MovieRecommendationsProps[];
}

export interface Job {
	job_id: number;
	title: string;
}

export interface People {
	people_id: number;
	name: string;
	photo: string;
}

export interface Credit {
	credit_id: number;
	id_movie: number;
	id_people: number;
	id_job: number;
	character_name: string;
	cast_order: number;
	job: Job;
	people: People;
}

export interface Genre {
	genre_id: number;
	name: string;
	image?: StaticImageData;
}

export interface Movie {
	movie_id: number;
	title: string;
	release_date: string;
	budget: number;
	revenue: number;
	runtime: number;
	vote_average: number;
	vote_count: number;
	tagline: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	genres: Genre[];
	credits: Credit[];
	note?: number;
	saved?: boolean;
}

export interface MovieUserProps {
	movie_id: number;
	note: number;
	saved: boolean;
}

export interface MultipleMovieUserProps {
	data: MovieUserProps[];
}

export interface PopupProps {
	movie: Movie;
	userMovieProps: MovieUserProps;
	onClose: () => void;
}

export interface MovieDetailsProps {
	movie: Movie;
	userMovieProps: MovieUserProps;
}

export interface ActionButtonProps {
	icon: string;
	onClick?: () => void;
	ariaLabel?: string;
	isActive?: boolean;
}

export interface ActionButtonGroupsProps extends MovieDetailsProps {}

export interface patchUserProfileProps {
	email?: string;
	nom?: string;
	prenom?: string;
	sexe?: string;
	birthday?: string;
	current_password?: string;
	new_password?: string;
}

export interface ImageByGenre {
	[key: string]: StaticImageData;
}

export interface MovieSearchResultsProps {
	movieResults: Movie[];
	onSelectMovie: () => void;
}
