"use client";

import React from "react";

import { Button } from "@/src/components/ui/button";
import Carousel from "@/src/components/ui/carrousel";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/src/components/ui/loader";
import { Suspense, useState, useEffect } from "react";

const images = [
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
	{ src: "/joker.png", name: "Joker" },
];

function HomeContent() {
	///////////////Décommenter pour activer le loader////////////////

	// const [loading, setLoading] = useState(true);

	// // Remplacez cette promesse par l'appel d'API
	// const promise = new Promise((resolve) => {
	// 	setTimeout(resolve, Math.random() * 10000); // Temps aléatoire pour simuler un appel d'API
	// });

	// useEffect(() => {
	// 	promise.then(() => {
	// 		setLoading(false);
	// 	});
	// }, []);

	// if (loading) {
	// 	return <Loader />;
	// }

	return (
		<Suspense fallback={<Loader />}>
			<header className="relative w-full h-96 md:h-[90vh]">
				<Image
					className="border-b-2 border-customBackground md:border-none"
					src="/joker.png"
					alt="Affiche"
					layout="fill"
					objectFit="cover"
					quality={100}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#22272E] md:bg-gradient-to-r md:from-black md:to-[rgba(0,0,0,0.2)]"></div>

				<div className="absolute inset-0 flex flex-col justify-center md:p-8 text-white">
					<div className="w-full md:w-1/2 h-full flex flex-col justify-end md:justify-center items-center text-center">
						<h1 className="text-3xl md:text-4xl font-bold md:mb-4">Joker</h1>

						<p className="text-lg max-w-md font-extralight">Thriller - Films - 2019 - 2 h 20 min</p>
						<p className="text-xl max-w-md hidden md:block">
							Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.
						</p>
						<Link href="/details-film/joker">
							<Button className="rounded-full w-30 text-base mt-4">Plus d'info</Button>
						</Link>
					</div>
				</div>
			</header>
			<div className="flex flex-col gap-12">
				
			</div>
		</Suspense>
	);
}

export default HomeContent;
