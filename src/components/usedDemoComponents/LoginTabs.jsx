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

export function LoginTabs() {
  // userData from login:
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  // NOTICE: kommt in provider:
  const [activeUser, setActiveUser] = useState(false);
  // NOTICE: vielleicht auch in provider?
  const [error, setError] = useState(null);
  // NOTICE: soll das noch mitgeschickt werden beim fetchen?:
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle if user likes to stay logged in:
  const handleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
  };
  // console.log({ stayLoggedIn });

  // update Userdata:
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    // error wird zurück gesetzt:
    setError(null);
  };

  // login - send loginData to backend:
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;

    // check if username and password exist:
    if (!username || !password) {
      return setError({ message: "Kein Username oder Passwort." });
    }

    // fetching userData - POST:
    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathTwo;
      const response = await fetch(`${baseURL}${pathURL}login`, {
        method: "POST",
        headers: {
          "Contend-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network responde not okay");
      }

      const data = await response.json();
      setActiveUser(true);
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  onChange={handleChange}
                />
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
                  type="info" // vielleicht type anpassen und UserFeedback mekr als "link" gestalten
                  // NOTICE: Was soll hier passieren? popover? Neue Seite?
                />

                {error && (
                  <UserFeedbackText
                    content={"Username oder Passwort sind falsch"}
                    type="error"
                  />
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
