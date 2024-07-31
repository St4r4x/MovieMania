"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Définir le type pour les images
//! il manquera l'id du film
interface CarouselImage {
   src: string;
   name: string;
}

// Définir les types pour les props du composant
interface CarouselProps {
   images: CarouselImage[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
   const carouselRef = useRef<HTMLDivElement>(null);

   const handleNext = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollLeft += carouselRef.current.clientWidth / 2;
      }
   };

   const handlePrev = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollLeft -= carouselRef.current.clientWidth / 2;
      }
   };

   return (
      <div className="relative w-full overflow-hidden">
         <div ref={carouselRef} className="flex overflow-x-auto scroll-smooth scrollbar-hide">
            {images.map(({ src, name }, index) => (
               <div key={index} className="flex-shrink-0 w-[250px] p-2">
                  <Link href="/details-film">
                     <div className="relative">
                        <Image
                           src={src}
                           alt={`Image ${index + 1}`}
                           layout="responsive"
                           width={250}
                           height={375}
                           objectFit="cover"
                           className="rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-b-lg">
                           {name}
                        </div>
                     </div>
                  </Link>
               </div>
            ))}
         </div>
         <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 flex items-center justify-center"
         >
            <ChevronLeft size={24} />
         </button>
         <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 flex items-center justify-center"
         >
            <ChevronRight size={24} />
         </button>
      </div>
   );
};

export default Carousel;
