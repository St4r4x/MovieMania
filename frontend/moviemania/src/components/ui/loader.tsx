import React, { useState, useEffect } from "react";
import { Icons } from "@/src/components/icons/icons";

const Loader = () => {
	const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

	const loadingPhrases = ["Chargement des données...", "Préparation de votre expérience...", "Quelques secondes de plus...", "Presque là..."];

	useEffect(() => {
		const phraseTimer = setInterval(() => {
			if (currentPhraseIndex < loadingPhrases.length - 1) {
				setCurrentPhraseIndex((prevIndex) => prevIndex + 1);
			}
		}, 2500);

		return () => {
			clearInterval(phraseTimer);
		};
	}, [currentPhraseIndex]);

	return (
		<div className="flex min-h-screen items-center justify-center flex-col">
			<Icons.loader />
			<p className="mt-4 text-lg text-white">{loadingPhrases[currentPhraseIndex]}</p>
		</div>
	);
};

export default Loader;
