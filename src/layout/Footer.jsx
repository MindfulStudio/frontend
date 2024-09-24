import Navigation from "./Navigation";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex flex-col items-center pb-4">
      <Separator className="m-4 bg-red-300 w-[393px]" />
      {/* weite Separator an weite Navigation anpassen */}
      <Navigation />
    </footer>
  );
};

export default Footer;
