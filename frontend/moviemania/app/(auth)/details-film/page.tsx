import ActionButton from "@/src/components/ui/actionsButtons";
import Carousel from "@/src/components/ui/carrousel";
import Footer from "@/src/components/ui/footer";
import Navbar from "@/src/components/ui/navbar";
import Image from "next/image";

const filmDetails = {
   title: "Joker",
   description:
      "Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.",
   genre: ["crime", "drama", "thriller"],
   releaseDate: "October 4, 2019",
   cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy", "Brett Cullen"],
   directors: ["Todd Phillips"],
   writers: ["Todd Phillips", "Scott Silver"],
   poster: "/joker.png",
};

const images = [
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
];

export default function FilmDetails() {
   return (
      <main className="min-h-screen text-white">
         <Navbar />

         <header className="relative w-full h-[90vh]">
            <Image src={filmDetails.poster} alt="Film Poster" layout="fill" objectFit="cover" quality={100} />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#22272E]"></div>

            <div className="absolute bottom-0 w-full p-8 text-white">
               <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold mb-2">{filmDetails.title}</h1>

                  <p className="text-lg font-extralight mb-4">Thriller - Films - 2019 - 2 h 20 min</p>

                  <div className="flex space-x-4 mb-4">
                     <ActionButton icon="fa-heart" ariaLabel="Like" />

                     <ActionButton icon="fa-check" ariaLabel="Check" />

                     <ActionButton icon="fa-thumbs-down" ariaLabel="Dislike" />
                  </div>
               </div>
            </div>
         </header>

         <section className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-52">
               {/* Colonne de gauche */}
               <div className="space-y-4">
                  <div>
                     <h2 className="text-base text-gray-400 mb-2">Synopsis</h2>

                     <p className="font-bold">{filmDetails.description}</p>
                  </div>
                  <div>
                     <h2 className="text-base text-gray-400 mb-2">Distribution</h2>

                     <p className="font-bold">{filmDetails.cast.join(", ")}</p>
                  </div>
                  <div className="flex space-x-3">
                     <div>
                        <h2 className="text-base text-gray-400 mb-2">Réalisé par</h2>
                        <p className="font-bold">{filmDetails.directors.join(", ")}</p>{" "}
                     </div>
                     <div>
                        <h2 className="text-base text-gray-400 mb-2">Rédaction</h2>
                        <p className="font-bold">{filmDetails.writers.join(", ")}</p>{" "}
                     </div>
                  </div>
               </div>

               {/* Colonne de droite */}
               <div className="space-y-4">
                  <div>
                     <h2 className="text-base text-gray-400 mb-2">Genres</h2>

                     <div className="flex space-x-2">
                        {filmDetails.genre.map((g, index) => (
                           <span key={index} className="text-sm bg-gray-700 px-6 py-1 rounded">
                              {g}
                           </span>
                        ))}
                     </div>
                  </div>
                  <div>
                     <h2 className="text-base text-gray-400 mb-2">Date de sortie</h2>

                     <p className="font-bold">{filmDetails.releaseDate}</p>
                  </div>
               </div>
            </div>

            <section className="mt-20">
               <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Dans le même genre</p>

               <Carousel images={images} />
            </section>

            <section className="mt-20">
               <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Nouveautés</p>

               <Carousel images={images} />
            </section>
         </section>
         <Footer />
      </main>
   );
}
