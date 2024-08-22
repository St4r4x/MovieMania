import React, { useState, useRef } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import MovieSearch from "../movie-search/MovieSearch";

export default function Navbar() {
   const [dropdownOpen, setDropdownOpen] = useState({
      library: false,
      profile: false,
   });
   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
   const [menuOpen, setMenuOpen] = useState(false);

   const menuRef = useRef<HTMLDivElement>(null);

   const handleMouseEnter = (menu: "library" | "profile") => {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      setDropdownOpen((prevState) => ({ ...prevState, [menu]: true }));
   };

   const handleMouseLeave = (menu: "library" | "profile") => {
      const id = setTimeout(() => {
         setDropdownOpen((prevState) => ({ ...prevState, [menu]: false }));
      }, 300);
      setTimeoutId(id);
   };

   const handleClick = (menu: "library" | "profile") => {
      setDropdownOpen((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
   };

   const toggleMenu = () => {
      setMenuOpen(!menuOpen);
   };

   // Function to handle menu item click
   const handleMenuItemClick = () => {
      setMenuOpen(false);
   };

   return (
      <nav className="bg-customBackground py-2 px-7 sticky top-0 z-20">
         {/* Navbar Desktop */}
         <div className="hidden lg:flex items-center justify-between mx-auto">
            <div className="flex items-center space-x-4">
               <Link href="/">
                  <Image src={Logo} alt="logo" width={100} height={100} />
               </Link>
               <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("library")}
                  onMouseLeave={() => handleMouseLeave("library")}
               >
                  <p className="text-white ml-6 cursor-pointer" onClick={() => handleClick("library")}>
                     Ma bibliothèque
                  </p>
                  {dropdownOpen.library && (
                     <div
                        ref={menuRef}
                        className="absolute z-10 border border-1 border-gray-600 bg-[#1F2937] text-white rounded-lg mt-2 w-40 shadow-lg py-2"
                     >
                        <Link href="/profile/saved" className="block px-4 py-1 hover:bg-gray-600 hover:text-primary" onClick={handleMenuItemClick}>
                           Sauvegardé
                        </Link>
                        <Link href="/profile/ratings" className="block px-4 py-1 hover:bg-gray-600 hover:text-primary" onClick={handleMenuItemClick}>
                           Noté
                        </Link>
                     </div>
                  )}
               </div>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
               {/* <input
                  type="text"
                  placeholder="Recherche..."
                  className="w-60 p-2 rounded-lg outline-none bg-gray-700 text-white"
               /> */}
               <MovieSearch />

               <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("profile")}
                  onMouseLeave={() => handleMouseLeave("profile")}
               >
                  <div
                     className="w-10 h-10 rounded-full bg-gray-700 cursor-pointer"
                     onClick={() => handleClick("profile")}
                  ></div>
                  {dropdownOpen.profile && (
                     <div className="absolute z-10 border border-1 border-gray-600 bg-[#1F2937] text-white rounded-lg mt-2 right-0 w-32 shadow-lg py-2">
                        <Link href="/profile" className="block px-4 py-1 hover:bg-gray-600 hover:text-primary" onClick={handleMenuItemClick}>
                           Profil
                        </Link>
                        <Link href="/settings" className="block px-4 py-1 hover:bg-gray-600 hover:text-primary" onClick={handleMenuItemClick}>
                           Paramètres
                        </Link>
                        <button
                           className="text-red-500 block px-4 py-1 hover:bg-gray-600"
                           onClick={() => {
                              signOut({ callbackUrl: "/login" });
                              handleMenuItemClick(); // Close menu on sign out
                           }}
                        >
                           Déconnexion
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Menu Burger Mobile */}
         <div className="lg:hidden flex items-center justify-between mx-auto">
            <Link href="/">
               <Image src={Logo} alt="logo" width={50} height={50} />
            </Link>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
               {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
               ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
               )}
            </button>
         </div>

         {/* Menu Burger Content */}
         {menuOpen && (
            <div className="lg:hidden flex flex-col space-y-4 mt-4 text-sm">
               <input
                  type="text"
                  placeholder="Recherche..."
                  className="w-full p-2 rounded-lg outline-none bg-gray-700 text-white"
               />
               <Link href="/" className="text-white" onClick={handleMenuItemClick}>
                  Accueil
               </Link>
               <Link href="/profile/saved" className="block text-white" onClick={handleMenuItemClick}>
                  Ma bibliothèque
               </Link>
               <Link href="/profile" className="block text-white" onClick={handleMenuItemClick}>
                  Profil
               </Link>
               <Link href="/about" className="block text-white" onClick={handleMenuItemClick}>
                  À propos
               </Link>
               <Link href="/settings" className="block text-white" onClick={handleMenuItemClick}>
                  Paramètres
               </Link>
               <Link href="/privacy" className="block text-white" onClick={handleMenuItemClick}>
                  Confidentialité
               </Link>
               <Link href="/terms" className="block text-white" onClick={handleMenuItemClick}>
                  Conditions d'utilisation
               </Link>
               <button className="text-red-500 block" onClick={() => {
                  signOut({ callbackUrl: "/login" });
                  handleMenuItemClick(); 
               }}>
                  Déconnexion
               </button>
            </div>
         )}
      </nav>
   );
}
