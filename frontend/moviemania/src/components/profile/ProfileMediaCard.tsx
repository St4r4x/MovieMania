import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/src/components/icons/icons";
import ProfileStarRating from "@/src/components/ui/profileStarRating";

interface Media {
	id: number;
	poster_path: string;
	title: string;
	rating: number;
}

interface ProfileMediaCardProps {
	media: Media;
	origin: string;
}

function MediaCard({ media, origin }: ProfileMediaCardProps) {
	return (
		<div className="max-w-56">
			<Link href={`/media/${media.id}`}>
				<div className="flex flex-col items-start">
					<div className="w-full h-64 md:h-80 relative">
						{origin === "saves" ? <Icons.heart className="absolute top-2 right-2 text-white w-5 h-5 z-10" /> : ""}
						<Image
							className="rounded-md"
							src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}w500/${media.poster_path}`}
							alt={media.title}
							fill
							sizes="width: 100%, height: 300px"
						></Image>
					</div>
					<span className="text-gray-400 font-semibold pt-1">{media.title}</span>
					{origin === "ratings" ? <ProfileStarRating rating={media.rating} /> : ""}
				</div>
			</Link>
		</div>
	);
}

export default MediaCard;
