import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const BadgeInfoPopup = ({ message, onClose }) => {
  // ------------------- Helper functions -----------------------------
  // add a line break after the \n mark in the badge info message
  const renderBadgeInfoContent = (message) => {
    return message.split("\n").map((line, index) => (
      <p key={index} className={index === 0 ? "font-bold mb-2" : ""}>
        {line}
      </p>
    ));
  };

  // ------------------- Render ---------------------------------------
  return (
    <Card
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/90 rounded p-4 shadow-lg text-sm text-white text-center group"
      onClick={onClose}
    >
      <div className="max-w-xs">{renderBadgeInfoContent(message)}</div>
      <Button
        className="mt-4 px-4 rounded-full"
        onClick={onClose}
        variant="secondary"
      >
        schließen
      </Button>
    </Card>
  );
};

export default BadgeInfoPopup;
