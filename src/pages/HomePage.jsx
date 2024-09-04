import HighlightText from "@/components/typo/HighlightText";
import { Button } from "@/components/ui/button";

// TODO: hintergrundfarbe schwart und nur oberen kasten in rosa
// TODO: design beenden
// TODO: register und login einrichten
// TODO: NAV muss ausgeblendet werden

const HomePage = () => {
  return (
    <main className="pt-[109px] px-[50px] flex flex-col items-center">
      {/* login */}
      <div className="h-[386px] w-[282px] flex flex-col items-center ">
        <HighlightText highlighttext={"Welcome"} fontsize="text-lg" />
        <p className="text-sm pt-3 pb-6">
          Diese App soll ein Werkzeug sein, um die eigenen Gedanken und Gefühle
          genauer zu verstehen und die eigenen emotionalen Reaktionen besser zu
          bewältigen. Mit der Zeit können Sie so ein tieferes Verständnis für
          sich selbst entwickeln.
        </p>
        <Button size={"home"} variant={"homeWhite"}>
          Einloggen
        </Button>
      </div>
      {/* register */}
      <div className="w-[282px]  flex flex-col items-center ">
        <p>Neu hier?</p>
      </div>
    </main>
  );
};

export default HomePage;
