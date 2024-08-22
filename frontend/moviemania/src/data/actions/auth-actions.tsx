"use server";

import { z } from "zod";
import { loginUserService, registerUserService } from "@/src/data/services/auth-services";

const schemaRegister = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	// password: z
	// 	.string()
	// 	.min(8, {
	// 		message: "Le mot de passe doit comporter au moins 8 caractères",
	// 	})
	// 	.max(100, {
	// 		message: "Le mot de passe doit comporter moins de 100 caractères",
	// 	})
	// 	.refine((password) => /[A-Z]/.test(password), {
	// 		message: "Le mot de passe doit contenir au moins une lettre majuscule",
	// 	})
	// 	.refine((password) => /[a-z]/.test(password), {
	// 		message: "Le mot de passe doit contenir au moins une lettre minuscule",
	// 	})
	// 	.refine((password) => /[0-9]/.test(password), {
	// 		message: "Le mot de passe doit contenir au moins un chiffre",
	// 	})
	// 	.refine((password) => /[^a-zA-Z0-9]/.test(password), {
	// 		message: "Le mot de passe doit contenir au moins un caractère spécial",
	// 	}),
	password: z.string().min(8, {
		message: "Le mot de passe doit comporter au moins 8 caractères",
	}),
});

export async function registerUserAction(prevState: any, formData: FormData) {
	const validatedFields = schemaRegister.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			message: "Des champs sont manquants. Echec de l'enregistrement.",
		};
	}

	// const responseData = await registerUserService(validatedFields.data);

	// if (!responseData) {
	// 	return {
	// 		...prevState,
	// 		zodErrors: null,
	// 		message: "Oups ! Quelque chose a mal tourné. Veuillez réessayer.",
	// 	};
	// }

	// if (responseData.error) {
	// 	return {
	// 		...prevState,
	// 		zodErrors: null,
	// 		message: "Echec de l'enregistrement.",
	// 	};
	// }

	return {
		...prevState,
		zodErrors: null,
		message: "Champs valident",
	};
}

const schemaLogin = z.object({
	email: z.string().email({
		message: "Veuillez entrer une adresse email valide",
	}),
	password: z.string().min(6).max(100, {
		message: "Le mot de passe doit comporter au moins 8 caractères",
	}),
});

export async function loginUserAction(prevState: any, formData: FormData) {
	const validatedFields = schemaLogin.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			...prevState,
			zodErrors: validatedFields.error.flatten().fieldErrors,
			message: "Champs manquants. Echec de la connexion.",
		};
	}

	const responseData = await loginUserService(validatedFields.data);

	if (!responseData) {
		return {
			...prevState,
			zodErrors: null,
			message: "Oups ! Quelque chose a mal tourné. Veuillez réessayer.",
		};
	}

	if (responseData.error) {
		return {
			...prevState,
			zodErrors: null,
			message: "Echec de la connexion.",
		};
	}

	return {
		...prevState,
		zodErrors: null,
		message: "Connexion réussie!",
	};
}
