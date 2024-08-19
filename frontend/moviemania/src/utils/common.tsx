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

// Fonction pour extraire l'année d'une date
export function extractYear(dateString: string): number {
    return new Date(dateString).getFullYear();
}

// Fonction pour convertir les minutes en heures et minutes
export function convertMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}