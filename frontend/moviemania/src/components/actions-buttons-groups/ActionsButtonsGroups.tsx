"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/src/components/ui/modal";
import { useSession } from "next-auth/react";

import { ActionButtonGroupsProps } from "@/src/types";
import ActionButton from "@/src/components/ui/actionsButtons";
import { updateMovieUser } from "@/src/data/services/user-services";

export const ActionsButtonsGroups: React.FC<ActionButtonGroupsProps> = ({ movie, userMovieProps }) => {
	const { data: session } = useSession();
	const [showPopup, setShowPopup] = useState(false);
	const [userMovie, setUserMovie] = useState(userMovieProps);

	console.log("userMovie", userMovie);

	useEffect(() => {
		setUserMovie(userMovieProps);
	}, [userMovieProps]);

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	const saveMovie = async () => {
		const updatedMovieUser = await updateMovieUser(session, { movie_id: movie.movie_id, note: userMovie.note, saved: !userMovie.saved });
		console.log("updatedMovieUser", updatedMovieUser);
		setUserMovie({ movie_id: movie.movie_id, note: userMovie.note, saved: !userMovie.saved });
	};
	return (
		<>
			<div className="flex space-x-4 mb-4 justify-center sm:justify-start">
				{userMovie && (userMovie.note === 0 || userMovie.saved) ? (
					<ActionButton
						icon="fa-heart"
						ariaLabel="Like"
						isActive={userMovie?.saved}
						onClick={saveMovie}
					/>
				) : (
					""
				)}
				<ActionButton
					icon="fa-check"
					ariaLabel="Check"
					onClick={() => openPopup()}
					isActive={userMovie?.note > 0}
				/>
				{userMovie && (userMovie.note === 0 || userMovie.saved) ? (
					<ActionButton
						icon="fa-thumbs-down"
						ariaLabel="Dislike"
					/>
				) : (
					""
				)}
			</div>
			{showPopup && (
				<Modal
					movie={movie}
					userMovieProps={userMovie}
					onClose={closePopup}
				/>
			)}
		</>
	);
};
