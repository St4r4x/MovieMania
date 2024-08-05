import React from "react";

type Props = {};

export default function Page({}: Props) {
   return (
      <main className="min-h-screen p-8 bg-gray-900 text-white flex justify-center items-center text-center">
         <section className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-center">Conditions d'utilisation</h2>
            <p className="mb-6">
               En utilisant notre application, vous acceptez de respecter les présentes conditions d'utilisation. 
               Veuillez les lire attentivement avant d'accéder à nos services.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Utilisation de l'application</h3>
            <p className="mb-6">
               Vous vous engagez à utiliser notre application uniquement à des fins légales et conformément aux lois en vigueur. 
               Toute utilisation abusive, illégale ou non autorisée de notre application est strictement interdite.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Propriété intellectuelle</h3>
            <p className="mb-6">
               Tous les contenus, marques, logos et autres éléments de propriété intellectuelle présents sur notre application 
               sont la propriété de leurs propriétaires respectifs et sont protégés par les lois sur la propriété intellectuelle.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Limitation de responsabilité</h3>
            <p className="mb-6">
               Nous ne saurions être tenus responsables des dommages directs ou indirects résultant de l'utilisation de notre application, 
               y compris les pertes de données ou les interruptions de service. Vous utilisez notre application à vos propres risques.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Modifications des conditions d'utilisation</h3>
            <p className="mb-6">
               Nous nous réservons le droit de modifier les présentes conditions d'utilisation à tout moment. 
               Les modifications seront effectives dès leur publication sur cette page. 
               Il est de votre responsabilité de consulter régulièrement cette page pour prendre connaissance des éventuelles mises à jour.
            </p>
         </section>
      </main>
   );
}
