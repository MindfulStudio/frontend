import { useEffect, useState } from "react";

// ----------------------------- Import Icons ----------------------------------
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";

// ---------------------------- Import Components -------------------------------
import UserFeedbackText from "../typo/UserFeedbackText";

// ---------------------------- Import Utils -------------------------------
import { patchUserPassword } from "../../utils/services/patchUserPassword";

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

const PasswordTabs = ({
  info,
  setInfo,
  error,
  setError,
  valError,
  setValError,
  clearMessages,
}) => {
  // Local states:
  const [showOldPassword, setShowOldPassword] = useState(false); // show/hide old password
  const [showNewPassword, setShowNewPassword] = useState(false); // show/hide new password
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  //   SIDE EFFECTS:

  // validate password (at input change)
  useEffect(() => {
    setError(null);
    setInfo(null);
    comparePasswords();
    if (passwords.newPassword) validatePassword();
  }, [passwords.newPassword, passwords.currentPassword]);

  //   FUNCTIONS:

  // CHANGE PASSWORD
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswords((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    comparePasswords();
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    patchUserPassword(passwords, setError, setInfo);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.#$!%*?&^_])[A-Za-z\d@.#$!%*?&^_]{8,}$/;

    if (!passwordRegex.test(passwords.newPassword)) {
      setValError({
        message:
          "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl sowie ein Sonderzeichen (@.#$!%*?&^_) enthalten.",
      });
    } else {
      setValError(null);
    }
  };

  const comparePasswords = () => {
    if (
      passwords.currentPassword &&
      passwords.currentPassword === passwords.newPassword
    ) {
      setError({
        message:
          "Das neue Passwort muss sich vom aktuellen Passwort unterscheiden.",
      });
    } else {
      setError(null);
    }
  };

  return (
    <TabsContent value="password">
      <Card>
        <form onSubmit={handlePasswordSubmit}>
          <CardHeader>
            <CardTitle>Passwort</CardTitle>
            <CardDescription>Ändere hier dein Passwort.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 relative">
            <div className="space-y-1">
              <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
              <Input
                id="currentPassword"
                type={showOldPassword ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            {showOldPassword ? (
              <EyeOpenIcon
                className="w-5 h-auto absolute right-8 top-8"
                onClick={() => setShowOldPassword((prev) => !prev)}
              />
            ) : (
              <EyeClosedIcon
                className="w-5 h-auto absolute right-8 top-8"
                onClick={() => setShowOldPassword((prev) => !prev)}
              />
            )}
            <div className="space-y-1">
              <Label htmlFor="newPassword">Neues Passwort</Label>
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            {showNewPassword ? (
              <EyeOpenIcon
                className="w-5 h-auto absolute right-8 top-[107px]"
                onClick={() => setShowNewPassword((prev) => !prev)}
              />
            ) : (
              <EyeClosedIcon
                className="w-5 h-auto absolute right-8 top-[107px]"
                onClick={() => setShowNewPassword((prev) => !prev)}
              />
            )}
            {info && <UserFeedbackText content={info.message} type="info" />}
            {error && <UserFeedbackText content={error.message} type="error" />}
            {valError && (
              <UserFeedbackText
                content={valError.message}
                type={"validation"}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={
                !passwords.currentPassword ||
                !passwords.newPassword ||
                passwords.currentPassword === passwords.newPassword ||
                valError
              }
            >
              Passwort speichern
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default PasswordTabs;
