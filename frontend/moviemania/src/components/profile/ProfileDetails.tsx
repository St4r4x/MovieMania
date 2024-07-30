import React from "react";
import Link from "next/link";

function ProfileDetails({ enriched }: { enriched: boolean }, { page }: { page: string }) {
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
							<div className="italic">@Profile</div>
							<div className="text-2xl font-bold">John</div>
						</>
					) : (
						<>
							<div className="italic">@Profile</div>
							<div className="text-4xl font-bold">{page}</div>
						</>
					)}
					{enriched ? (
						<Link href="/settings">
							<div className="border border-1 py-1 px-10 rounded-md border-gray-400">
								<span>Edit profile</span>
							</div>
						</Link>
					) : (
						""
					)}
				</div>
			</div>
			{enriched ? (
				<div className="flex flex-row items-end justify-center gap-5">
					<Link href="/profile/ratings">
						<div className="flex flex-col items-center justify-center border-e-2 border-e-white-200 pe-5">
							<div className="text-xl font-bold">5</div>
							<div className="text-xl text-gray-400">Ratings</div>
						</div>
					</Link>
					<Link href="/profile/saved">
						<div className="flex flex-col items-center justify-center">
							<div className="text-xl font-bold">5</div>
							<div className="text-xl text-gray-400">Saved</div>
						</div>
					</Link>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default ProfileDetails;
