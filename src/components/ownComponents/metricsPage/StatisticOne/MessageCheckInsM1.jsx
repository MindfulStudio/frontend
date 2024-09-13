import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { CardDescription } from "@/components/ui/card";

const MessageCheckInsM1 = () => {
  return (
    <div>
      <CardDescription className="pb-2">
        In dieser Statistik siehst du wann, wo, mit wem und in welchen
        Zusammenhängen du Emotionen einer bestimmten Gefühlsfamilie erlebt hast.
        So erhaltst du Einblicke in deine emotionalen Muster und Verbindungen.
      </CardDescription>
      <UserFeedbackText
        content={"Ab 7 check-ins kannst du deine Statistik abrufen."}
        type={"info"}
      />
    </div>
  );
};

export default MessageCheckInsM1;
