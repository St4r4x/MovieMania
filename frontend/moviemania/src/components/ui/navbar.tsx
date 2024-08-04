import React, { useState, useRef } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
   const [dropdownOpen, setDropdownOpen] = useState({
      library: false,
      profile: false,
   });
   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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
      if (dropdownOpen[menu]) {
         setDropdownOpen((prevState) => ({ ...prevState, [menu]: false }));
      } else {
         setDropdownOpen((prevState) => ({ ...prevState, [menu]: true }));
      }
   };

   return (
      // masque la nav pour les petits écrans
      <nav className="bg-gray-800 p-2 lg:block hidden">
         <div className="mx-auto flex items-center justify-between">
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
                     className="absolute z-10 border border-1 border-white bg-[#1F2937] text-white rounded-lg mt-2 w-40 shadow-lg"
                  >
                     <Link href="/profile/saved" className="block px-4 py-2 hover:bg-gray-600 rounded-lg hover:text-primary">
                        Sauvegardé
                     </Link>

                     <Link href="/profile/ratings" className="block px-4 py-2 hover:bg-gray-600 rounded-lg hover:text-primary">
                        Notée
                     </Link>
                  </div>
               )}
            </div>

            <div className="flex items-center ml-auto space-x-4">
               <input
                  type="text"
                  placeholder="Recherche..."
                  className="w-60 p-2 rounded-lg outline-none bg-gray-700 text-white"
               />

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
                     <div className="absolute z-10 border border-1 border-white bg-[#1F2937] text-white rounded-lg mt-2 right-0 w-32 shadow-lg">
                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-600 rounded-lg hover:text-primary">
                           Profile
                        </Link>

                        <Link href="/settings" className="block px-4 py-2 hover:bg-gray-600 hover:text-primary">
                           Settings
                        </Link>

                        <Link href="" className="text-red-500 block px-4 py-2 rounded-lg hover:bg-gray-600">
                           Log out
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}
