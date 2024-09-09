import { patchUserProfile, updateUserPassword, deleteUserProfile } from "@/src/data/services/user-services";
// Importez d'autres services selon les besoins
import { NextRequest, NextResponse } from "next/server";

// Dictionnaire pour mapper les types d'opération aux fonctions correspondantes
const operationMap: any = {
	updateProfile: patchUserProfile,
	updatePassword: updateUserPassword,
};

export async function PUT(req: NextRequest) {
	try {
		const { operation, session, formData } = await req.json();

		if (!operation || !operationMap[operation]) {
			return NextResponse.json({ error: "Invalid operation" }, { status: 400 });
		}

		// Appel de la fonction en fonction de l'opération
		const response = await operationMap[operation](session, formData);
		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Error processing request" }, { status: 500 });
	}
}

export function OPTIONS() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE(req: NextRequest) {
	try {
		const { session } = await req.json();

		const response = await deleteUserProfile(session);
		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Error processing request" }, { status: 500 });
	}
}
