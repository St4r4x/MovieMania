import React from "react";
import { cn } from "@/src/lib/utils";
import ResetPasswordForm from "@/src/components/forms/ResetPasswordForm";

function ResetPassword() {
	return (
		<main className="flex flex-col items-center min-h-screen p-5">
			<div className="bg-gray-700 rounded-md p-10 flex flex-col gap-10 w-full sm:w-500">
				<h1 className="text-2xl text-white text-center font-bold">Modifier mot de passe</h1>
				<div className={cn("grid gap-6")}>
					<ResetPasswordForm />
				</div>
			</div>
		</main>
	);
}

export default ResetPassword;
