export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function parseCarouselKey(key: string) {
	const parts = key.split("_");
	if (parts.length > 1 && parts[0] === "genre") {
		return <span>Parce que vous avez aimé le genre <strong className="text-primary">{parts.slice(1).join("_")}</strong></span>;
	}
	if (parts.length > 1 && parts[0] === "movie") {
		return <span>Parce que vous avez aimé <strong className="text-primary">{parts.slice(1).join("_")}</strong></span>;
	}
	return "Les Tendances du moment";
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

// Tronquer un texte
export function truncateText(text: string, maxLength: number): string {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + "...";
	} else {
		return text;
	}
}

// Fonction pour formater une date
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0 en JavaScript
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}
