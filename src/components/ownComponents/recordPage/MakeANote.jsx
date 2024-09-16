import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { Textarea } from "@/components/ui/textarea";

import { useCheckinContext } from "@/utils/CheckinProvider";

const MakeANote = () => {
  const { showNoteInfo, setShowNoteInfo, comment, setComment } =
    useCheckinContext();

  // show/hide UserFeedBackText
  const handleInfo = () => {
    setShowNoteInfo(!showNoteInfo);
  };

  const handleUserComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  return (
    <div className="flex flex-col items-center w-[290px] text-center">
      <p>Möchtest du noch etwas zu deinem Gefühl notieren?</p>
      <div className="w-[290px] bg-white p-[22px] text-center mt-16 h-[423px]">
        <Textarea
          placeholder="Hier ist Platz für deine Notiz."
          value={comment}
          onChange={handleUserComment}
        />
        {showNoteInfo ? (
          <UserFeedbackText
            content="Im Journal kannst du deine Notiz jederzeit nachlesen. Du findest es in der Hauptnavigation."
            type="info"
            onClick={handleInfo} // Hide the text on click
          />
        ) : (
          <button className=" underline mt-4 text-sm" onClick={handleInfo}>
            Wo finde ich meine Notizen später wieder?
          </button>
        )}
      </div>
    </div>
  );
};

export default MakeANote;
