export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function parseGenreKey(key: string) {
	const parts = key.split("_");
	if (parts.length > 1 && parts[0] === "genre") {
		return `Parce que vous avez aimé le genre ${parts.slice(1).join("_")}`;
	}
	return "Les tendances du moment";
}
