import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

const FeelingsFamilyComponent = () => {
  return (
    <div className="mt-5  flex ">
      {/* Anspannung */}
      <div className="flex flex-col items-center">
        <IlluAnspannung className="w-[89px] h-[91px]" />
        <HighlightText highlighttext="Anspannung" fontsize="text-md" />
      </div>

{/* Höhe und Weite anpassen! */}
      {/* Freude */}
      <div className="flex flex-col items-center">
        <IlluFreude className="w-[89px] h-[91px]" />
        <HighlightText highlighttext="Freude" fontsize="text-md" />
      </div>

      {/* Entspannung */}
      <div className="flex flex-col items-center">
        <IlluEntspannung className="w-[89px] h-[91px]" />
        <HighlightText highlighttext="Entspannung" fontsize="text-md" />
      </div>

    </div>
  );
};

export default FeelingsFamilyComponent;
