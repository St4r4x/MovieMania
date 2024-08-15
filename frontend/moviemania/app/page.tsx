import HomeContent from "@/src/components/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "MovieMania - Recommandations de films et plus",
};

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col gap-12">
			<HomeContent />
		</main>
	);
}
