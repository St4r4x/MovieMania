import React from "react";
import Link from "next/link";
import ProfileSavesAndRatings from "@/src/components/profile/ProfileSavesAndRatings";

interface User {
	email: string;
	nom: string;
	prenom: string;
}


interface ProfileDetailsProps {
	user: User;
	enriched: boolean;
	page?: string;
}

function ProfileDetails({ user, enriched, page }: ProfileDetailsProps) {
	return (
		<div className="flex flex-row text-white gap-14">
			<div className="flex flex-row items-end justify-center gap-6">
				{enriched ? (
					<>
						<div className="rounded-full w-28 h-28 bg-purple-400"></div>
					</>
				) : (
					<>
						<div className="rounded-full w-20 h-20 bg-purple-400"></div>
					</>
				)}
				<div className="flex flex-col gap-2">
					{enriched ? (
						<>
							<div className="italic">@{user.nom}</div>
							<div className="text-2xl font-bold">{user.prenom + " " + user.nom}</div>
						</>
					) : (
						<>
							<Link href="/profile">
								<div className="italic hover:text-primary hover:underline">@{user.nom}</div>
							</Link>
							<div className="text-4xl font-bold">{page}</div>
						</>
					)}
					{enriched ? (
						<Link href="/settings">
							<div className="border border-1 py-1 px-10 rounded-md border-gray-400 transition-colors duration-500 hover:border-primary hover:text-primary hover:bg-gray-600">
								<span>Editer profil</span>
							</div>
						</Link>
					) : (
						""
					)}
				</div>
			</div>
			{enriched ? (
				<ProfileSavesAndRatings ratings={5} saved={3}/>
			) : (
				""
			)}
		</div>
	);
}

export default ProfileDetails;
