import React from "react";
import profileBackground from "@/public/profile-background.png";
import styles from "../Profile.module.css";
import ProfileDetails from "@/src/components/profile/ProfileDetails";

function MediaUserSaved() {
	return (
		<main className="flex flex-col items-center min-h-screen w-full gap-7">
			<div
				className={`${styles.background} w-full bg-no-repeat bg-cover bg-center items-end flex p-10`}
				style={{ backgroundImage: `url(${profileBackground?.src})`, height: `690px` }}
			>
				<ProfileDetails enriched={false}/>
			</div>
		</main>
	);
}

export default MediaUserSaved;
