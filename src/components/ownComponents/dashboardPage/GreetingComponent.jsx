import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useState } from "react";
import { PopoverDots } from "@/components/usedDemoComponents/Popover";

const GreetingComponent = () => {
  // username aus fetch von backend:
  // Gefühle der bisherigen check-ins aus dem backend:
  //   const { userData } = useEmotionsContext();
  const usernameFake = "Luise";
  const fakeFeelings = ["fit", "munter", "gereizt", "aufgeregt"];

  // state für check-ins an diesem Tag:
  //   const [checkedIn, setCheckedIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(true);

  // TODO: Verbindung Provider
  // TODO: Fetching in Provider und States einrichten
  // TODO: Logik für ... bzw popover -> soll nur angezeigt werden, wenn mehr als zwei Gefühle eingecheckt wurden
  //   TODO: popover weite und position

  return (
    <div className="w-[293px]">
      {/* greeting */}
      <h1 className="text-lg font-bold">Hello {usernameFake}!</h1>

      {/* individual message */}
      {checkedIn ? (
        <div className="pl-1">
          {/* wann Umbrüche? */}
          <p>
            Heute hast du dich bisher{" "}
            {/* <span className="font-bold">{fakeFeelings[0]}</span>,{" "}
            <span className="font-bold">{fakeFeelings[1]}</span>,{" "} */}
            <span>
              {fakeFeelings.slice(0, 2).map((feeling, index) => {
                return (
                  <p key={feeling} className="inline-block pr-1">
                    {feeling},
                  </p>
                );
              })}
            </span>{" "}
            <PopoverDots
              title={`...`}
              descriptionPopover={`Du hast heute bisher folgende Gefühle erfasst:`}
              textPopover={`${fakeFeelings}`}
            />{" "}
            gefühlt.
          </p>
          {/* TODO: fakeFellings noch richtig einbinden und ... brauchen noch funktionalität um alle Gefühle anzuzeigen */}
          {/* ... soll nur angezeigt werde, wenn mehr als zwei feelings in der Liste sind -> Logik dafür einbinden */}
          <p className="font-bold mt-5">Was fühlst du gerade?</p>
        </div>
      ) : (
        <div>
          <p className="pl-1"> Was fühlst du gerade?</p>
        </div>
      )}
    </div>
  );
};

export default GreetingComponent;
