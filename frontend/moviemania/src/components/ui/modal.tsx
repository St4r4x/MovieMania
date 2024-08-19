"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { postMovieUser } from "@/src/data/services/user-services";
import { useSession } from "next-auth/react";
import { Movie } from "@/src/types";

interface PopupProps {
	movie: Movie;
	onClose: () => void;
}

const Modal: React.FC<PopupProps> = ({ movie, onClose }) => {
	const { data: session } = useSession();
	const [rating, setRating] = useState<number | null>(movie?.rating);
	const [hover, setHover] = useState<number | null>(null);

	const resetRating = () => {
		setRating(null);
		// Ajouter la logique pour reset la note
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const handleSubmit = async (ratingValue: number) => {
		setRating(ratingValue);
		console.log(ratingValue);
		await postMovieUser(session, { movie_id: movie.movie_id, note: ratingValue, saved: false });
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			style={{ backgroundImage: "var(--body-background-gradient)" }}
		>
			<button
				onClick={onClose}
				className="absolute right-4 top-4"
			>
				<i className="fas fa-times text-4xl"></i>
			</button>
			<div
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-56"
			>
				<h2 className="text-xl text-gray-300 text-center">J'ai vu ça</h2>
				<Link href={`/details-film/${movie.title}`}>
					<div className="flex flex-col items-start">
						<div className="w-full h-64 sm:h-80 relative overflow-hidden rounded-md">
							<Image
								className={`rounded-md`}
								src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}w500/${movie.poster_path}`}
								alt={movie.title}
								fill
								sizes="width: 100%, height: 300px"
							></Image>
						</div>
					</div>
				</Link>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row items-center justify-center gap-3">
						{[...Array(5)].map((star, i) => {
							const ratingValue = i + 1;
							return (
								<label key={i}>
									<input
										type="radio"
										name="rating"
										value={ratingValue}
										onClick={() => handleSubmit(ratingValue)}
										className="hidden"
									/>
									<i
										className={`fas fa-star text-2xl cursor-pointer ${
											ratingValue <= (hover ?? rating) ? "text-yellow-500" : "text-gray-300"
										}`}
										onMouseEnter={() => setHover(ratingValue)}
										onMouseLeave={() => setHover(null)}
									></i>
								</label>
							);
						})}
					</div>
					{rating > 0 && (
						<button
							onClick={resetRating}
							className="mt-2 bg-secondary text-white py-1 px-2 rounded-md"
						>
							Réinitialiser la note
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
