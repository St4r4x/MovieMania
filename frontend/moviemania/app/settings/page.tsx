import Link from "next/link";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Paramètres",
};

function SettingsPage() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-gray-700 rounded-md p-10 flex flex-col gap-10 text-center w-1/3">
				<h1 className="text-2xl text-white font-bold">Paramètres</h1>
				<Link href="/settings/profile">
					<div className="border border-1 border-gray-100 rounded-md p-5">
						<span className="text-white">Profil</span>
					</div>
				</Link>
				<Link href="/settings/delete-account">
					<div className="border border-1 border-gray-100 rounded-md p-5">
						<span className="text-white">Supprimer compte</span>
					</div>
				</Link>
			</div>
		</main>
	);
}

export default SettingsPage;
