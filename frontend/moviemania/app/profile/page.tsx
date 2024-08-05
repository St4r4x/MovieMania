import React from "react";

import styles from "./Profile.module.css";
import profileBackground from "@/public/profile-background.png";
import ProfileDetails from "@/src/components/profile/ProfileDetails";
import Carousel from "@/src/components/ui/carrousel";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mes Films favoris",
};

const user = {
	email: "John@doe.com",
	nom: "Doe",
	prenom: "John",
};

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

function Profile() {
	return (
		<main className="flex flex-col min-h-screen gap-7">
			<div
				className={`${styles.background} w-full bg-no-repeat bg-cover bg-center items-end flex p-5 md:p-7 h-80 md:h-500`}
				style={{ backgroundImage: `url(${profileBackground?.src})`}}
			>
				<ProfileDetails
					user={user}
					enriched={true}
				/>
			</div>
			<section className="px-5 md:p-8">
				<p className="text-white text-xl inline-block border-b-2 border-white pb-1 mb-3">Récemment noté</p>

				<Carousel images={images} />
			</section>

			<section className="px-5 md:p-8">
				<p className="text-white text-xl inline-block border-b-2 border-white pb-1 mb-3">Récemment sauvegardé</p>

				<Carousel images={images} />
			</section>
		</main>
	);
}

export default Profile;
