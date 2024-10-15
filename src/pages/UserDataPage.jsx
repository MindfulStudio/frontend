import { useEffect, useState } from "react";

// ---------------------------- Import Components -------------------------------
import { UserDataTabs } from "../components/usedDemoComponents/UserDataTabs.jsx";
import PasswordTabs from "../components/usedDemoComponents/PasswordTabs.jsx";

// ---------------------------- Import Contexts -------------------------------
import { useUserContext } from "../utils/contexts/UserProvider.jsx";

// ---------------------------- Import Shadcn UI Components -------------------------------
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ---------------------------- Import Services -------------------------------
import { getUserData } from "../utils/services/getUserData.js";

const UserDataPage = () => {
  // TODO: Logik für "Email"-Änderung implementieren (Bonus) => hier wäre verification-Email nötig

  // Local states:
  const [error, setError] = useState(null);
  const [valError, setValError] = useState(null);
  const [info, setInfo] = useState(null);

  // States from Context
  const { userData, setUserData } = useUserContext();

  // SIDE EFFECTS:

  // get user data from backend (at mounting)
  useEffect(() => {
    getUserData(setError, setUserData);
  }, []);

  // FUNCTIONS

  // Clear everything
  const clearMessages = () => {
    setError(null);
    setInfo(null);
    setValError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 ">
      <main className="flex flex-col items-center w-[430px] h-screen pt-[109px] bg-background">
        <Tabs defaultValue="account" className="w-[350px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account" onClick={clearMessages}>
              Meine Nutzerdaten
            </TabsTrigger>
            <TabsTrigger value="password" onClick={clearMessages}>
              Mein Passwort
            </TabsTrigger>
          </TabsList>
          <UserDataTabs
            error={error}
            setError={setError}
            info={info}
            setInfo={setInfo}
            valError={valError}
            setValError={setValError}
          />
          <PasswordTabs
            info={info}
            setInfo={setInfo}
            error={error}
            setError={setError}
            valError={valError}
            setValError={setValError}
            userData={userData}
            clearMessages={clearMessages}
          />
        </Tabs>
      </main>
    </div>
  );
};

export default UserDataPage;
