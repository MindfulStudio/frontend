import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

const FeelingsFamilyComponent = () => {

  // TODO: Funktionalität Buttons implementieren
// NOTICE: soll es auch ein hover geben?

  return (
    <div className="mt-5 grid grid-cols-3 grid-rows-6 h-[478px] w-[293px]">
      {/* Anspannung */}
      <button className="flex flex-col items-start row-span-2 col-span-2 justify-end">
        <div className="flex flex-col items-center">
          <IlluAnspannung className="flex-shrink-0" />
          <HighlightText highlighttext="Anspannung" fontsize="text-md" />
        </div>
      </button>

      {/* Freude */}
      <button className="flex flex-col items-center row-span-2 justify-start">
        <IlluFreude className="flex-shrink-0" />
        <HighlightText highlighttext="Freude" fontsize="text-md" />
      </button>

      {/* Entspannung */}
      <button className="flex flex-col items-center row-span-2 col-span-3 justify-center pl-7">
        <IlluEntspannung className="flex-shrink-0" />
        <HighlightText highlighttext="Entspannung" fontsize="text-md" />
      </button>

      {/* gemischte Gefühle */}
      <button className="items-start justify-start col-span-2 row-span-2 pb-10">
        <div className="flex flex-col items-center">
          <IlluGemischteGefühle className="flex-shrink-0" />
          <HighlightText highlighttext="gemischte Gefühle" fontsize="text-md" />
        </div>
      </button>

      {/* Trauer */}
      <button className="flex flex-col items-center  justify-end row-span-2">
        <IlluTrauer className="flex-shrink-0" />
        <HighlightText highlighttext="Trauer" fontsize="text-md" />
      </button>
    </div>
  );
};

export default FeelingsFamilyComponent;
