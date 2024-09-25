// -------------- import Context ------------------------------------------
import { useCheckinContext } from "@/utils/CheckinProvider";

// -------------------- import Typo Components ----------------------------
import UserFeedbackText from "@/components/typo/UserFeedbackText";

// ----------------------- import shadcn Components ----------------------
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// ----------------------- import Components --------------------------
import BadgeInfoPopup from "./BadgeInfoPopup";

const badgeInfoMessages = {
  comment:
    "Hier kannst du einen persönlichen Eintrag hinterlassen! \n Deine Notiz wird gespeichert und du kannst sie jederzeit im Journal nachlesen. Du findest das Journal in der Hauptnavigation.",
};

const MakeANote = () => {
  // ------------------------------- States from Contexts -----------------------
  const {
    comment,
    setComment,
    showBadgeInfo,
    setShowBadgeInfo,
    handleBadgeClick,
  } = useCheckinContext();

  // ------------------------------- Functions -----------------------------
  const handleUserComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  // ------------------------------- Render --------------------------------------

  return (
    <div className="flex flex-col items-center w-full max-w-[390px] mx-auto">
      <section className="mt-16 flex flex-col items-center text-center">
        <div className="text-center">
          <p className="inline">
            Möchtest du noch etwas zu deinem Gefühl notieren?
          </p>
          <Badge
            className="inline"
            variant="secondary"
            onClick={() => handleBadgeClick("comment")}
          >
            optional
          </Badge>
        </div>

        <Card className="w-[290px] bg-white p-[22px] text-center mt-16 h-[423px]">
          <Textarea
            className="text-md"
            placeholder={`Das Gefühl sagt mir...\nIch wünsche mir ...\nIch denke ... \n`}
            value={comment}
            onChange={handleUserComment}
          />
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

export default MakeANote;
