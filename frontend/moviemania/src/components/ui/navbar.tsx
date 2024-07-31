import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
   return (
      //masque la nav pour les petits ecrans
      <nav className="bg-gray-800 p-2 lg:block hidden">
         <div className="mx-auto flex items-center justify-between">
            <Link href="/">
               <Image src={Logo} alt="logo" width={100} height={100} />
            </Link>

            <Link href="/" className="text-white ml-6">
               My library
            </Link>

            <div className="flex items-center ml-auto space-x-4">
               <input
                  type="text"
                  placeholder="Recherche..."
                  className="w-60 p-2 rounded-lg outline-none bg-gray-700 text-white"
               />

               <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            </div>
         </div>
      </nav>
   );
}
