import React from "react";
import Popcorn from "@/public/popcorn.png";
import Image from "next/image";
import PreferencesForm from "@/components/preferences-form/PreferencesForm";

export default function PreferencesPage() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen w-full">
			<div className="">
				<div className="flex flex-row gap-5 items-center justify-center">
					<div className="rounded-full bg-white w-11 h-11 relative">
						<Image
							className="absolute start-1 top-1"
							src={Popcorn}
							alt="popcorn"
							width="35"
							height="35"
						></Image>
					</div>
					<div className="items-center justify-center text-white">
						<h2 className="text-xl">Quels genres de films préférez-vous ?</h2>
						<h4 className="text-md italic">Sélectionnez vos préférences</h4>
					</div>
				</div>
				<PreferencesForm />
			</div>
		</main>
	);
}
