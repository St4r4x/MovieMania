"use server";

import { NextRequest, NextResponse } from "next/server";
import { getAllMovieGenres } from "@/src/data/services/movie-services";

export async function PUT(req: NextRequest) {
	try {
		const response = await getAllMovieGenres();
		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Error fetching movie genres" }, { status: 500 });
	}
}

export async function OPTIONS() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
