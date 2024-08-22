import React from "react";
import DeleteForm from "@/src/components/forms/DeleteForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getUserProfile } from "@/src/data/services/user-services";

const SettingsDelete = async () => {
	const session = await getServerSession(authOptions);
	const userData = await getUserProfile(session);

	return (
		<main className="flex flex-col items-center min-h-screen p-5">
			<div className="bg-gray-700 rounded-md p-5 flex flex-col gap-10 text-center w-full sm:w-500">
				<h1 className="text-2xl text-white font-bold">Suppression du compte</h1>
				<DeleteForm user={userData} />
			</div>
		</main>
	);
};

export default SettingsDelete;
