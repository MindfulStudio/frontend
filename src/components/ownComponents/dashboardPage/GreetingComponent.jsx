// import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useEffect, useState } from "react";
import { PopoverDots } from "@/components/usedDemoComponents/Popover";
import { Slice } from "lucide-react";

// TODO: popover weite und position

const GreetingComponent = () => {
  const baseURL = import.meta.env.VITE_baseURL;
  const basePathTwo = import.meta.env.VITE_basePathTwo;
  const basePathThree = import.meta.env.VITE_basePathThree;

  const [username, setUsername] = useState(null);
  const [emotionsFromToday, setEmotionsFromToday] = useState(null);
  // state für check-ins an diesem Tag:
  const [checkedIn, setCheckedIn] = useState(false);

  // const { setSelectedFamily } = useEmotionsContext(); //! ist noch aktuell?

  // fetch functions
  const getUserData = async () => {
    try {
      const res = await fetch(`${baseURL}${basePathTwo}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const getCheckinsFromToday = async () => {
    try {
      const res = await fetch(`${baseURL}${basePathThree}checkins/today`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        if (userData) setUsername(userData.data.username);
        const checkins = await getCheckinsFromToday();
        if (checkins) {
          // extract the feelings from each checkin
          const emotions = checkins.data.reduce(
            (acc, curr) => [...acc, curr.emotion.name],
            []
          );
          setEmotionsFromToday(emotions);
          // check if user has already checked in today
          if (checkins.data.length > 0) setCheckedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[293px]">
      {/* greeting */}
      <h1 className="text-lg font-bold">Hello {username}!</h1>
      {/* individual message */}
      {checkedIn ? (
        <div className="pl-1">
          <div>
            Heute hast du dich bisher{" "}
            <span>
              {emotionsFromToday &&
                emotionsFromToday.slice(0, 2).map((feeling, index) => {
                  if (index === 2) return;
                  return (
                    <p key={index} className="inline-block pr-1">
                      {index < 1 ? feeling + ", " : feeling}
                    </p>
                  );
                })}
            </span>
            {emotionsFromToday && emotionsFromToday.length > 2 && (
              <>
                {", "}
                <PopoverDots
                  title={`...`}
                  descriptionPopover={`Du hast heute bisher folgende Gefühle erfasst:`}
                  textPopover={`${emotionsFromToday}`}
                />{" "}
              </>
            )}
            gefühlt.
          </div>
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
