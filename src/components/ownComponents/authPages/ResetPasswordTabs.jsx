import { useNavigate, useParams } from "react-router-dom";

// ----------------------------- Import Icons ----------------------------------
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";

// ---------------------------- Import Shadcn UI Components -------------------------------
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

// ---------------------------- Import Components -------------------------------
import UserFeedbackText from "../../typo/UserFeedbackText";

// ---------------------------- Import Utils -------------------------------
import { validatePassword } from "../../../utils/helpers/validatePassword.js";
import { resetPassword } from "../../../utils/services/resetPassword.js";

const ResetPasswordTabs = () => {
  // Local states
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [valError, setValError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showPassword, setShowPassword] = useState(false);

  // Hooks
  const { token } = useParams();
  const navigate = useNavigate();

  //   SIDE EFFECTS:

  // validate password (at input change)
  useEffect(() => {
    setError(null);
    setValError(null);
    if (password) validatePassword(password, setValError);
  }, [password]);

  // countdown for redirecting to login page
  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      // clean-up
      return () => clearInterval(interval);
    }
  }, [success]);

  // redirecting
  useEffect(() => {
    if (countdown === 0) {
      navigate("/anmeldung");
    }
  }, [countdown]);

  //   FUNCTIONS:

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    resetPassword(token, password, setError, setSuccess);
    setPassword("");
  };

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <form onSubmit={handlePasswordSubmit}>
            <CardHeader>
              <CardTitle>Neues Passwort</CardTitle>
              <CardDescription>
                Bitte setze hier dein neues Passwort.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 relative">
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Neues Password"
                  required
                  onChange={handleChange}
                />
              </div>
              {showPassword ? (
                <EyeOpenIcon
                  className="w-5 h-auto absolute right-8 top-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <EyeClosedIcon
                  className="w-5 h-auto absolute right-8 top-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
              {error && (
                <UserFeedbackText content={error.message} type="error" />
              )}
              {valError && (
                <UserFeedbackText
                  content={valError.message}
                  type={"validation"}
                />
              )}
              {success && (
                <UserFeedbackText
                  content={`Passwort erfolgreich aktualisiert. Du wirst in ${countdown} Sekunden zur Login-Seite weitergeleitet.`}
                  type={"info"}
                />
              )}
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <Button type="submit" disabled={!password || valError || success}>
                Passwort ändern
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ResetPasswordTabs;
