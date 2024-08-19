export interface Movie {
    movie_id: number;
    title: string;
    backdrop_path: string;
}

export interface MovieRecommendations {
    [key: string]: Movie[];
}