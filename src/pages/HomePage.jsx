import HighlightText from "@/components/typo/HighlightText";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Element from "../assets/elements/floralElement.svg";
import { useEffect } from "react";
import { useAuthContext } from "../utils/contexts/AuthProvider";
import Cookies from "@/components/usedDemoComponents/Cookies";

const HomePage = () => {
  const { isLoggedIn, cookieConsent } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    //redirect to dashborad if logged in
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn]);

  // TODO: style anpassen
  return (
    <main className="flex flex-col items-center w-full h-screen">
      {/* Cookies */}
      <div className="flex justify-center w-full">
        <Cookies />
      </div>
      {/* login */}
      <div className="  pt-[109px] px-[50px] flex flex-col items-center pb-10 w-[400px]">
        <HighlightText highlighttext={"Willkommen"} fontsize="text-lg" />
        <p className=" pt-3 pb-6">
          Diese App möchte dir dabei helfen, deine Gefühle und emotionalen
          Reaktionen besser zu verstehen und ihre Zusammenhänge zu erforschen.
          Mit der Zeit kannst du so ein tieferes Verständnis für dich selbst
          entwickeln.
        </p>
        <Button size={"home"} variant={"homeWhite"} disabled={!cookieConsent}>
          <NavLink to="/anmeldung">Einloggen</NavLink>
        </Button>
      </div>

      {/* register */}
      <div className="flex justify-center bg-black w-full flex-grow">
        <div className="w-[282px] flex flex-col items-center text-white pt-20">
          <p>Neu hier?</p>
          <p className="pb-6">Dann starte deine Reise jetzt!</p>{" "}
          <Button size={"home"} variant={"homeBlack"} disabled={!cookieConsent}>
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
