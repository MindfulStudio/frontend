import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { CardDescription } from "@/components/ui/card";

const MessageCheckInsM2 = () => {
  return (
    <div>
      <CardDescription className="pb-2">
        In dieser Statistik siehst du im Zusammenhang mit welchen Orten, Zeiten,
        Personen, Tätigkeiten oder Kontexten du welche Gefühle erlebt hast. So
        erhältst du Einblicke in deine emotionalen Muster und Verbindungen.
      </CardDescription>
      <UserFeedbackText
        content={"Ab einem Gefühlseintrag kannst du deine Statistik abrufen."}
        type={"info"}
      />
    </div>
  );
};

export default MessageCheckInsM2;
