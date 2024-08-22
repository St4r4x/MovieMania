"use client";

import { usePathname } from "next/navigation";
import Footer from "@/src/components/ui/footer";

const ConditionalFooter = () => {
	const pathname = usePathname();

	// Définir les routes où le Footer ne doit pas être affiché
	const hiddenFooterRoutes = ["/login", "/signup", "/preferences"];
	const showFooter = pathname && !hiddenFooterRoutes.includes(pathname);

	return showFooter ? <Footer /> : null;
};

export default ConditionalFooter;
