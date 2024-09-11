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
import { useNavigate } from "react-router-dom";

export function LoginTabs() {
  // userData from login:
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  // NOTICE: vielleicht auch in provider?
  const [error, setError] = useState(null);
  // NOTICE: soll das noch mitgeschickt werden beim fetchen?:
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  // useNavigate:
  const navigate = useNavigate();

  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle if user likes to stay logged in:
  const handleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
  };
  // console.log({ stayLoggedIn });

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
        setError({ message: "Bitte Zugangsdaten vollständig eingeben." });
        break;
      case "userNotFound":
        setError({ message: "User nicht gefunden." });
        break;
      case "invalidPassword":
        setError({ message: "Email oder Passwort falsch." });
        break;
      case "userNotVerified":
        setError({
          message:
            "Dieses Konto wurde noch nicht verifiziert. Zur Verifizierung bitte dem Link in der E-Mail folgen.",
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

    // fetching loginData - POST:
    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathOne;
      const response = await fetch(`${baseURL}${pathURL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        handleError(data);
        throw new Error(error);
      }
      if (data.data.isConfigured) {
        navigate("/dashboard");
      } else {
        navigate("/konfiguration");
      }
      return data;
    } catch (error) {
      console.log(error);
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
                <Input id="email" placeholder="Email" onChange={handleChange} />
              </div>

              <div className="space-y-1 relative">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  placeholder="Passwort"
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
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <CheckboxStayLoggedIn ontoggle={handleStayLoggedIn} />

              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
