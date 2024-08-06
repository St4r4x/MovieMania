"use client";

import React, { useState } from "react";
import { SignupForm } from "@/src/components/forms/SignupForm";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import PreferencesForm from "@/src/components/forms/PreferencesForm";
import Popcorn from "@/public/popcorn.png";

const SignupPage = () => {
	const [isPreferencesFormVisible, setIsPreferencesFormVisible] = useState(false);
	const [formData, setFormData] = useState<FormData | null>(null);

	const handleNextClick = (data: FormData) => {
		setFormData(data);
		setIsPreferencesFormVisible(true);
	};

	const handleBackClick = () => {
		setIsPreferencesFormVisible(false);
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen w-full gap-7">
			{!isPreferencesFormVisible ? (
				<>
					<Image
						src={Logo}
						alt="logo"
						width={300}
						height={300}
					/>
					<div className="w-auto p-10 rounded-3xl bg-none sm:bg-gradient-to-b sm:from-[rgba(66,242,247,0.1)] sm:to-[rgba(255,255,255,0.1)]">
						<div className="mx-auto flex w-full flex-col justify-center space-y-6">
							<div className="flex flex-col space-y-2 text-center">
								<h1 className="text-4xl font-semibold text-white">Créer un compte</h1>
								<p className="text-sm text-muted-foreground text-white">Saisissez votre email et un mot de passe pour créer votre compte</p>
							</div>
							<SignupForm onNextClick={handleNextClick} />
							<p className="text-center text-sm text-muted-foreground text-white">
								Vous avez déjà un compte ?{" "}
								<Link
									href="/login"
									className="text-primary font-extrabold"
								>
									Connexion
								</Link>
							</p>
							<p className="text-center text-sm text-muted-foreground text-white">
								En cliquant sur continuer, vous acceptez nos{" "}
								<Link
									href="/terms"
									className="underline underline-offset-4 hover:text-primary"
								>
									conditions de service
								</Link>{" "}
								et notre{" "}
								<Link
									href="/privacy"
									className="underline underline-offset-4 hover:text-primary"
								>
									politique de confidentialité
								</Link>
								.
							</p>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="flex flex-col gap-4">
						<div className="flex flex-row gap-5 items-center">
							<div className="rounded-full bg-white w-11 h-11 relative">
								<Image
									className="absolute start-1 top-1"
									src={Popcorn}
									alt="popcorn"
									width={35}
									height={35}
								/>
							</div>
							<div className="text-white">
								<h2 className="md:text-xl">Quels genres de films préférez-vous ?</h2>
								<h4 className="md:text-md italic">Sélectionnez vos préférences</h4>
							</div>
						</div>
						<PreferencesForm
							onBackClick={handleBackClick}
							formData={formData}
						/>
					</div>
				</>
			)}
		</main>
	);
};

export default SignupPage;
