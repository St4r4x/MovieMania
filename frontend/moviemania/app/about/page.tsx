import React from "react";

type Props = {};

export default function Page({}: Props) {
   return (
      <main className="min-h-screen p-8 bg-gray-900 text-white flex justify-center items-center text-center">
         <section className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-center">À propos de MovieMania</h2>
            <p className="mb-6">
               MovieMania est une application dédiée aux amateurs de cinéma, leur offrant un accès rapide et facile 
               à une vaste base de données de films. Nous nous efforçons de fournir des informations complètes et précises 
               sur les films, allant des synopsis aux critiques, en passant par les évaluations et les recommandations personnalisées.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Notre Mission</h3>
            <p className="mb-6">
               Notre mission est de rendre la découverte et la recherche de films aussi simple et agréable que possible. 
               Nous voulons aider nos utilisateurs à trouver rapidement les films qui correspondent à leurs goûts et à leurs humeurs, 
               tout en leur offrant une expérience utilisateur fluide et intuitive.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">L'Équipe</h3>
            <p className="mb-6">
               Notre équipe est composée de passionnés de cinéma et de technologie. Nous travaillons dur pour améliorer constamment 
               l'application et ajouter de nouvelles fonctionnalités pour répondre aux besoins de notre communauté.
            </p>
         </section>
      </main>
   );
}
