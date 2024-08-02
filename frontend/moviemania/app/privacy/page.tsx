import React from "react";

type Props = {};

export default function ConfidentialitePage({}: Props) {
   return (
      <main className="min-h-screen p-8 bg-gray-900 text-white flex justify-center items-center text-center">
         <section className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-center">Confidentialité</h2>
            <p className="mb-6">
               Nous nous engageons à protéger la confidentialité de nos utilisateurs. Les données collectées sont utilisées
               pour améliorer l'expérience utilisateur et fournir des services personnalisés. Nous ne partageons pas
               les informations avec des tiers sans consentement explicite, sauf dans le cadre des exigences légales.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Collecte de données</h3>
            <p className="mb-6">
               Nous collectons des informations lorsque vous utilisez notre application, telles que les pages visitées,
               les interactions avec les fonctionnalités, et d'autres données de trafic. Ces informations nous aident
               à comprendre comment nos utilisateurs utilisent notre application et à identifier les améliorations nécessaires.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Utilisation des cookies</h3>
            <p className="mb-6">
               Notre application utilise des cookies pour améliorer l'expérience utilisateur, suivre les sessions
               d'utilisateurs et stocker des préférences. Les utilisateurs peuvent désactiver les cookies dans leurs
               navigateurs, mais cela peut affecter le fonctionnement optimal de l'application.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-center">Sécurité</h3>
            <p className="mb-6">
               La sécurité de vos informations est importante pour nous. Nous utilisons des mesures de sécurité standard
               de l'industrie pour protéger contre l'accès non autorisé ou illégal, la modification, la divulgation ou la
               destruction de vos informations personnelles.
            </p>
         </section>
      </main>
   );
}
