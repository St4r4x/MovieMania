import React from "react";

import styles from "./Profile.module.css";
import profileBackground from "@/public/profile-background.png";
import ProfileDetails from "@/src/components/profile/ProfileDetails";

const user = {
	email: "John@doe.com",
	nom: "Doe",
	prenom: "John",
};

const medias = [
	{ id: 1, poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", title: "Test", rating: 5 },
	{ id: 2, poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg", title: "Test", rating: 4 },
	{ id: 3, poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", title: "Test", rating: 1 },
	{ id: 4, poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg", title: "Test", rating: 3 },
	{ id: 5, poster_path: "/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg", title: "Test", rating: 5 },
	{ id: 6, poster_path: "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg", title: "Test", rating: 2 },
	{ id: 7, poster_path: "/3E53WEZJqP6aM84D8CckXx4pIHw.jpg", title: "Test", rating: 3 },
];

function Profile() {
	return (
		<main className="flex flex-col items-center min-h-screen w-full gap-7">
			<div
				className={`${styles.background} w-full bg-no-repeat bg-cover bg-center items-end flex p-10`}
				style={{ backgroundImage: `url(${profileBackground?.src})`, height: `690px` }}
			>
				<ProfileDetails
					user={user}
					enriched={true}
				/>
			</div>
			{/* <section className="p-8">
				<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Récemment notés</p>

				<Carousel images={images} />
			</section>

			<section className="p-8">
				<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Récemment sauvegardés</p>

				<Carousel images={images} />
			</section> */}
		</main>
	);
}

export default Profile;
