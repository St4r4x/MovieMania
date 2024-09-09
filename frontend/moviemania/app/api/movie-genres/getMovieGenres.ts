export async function getMovieGenres() {
	const response = await fetch("/api/movie-genres", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await response.json();
}