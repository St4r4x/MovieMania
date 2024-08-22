import React from "react";
import Link from "next/link";

const Footer = () => {
   return (
      <footer className="text-white py-4 mt-8 px-7">
         <div className="mx-auto">
            {/* Footer Links Desktop */}
            <div className="hidden md:flex space-x-4 mb-4">
               <Link href="/" className="hover:underline text-sm">
                  Home
               </Link>
               <Link href="/about" className="hover:underline text-sm">
                  À propos
               </Link>
            </div>

            <div className="border-t border-white mb-4"></div>

            {/* Footer Content */}
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4 text-sm">
               <p className="text-center">&copy; 2024 MovieMania. Tous droits réservés.</p>

               {/* Footer Links Visible Only on Desktop */}
               <div className="hidden md:flex items-center space-x-4">
                  <span>•</span>
                  <Link href="/privacy" className="hover:underline text-sm">
                     Confidentialité
                  </Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:underline text-sm">
                     Conditions d'utilisation
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
