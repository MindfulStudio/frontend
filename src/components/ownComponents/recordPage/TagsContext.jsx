// import Provider
import { useCheckinContext } from "@/utils/contexts/CheckinProvider";
import { useEmotionsContext } from "@/utils/contexts/EmotionsProvider";
import { useTagContext } from "@/utils/contexts/TagProvider";

// import Components
import { InputAndButtonForCustomTag } from "@/components/ownComponents/recordPage/InputAndButtonForCustomTag.jsx";
import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeInfoPopup } from "./BadgeInfoPopup";
import { RenderTagListbyCategory } from "./RenderTagListByCategory";

const badgeInfoMessages = {
  womit:
    "Wozu wird diese Information gespeichert? \n Diese Angabe hilft, über die Umstände deiner Gefühle zu reflektieren.",
};

const TagsContext = () => {
  // States from Providers:
  const { selectedFeeling } = useEmotionsContext();
  const { tagError } = useTagContext();
  const { showBadgeInfo, setShowBadgeInfo, handleBadgeClick } =
    useCheckinContext();

  return (
    <div className="flex flex-col items-center">
      <section className="mt-16 flex flex-col items-center">
        <div className="text-center">
          <p className="inline">
            Womit könnte dein Gefühl
            <span className="font-bold"> {selectedFeeling?.name} </span> in
            Verbindung stehen?
          </p>
          <Badge
            className="inline"
            variant="secondary"
            onClick={() => handleBadgeClick("womit")}
          >
            optional
          </Badge>
        </div>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-16 h-[423px] overflow-y-scroll">
          {RenderTagListbyCategory("was")}

          {/* Add custom tags */}
          <InputAndButtonForCustomTag category={"was"} />
          {tagError?.category === "was" && (
            <UserFeedbackText content={tagError.message} type="error" />
          )}
        </Card>
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

export default TagsContext;
