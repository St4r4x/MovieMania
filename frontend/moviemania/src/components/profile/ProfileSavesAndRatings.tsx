import React from "react";
import Link from "next/link";

interface ProfileSavesAndRatingsProps {
	ratings: number;
	saved: number;
}

function ProfileSavesAndRatings({ ratings, saved }: ProfileSavesAndRatingsProps) {
	return (
		<div className="flex flex-row items-end justify-center gap-5">
			<Link href="/profile/ratings">
				<div className="flex flex-col items-center justify-center border-e-2 border-e-white-200 pe-5">
					<div className="text-xl font-bold">{ratings}</div>
					<div className="text-xl text-gray-400">Ratings</div>
				</div>
			</Link>
			<Link href="/profile/saved">
				<div className="flex flex-col items-center justify-center">
					<div className="text-xl font-bold">{saved}</div>
					<div className="text-xl text-gray-400">Saved</div>
				</div>
			</Link>
		</div>
	);
}

export default ProfileSavesAndRatings;
