import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserFeedbackText from "../typo/UserFeedbackText";
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";

import { CheckboxStayLoggedIn } from "./CheckboxStayLoggedIN";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utils/contexts/AuthProvider";

export function LoginTabs() {
  // userData for TestUser:
  const testUserAccount = import.meta.env.VITE_testUserAccount;
  const testUserPassword = import.meta.env.VITE_testUserPassword;

  // userData from login:
  const [loginData, setLoginData] = useState({
    email: testUserAccount,
    password: testUserPassword,
  });
  const [showPassword, setShowPassword] = useState(false);
  // NOTICE: vielleicht auch in provider?
  const [error, setError] = useState(null);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [waitingMessageOn, setWaitingMessageOn] = useState(false);

  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // update LoginData:
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
    // error wird zurück gesetzt:
    setError(null);
  };

  // handle error messages from backend:
  const handleError = (data) => {
    switch (data.error) {
      case "missingCredentials":
        setError({ message: "Bitte gib deine Zugangsdaten vollständig ein." });
        break;
      case "userNotFound":
        setError({ message: "Für diese Email existiert noch kein Konto." });
        break;
      case "invalidPassword":
        setError({ message: "Email oder Passwort falsch." });
        break;
      case "userNotVerified":
        setError({
          message:
            "Dein Konto wurde noch nicht verifiziert. Bitte folge zur Verifizierung dem Link in der Email.",
        });
        break;
      default:
        setError({ message: "Ein unbekannter Serverfehler ist aufgetreten." });
        break;
    }
  };

  // login - send loginData to backend:
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    // check if email and password exist:
    if (!email || !password) {
      return setError({ message: "Email oder Passwort fehlt." });
    }

    // timer for waiting message after 5 seconds:
    const timer = setTimeout(() => {
      setWaitingMessageOn(true);
    }, 5000);

    // fetching loginData - POST:
    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathOne;
      const response = await fetch(`${baseURL}${pathURL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, stayLoggedIn }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        handleError(data);
        throw new Error(error);
      }

      setIsLoggedIn(true);

      if (data.data.isConfigured) {
        navigate("/dashboard");
      } else {
        navigate("/konfiguration");
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError") {
        setError({
          message: "Es konnte keine Verbindung zum Server hergestellt werden.",
        });
      }
    } finally {
      clearTimeout(timer);
      setWaitingMessageOn(false);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder={testUserAccount}
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1 relative">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  placeholder={testUserPassword}
                  value={loginData.password}
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <EyeOpenIcon
                    className="w-5 h-auto absolute right-4 top-9"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <EyeClosedIcon
                    className="w-5 h-auto absolute right-4 top-9"
                    onClick={handleShowPassword}
                  />
                )}

                {/* TODO: Funktionalität für "Passwort vergessen" hinterlegen */}
                <UserFeedbackText
                  content={"Passwort vergessen?"}
                  type="info" // vielleicht type anpassen und UserFeedback mehr als "link" gestalten
                  // NOTICE: Was soll hier passieren? popover? Neue Seite?
                />

                {error && (
                  <UserFeedbackText content={error.message} type="error" />
                )}

                {loginData.email === testUserAccount && (
                  <UserFeedbackText
                    content={
                      "Aus Sicherheitsgründen werden in diesem Demo-Modus alle von dir vorgenommenen Einträge und Änderungen bei der Abmeldung automatisch zurückgesetzt. Einige Optionen sind für diesen Account nicht verfügbar (z.B. Passwort ändern)."
                    }
                    type="info"
                  />
                )}

                {waitingMessageOn && (
                  <UserFeedbackText
                    content={
                      "Wenn die Wartezeit lang ist, kann es daran liegen, dass der Server aufgrund von Inaktivität aus dem Ruhezustand erwacht. Dies kann bis zu 50 Sekunden dauern. Vielen Dank für deine Geduld."
                    }
                    type="info"
                  />
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <CheckboxStayLoggedIn setStayLoggedIn={setStayLoggedIn} />
              <Button type="submit">Login</Button>
              <p className="text-sm mt-2">
                Du hast kein Konto?{" "}
                <Link to={"/registrierung"} className="font-bold">
                  Registrieren
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
