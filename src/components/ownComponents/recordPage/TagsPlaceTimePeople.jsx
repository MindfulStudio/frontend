// import Providers:
import { useTagContext } from "@/utils/TagProvider";
import { useEmotionsContext } from "@/utils/contexts/EmotionsProvider";
import { useCheckinContext } from "../../../utils/contexts/CheckinProvider";

// import Components:
import InputAndButtonForCustomTag from "./InputAndButtonForCustomTag";
import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { BadgeInfoPopup } from "./BadgeInfoPopup";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const badgeInfoMessages = {
  wann: "Wozu wird diese Information gespeichert? \n Wir werten diese Angabe für dich aus, um zeitliche Muster deiner Gefühle zu erkennen.",
  wo: "Wozu wird diese Information gespeichert? \n Diese Einordnung hilft, Einflüsse gewisser Orte auf deine Gefühle zu erkennen.",
  mitWem:
    "Wozu wird diese Information gespeichert? \n Diese Angabe wird ausgewertet, um den Einfluss von Beziehungen und sozialer Kontakte auf deine Gefühlswelt zu erkennen.",
};

const TagsPlaceTimePeople = () => {
  // States from Providers:
  const { selectedFeeling } = useEmotionsContext();

  const { renderTagListbyCategory, tagError, selectedTags } = useTagContext();

  const { showBadgeInfo, setShowBadgeInfo, handleBadgeClick } =
    useCheckinContext();

  // Check if the user has choosen tags for each category
  const hasChoosenTags = (category) => {
    return selectedTags.some((tag) => tag.category === category);
  };

  // Function to render the category section (wann, wo, mitWem)
  const renderCategorySection = (category, displayCategory) => (
    <>
      <div className="text-center">
        <p className="inline">
          {displayCategory} hast du dich
          <span className="font-bold"> {selectedFeeling?.name} </span> gefühlt?
        </p>
        <Badge
          className="inline"
          variant="secondary"
          onClick={() => handleBadgeClick(category)}
        >
          wichtig
        </Badge>
      </div>

      <Card
        className={`w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[141px] overflow-y-scroll ${
          !hasChoosenTags(category) ? "animate-wobble" : ""
        }`}
      >
        <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
          {renderTagListbyCategory(category)}
        </ul>
        <InputAndButtonForCustomTag category={category} />
        {tagError?.category === category && (
          <UserFeedbackText content={tagError.message} type="error" />
        )}
      </Card>
    </>
  );

  // Rendered JSX
  return (
    <div className="flex flex-col items-center">
      <section className="mt-16 flex flex-col items-center">
        {renderCategorySection("wann", "Wann")}{" "}
        {/* category, displayCategory */}
        {renderCategorySection("wo", "Wo")}
        {renderCategorySection("mitWem", "Mit wem")}
      </section>

      {showBadgeInfo && (
        <BadgeInfoPopup
          message={badgeInfoMessages[showBadgeInfo]}
          onClose={() => setShowBadgeInfo(null)}
        />
      )}
    </div>
  );
};

export default TagsPlaceTimePeople;
