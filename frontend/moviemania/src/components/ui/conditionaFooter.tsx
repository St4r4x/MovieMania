"use client"; 

import { usePathname } from "next/navigation";
import Footer from "@/src/components/ui/footer";

const ConditionalFooter = () => {
  const pathname = usePathname();

  // Définir les routes où le Footer ne doit pas être affiché
  const hiddenFooterRoutes = ["/login", "/signin", "/preferences"];
  const showFooter = !hiddenFooterRoutes.includes(pathname);

  return showFooter ? <Footer /> : null;
};

export default ConditionalFooter;
