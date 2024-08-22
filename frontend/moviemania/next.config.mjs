/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "image.tmdb.org",
         pathname: "/t/p/**",
       },
     ],
     unoptimized: true, // Désactive l'optimisation des images
   },
 };
 
 export default nextConfig;