import { Button } from "@/src/components/ui/button";
import Carousel from "@/src/components/ui/carrousel";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "MovieMania - Recommandations de films et plus",
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

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col gap-12">
			{/* <Navbar /> */}
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
				<section className="px-7">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Mes recommandations</p>

					<Carousel images={images} />
				</section>

				<section className="px-7">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Les tops du moment </p>

					<Carousel images={images} />
				</section>

				<section className="px-7">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Nouveautés</p>
					<Carousel images={images} />
				</section>
			</div>
		</main>
	);
}
