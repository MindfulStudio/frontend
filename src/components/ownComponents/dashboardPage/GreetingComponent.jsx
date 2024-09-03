import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useState } from "react";

const GreetingComponent = () => {
  // username aus fetch von backend:
  // Gefühle der bisherigen check-ins aus dem backend:
  //   const { userData } = useEmotionsContext();
  const usernameFake = "Luise";
  const fakeFeelings = ["müde", "munter"];

  // state für check-ins an diesem Tag:
  //   const [checkedIn, setCheckedIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(true);

  return (
    <div className="w-auto">
      <h1 className="text-lg font-bold">Hello {usernameFake}!</h1>
      {checkedIn ? (
        <div className="pl-1">
          {/* wann Umbrüche? */}
          <p>
            Heute hast du dich bisher{" "}
            <span className="font-bold">{fakeFeelings[0]}</span>,{" "}
            <span className="font-bold">{fakeFeelings[0]}</span>, ... gefühlt.
          </p>
          {/* fakeFellings noch richtig einbinden und ... brauchen noch funktionalität um alle Gefühle anzuzeigen */}
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
