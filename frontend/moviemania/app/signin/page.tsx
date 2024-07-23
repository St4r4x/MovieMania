import React from "react";
import SigninForm from "@/components/signin-form/SigninForm";
import Link from "next/link";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an account forms to access our service.",
}

const SigninPage = () => {
	return (
		<div className="container relative items-center justify-center">
			<div className="lg">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
						<p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
					</div>
					<SigninForm />
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SigninPage;
