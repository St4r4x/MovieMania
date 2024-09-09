import { getMovieDetailsByTitle } from "@/src/data/services/movie-services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get("query");

	const searchResults = await getMovieDetailsByTitle(query as string);

	return NextResponse.json(searchResults, { status: 200 });
}
