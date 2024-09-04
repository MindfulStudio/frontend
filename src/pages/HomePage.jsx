import HighlightText from "@/components/typo/HighlightText";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import Element from "../assets/elements/floralElement.svg";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center w-full h-screen">
      {/* login */}
      <div className="  pt-[109px] px-[50px] flex flex-col items-center pb-10">
        <HighlightText highlighttext={"Welcome"} fontsize="text-lg" />
        <p className=" pt-3 pb-6">
          Diese App soll ein Werkzeug sein, um die eigenen Gedanken und Gefühle
          genauer zu verstehen und die eigenen emotionalen Reaktionen besser zu
          bewältigen. Mit der Zeit können Sie so ein tieferes Verständnis für
          sich selbst entwickeln.
        </p>
        <Button size={"home"} variant={"homeWhite"}>
          <NavLink to="/anmeldung">Einloggen</NavLink>
        </Button>
      </div>

      {/* register */}
      <div className="flex justify-center bg-black w-full flex-grow">
        <div className="w-[282px] flex flex-col items-center text-white pt-20">
          <p>Neu hier?</p>
          <p className="pb-6">Dann starte deine Reise jetzt!</p>{" "}
          <Button size={"home"} variant={"homeBlack"}>
            <NavLink to="/registrierung">Registrieren</NavLink>
          </Button>
          <Element
            className="flex-shrink-0 pt-5
          "
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
