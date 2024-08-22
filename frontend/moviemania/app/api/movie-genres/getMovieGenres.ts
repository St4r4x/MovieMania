export async function getMovieGenres() {
	const response = await fetch("/api/movie-genres", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await response.json();
}