"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/src/components/ui/navbar";

const ConditionalNavbar = () => {
	const pathname = usePathname();

	// Définir les routes où la Navbar ne doit pas être affichée
	const hiddenNavbarRoutes = ["/login", "/signup", "/preferences"];
	const showNavbar = pathname && !hiddenNavbarRoutes.includes(pathname);

	return showNavbar ? <Navbar /> : null;
};

export default ConditionalNavbar;
