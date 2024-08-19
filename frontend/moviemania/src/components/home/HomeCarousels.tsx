import React from "react";

import { parseGenreKey } from "@/src/utils/common";
import Carousel from "@/src/components/ui/carrousel";

function HomeCarousels({ userRecommendations }: { userRecommendations: any }) {
	console.log(userRecommendations);
	return (
		<>
			{userRecommendations.map((userRecommendation: any) => (
				<section className="px-7">
					<p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Parce que vous avez aimé le genre {parseGenreKey(userRecommendation)}</p>

					<Carousel movies={userRecommendation} />
				</section>
			))}
		</>
	);
}

export default HomeCarousels;
