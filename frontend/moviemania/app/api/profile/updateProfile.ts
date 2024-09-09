import { patchUserProfileProps } from "@/src/types";

export async function updateProfile(operation: string, session: any, formData?: patchUserProfileProps) {
	const response = await fetch("/api/profile", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ operation, session, formData }),
	});
	return await response.json();
}

export async function deleteProfile(session: any) {
	const response = await fetch("/api/profile", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ session }),
	});
	return await response.json();
}
