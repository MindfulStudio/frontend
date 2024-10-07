import { useEffect, useState } from "react";

// ----------------------------- Import Icons ----------------------------------
import Delete from "/src/assets/icons/delete-2-svgrepo-com.svg";

// ---------------------------- Import Components -------------------------------
import UserFeedbackText from "../typo/UserFeedbackText";
import { DeleteConfirmationDialog } from "./DeleteConfirmDialog.jsx";
import { ConfigSwitch } from "./ConfigSwitch";

// ---------------------------- Import Contexts -------------------------------
import { useAuthContext } from "../../utils/contexts/AuthProvider.jsx";
import { useUserContext } from "../../utils/contexts/UserProvider.jsx";

// ---------------------------- Import Utils -------------------------------
import { patchUserData } from "../../utils/services/patchUserData.js";
import { deleteUser } from "../../utils/services/deleteUser.js";

// ---------------------------- Import Shadcn UI Components -------------------------------
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function UserDataTabs({
  error,
  setError,
  info,
  setInfo,
  valError,
  setValError,
}) {
  // Local states:
  const [isChanged, setIsChanged] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // States from Context
  const { setIsLoggedIn, setIsLoggedOut } = useAuthContext();
  const { userData, setUserData } = useUserContext();

  // SIDE EFFECTS:

  // re-validate username on change:
  useEffect(() => {
    validateUsername();
  }, [userData.username]);

  // FUNCTIONS:

  // validation function for username:
  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
    if (!usernameRegex.test(userData.username)) {
      setValError({
        message:
          "Der Benutzername darf nur Buchstaben und Zahlen enthalten und muss zwischen 3 und 12 Zeichen lang sein.",
      });
    } else {
      setValError(null);
    }
  };

  // toggle config inputs on change:
  const handleToggle = (id) => {
    setUserData((prevData) => ({
      ...prevData,
      config: { ...prevData.config, [id]: !prevData.config[id] },
    }));
    setError(null);
    setInfo(null);
    setIsChanged(true);
  };

  // handle user data inputs on change (username & email):
  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
    setError(null);
    setInfo(null);
    setIsChanged(true);
  };

  // submit - send updated userData to backend:
  const handleSubmit = async (e) => {
    e.preventDefault();
    patchUserData(userData, setError, setInfo);
  };

  // DELETE PROFILE
  // function a): show delete confirmation dialog
  const showDeleteConfirmAlert = () => {
    setIsDeleteDialogOpen(true); // open delete dialog
  };
  // function b): handle user deletion
  const handleDeleteUser = async () => {
    const deleteResult = await deleteUser(setError);

    if (deleteResult) {
      console.log("Benutzerprofil erfolgreich gelöscht");
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    }
    setIsDeleteDialogOpen(false); // close delete dialog
  };

  return (
    <TabsContent value="account">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Meine Nutzerdaten</CardTitle>
            {/* vielleicht gibt es noch einen besseren Titel? */}
          </CardHeader>
          <CardContent className="space-y-2">
            {/* profile-image */}
            <div className="space-y-1  w-24 h-24 rounded-full">
              <img src="/profileImages/profileImgOne.png" alt="profile Image" />
            </div>

            {/* username */}
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                type="text"
                onChange={(e) => handleChange(e)}
                value={userData.username}
                required
              />
              {valError && (
                <UserFeedbackText
                  content={valError.message}
                  type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                />
              )}
            </div>

            {/* email */}
            <div className="space-y-1">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                placeholder="E-Mail"
                type="email"
                onChange={(e) => handleChange(e)}
                value={userData.email}
                disabled // disabled, da bei Passworänderung auch neue Verification-Email notwendig wäre
              />
            </div>

            <CardDescription className="pt-2">
              Was möchtest du noch zusätzlich erfassen?
            </CardDescription>
            <div className="space-y-1">
              <ConfigSwitch
                name={"Schlafzeit"}
                id={"sleepingHours"}
                handleToggle={handleToggle}
                configData={userData.config}
              />
            </div>
            <div className="space-y-1">
              <ConfigSwitch
                name={"Körperliche Aktivität"}
                id={"physicalActivity"}
                handleToggle={handleToggle}
                configData={userData.config}
              />
            </div>
            <div className="space-y-1">
              <ConfigSwitch
                name={"Wetter"}
                id={"weather"}
                handleToggle={handleToggle}
                configData={userData.config}
              />
            </div>
            {info && <UserFeedbackText content={info.message} type="info" />}
            {error && <UserFeedbackText content={error.message} type="error" />}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={!isChanged || valError}>
              aktualisieren
            </Button>

            {/* User delete  */}
            <Button
              variant="secondary"
              type="button"
              onClick={showDeleteConfirmAlert}
            >
              <p>Profil löschen</p>
              <Delete className="h-5 w-5 ml-1" />
            </Button>

            {/* Delete confirmation dialog */}
            <DeleteConfirmationDialog
              isOpen={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)}
              onConfirm={handleDeleteUser}
            />
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
}
