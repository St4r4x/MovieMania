import React from "react";
import { cn } from "@/src/lib/utils";
import { getUserProfile } from "@/src/data/services/user-services";
import ProfileForm from "@/src/components/forms/ProfileForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SettingsProfile = async () => {
	const session = await getServerSession(authOptions);
	const currentUser = await getUserProfile(session);
	return (
		<main className="flex flex-col items-center min-h-screen p-5">
			<div className="bg-gray-700 rounded-md p-5 flex flex-col gap-10 w-full sm:w-500">
				<div className="flex justify-center">
					<div className="rounded-full w-28 h-28 bg-purple-400"></div>
				</div>
				<div className={cn("grid gap-6")}>
					<ProfileForm
						user={currentUser}
						session={session}
					/>
				</div>
			</div>
		</main>
	);
};

export default SettingsProfile;
