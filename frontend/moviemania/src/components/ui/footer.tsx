import React from "react";
import Link from "next/link";

const Footer = () => {
   return (
      <footer className="text-white py-4 mt-8">
         <div className="container mx-auto px-4">
            <div className="flex space-x-4 mb-4 ">
               <Link href="/" className="hover:underline text-sm">
                  Home
               </Link>

               <Link href="/about" className="hover:underline text-sm">
                  À propos
               </Link>
            </div>

            <div className="border-t border-white mb-4"></div>

            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 text-sm">
               <p>&copy; 2024 MovieMania. Tous droits réservés.</p>

               <span className="hidden md:inline">•</span>

               <Link href="/privacy" className="hover:underline text-sm">
                  Confidentialité{" "}
               </Link>

               <span className="hidden md:inline">•</span>

               <Link href="/terms" className="hover:underline text-sm">
                  Conditions d'utilisation{" "}
               </Link>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
