import Navigation from "./Navigation";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex flex-col items-center bg-background">
      <Separator className="bg-red-300 w-full" />
      <Navigation />
    </footer>
  );
};

export default Footer;
