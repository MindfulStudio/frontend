import HighlightText from "@/components/typo/HighlightText";
import IlluAnspannung from "/src/assets/feelingsFamilies/Vector_Anspannung.svg";
import IlluEntspannung from "/src/assets/feelingsFamilies/Vector_Entspannung.svg";
import IlluFreude from "/src/assets/feelingsFamilies/Vector_Freude.svg";
import IlluGemischteGefühle from "/src/assets/feelingsFamilies/Vector_gemGefühle.svg";
import IlluTrauer from "/src/assets/feelingsFamilies/Vector_Trauer.svg";

const FeelingsFamilyButton = ({ feelingsFamilies, onSelectedFamily }) => (
  <div className="mb-6 text-center">
    {feelingsFamilies.map((family) => (
      <button
        key={family.id}
        onClick={() => onSelectedFamily(family.id)}
        className=" text-black px-4 py-2 rounded-lg m-2"
      >
        {family.name}
      </button>
    ))}
  </div>
);

export default FeelingsFamilyButton;
