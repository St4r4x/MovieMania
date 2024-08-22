import { NextRequest, NextResponse } from "next/server";
import { updateMovieUser } from "@/src/data/services/user-services";

export async function PUT(req: NextRequest) {
	const { session, data } = await req.json();
	try {
		const response = await updateMovieUser(session, data);
		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Error updating movie user" }, { status: 500 });
	}
}

export function OPTIONS() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
