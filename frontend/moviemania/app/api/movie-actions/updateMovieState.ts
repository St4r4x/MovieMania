import { MovieUserProps } from "@/src/types";

export async function updateMovieState(session: any, data: MovieUserProps) {
	const response = await fetch("/api/movie-actions", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ session, data }),
	});
	return await response.json();
}
