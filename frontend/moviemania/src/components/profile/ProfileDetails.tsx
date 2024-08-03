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
		<div className="flex flex-row justify-between w-full md:justify-start text-white gap-4 md:gap-14">
			<div className="flex flex-row items-end justify-center gap-4 md:gap-6">
				{enriched ? (
					<>
						<div className="rounded-full p-9 md:p-14 bg-purple-400"></div>
					</>
				) : (
					<>
						<div className="rounded-full p-9 md:p-10 bg-purple-400"></div>
					</>
				)}
				<div className="flex flex-col gap-1 md:gap-2">
					{enriched ? (
						<div>
							<div className="text-sm md:text-md italic">@{user.nom}</div>
							<div className="text-base md:text-2xl font-bold">{user.prenom + " " + user.nom}</div>
						</div>
					) : (
						<div>
							<Link href="/profile">
								<div className="italic hover:text-primary hover:underline">@{user.nom}</div>
							</Link>
							<div className="text-2xl md:text-4xl font-bold">{page}</div>
						</div>
					)}
					{enriched ? (
						<Link href="/settings">
							<div className="w-24 md:w-full border border-1 px-3 md:py-2 md:px-10 text-center rounded-md border-gray-400 transition-colors duration-500 hover:border-primary hover:text-primary hover:bg-gray-600">
								<span className="text-xs md:text-base whitespace-nowrap">Editer profil</span>
							</div>
						</Link>
					) : (
						""
					)}
				</div>
			</div>
			{enriched ? (
				<ProfileSavesAndRatings
					ratings={5}
					saved={3}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default ProfileDetails;
