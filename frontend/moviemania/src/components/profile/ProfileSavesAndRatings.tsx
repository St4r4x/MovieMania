import React from "react";
import Link from "next/link";
import style from "@/src/components/profile/ProfileDetails.module.css";

interface ProfileSavesAndRatingsProps {
	ratings: number;
	saved: number;
}

function ProfileSavesAndRatings({ ratings, saved }: ProfileSavesAndRatingsProps) {
	return (
		<div className="flex flex-row items-end justify-center gap-5">
			<Link href="/profile/ratings">
				<div className={`flex flex-col items-center justify-center border-e-2 border-e-white-200 pe-5 ${style.hoverEffect}`}>
					<div className="text-base md:text-xl font-bold">{ratings}</div>
					<div className={`text-base md:text-xl text-gray-400 ${style.hoverColor}`}>Notés</div>
				</div>
			</Link>
			<Link href="/profile/saved">
				<div className={`flex flex-col items-center justify-center ${style.hoverEffect}`}>
					<div className="text-base md:text-xl font-bold">{saved}</div>
					<div className={`text-base md:text-xl text-gray-400 ${style.hoverColor}`}>Favoris</div>
				</div>
			</Link>
		</div>
	);
}

export default ProfileSavesAndRatings;
