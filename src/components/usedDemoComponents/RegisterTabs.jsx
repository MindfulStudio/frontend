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

import { CheckboxTherms } from "./CheckboxTherms";

import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";
import { useEffect, useState } from "react";
import UserFeedbackText from "../typo/UserFeedbackText";

// TODO: captcha

export function RegisterTabs() {
  // activate button after checkox ist checked:
  const [activeButton, setActiveButton] = useState(false);
  // show/hide password
  const [showPassword, setShowPassword] = useState(false);
  // userData
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorsVal, setErrorsVal] = useState({});

  //NOTICE: kommt in Provider:
  const [activeUser, setActiveUser] = useState(false);

  // activate button after checkox ist checked:
  const activateButton = () => {
    setActiveButton(!activeButton);
  };

  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // track input:
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  // validate input:
  const validateFormInput = (formData) => {
    let valErrors = {};

    Object.keys(formData).forEach((key) => {
      switch (key) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData[key])) {
            valErrors[key] = "Die Email ist ungültig.";
          }
          break;
        case "username":
          const usernameRegex = /^[a-zA-Z0-9_]+$/;
          if (!usernameRegex.test(formData[key])) {
            valErrors[key] = "Nur Buchstaben und Zahlen sind erlaubt.";
          }
          break;
        case "password":
          if (formData[key].length < 12) {
            valErrors[key] = "Das Passwort muss mindestens 12 Zeichen lang sein.";
          }
          break;
        default:
          valErrors[key] = "Ungültige Eingabe!";
          break;
      }
    });
    return valErrors;
  };

  useEffect(() => {
    const validateErrors = validateFormInput(userData);
    console.log({ validateErrors });
    if (Object.keys(validateErrors).length > 0) {
      setErrorsVal(validateErrors);
    }
  }, [userData]);

  // submit Input - register POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerDataToSend = new FormData();
    registerDataToSend.append("email", registerDataToSend.email);
    registerDataToSend.append("username", registerDataToSend.username);
    registerDataToSend.append("password", registerDataToSend.password);
    console.log("userdata", registerDataToSend);

    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathOne;
      const response = await fetch(`${baseURL}${pathURL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

       body: JSON.stringify({ registerDataToSend }),
        // credentials: "include", // ist das hier nötig?

      });
      console.log("response: ", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "registration failed");
      }
      const data = await response.json();

      setActiveUser(true);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // NOTICE: test hat Fehlermeldung wegen Verbindungsproblemen ausgegeben => vllt weil MongoDB nicht gestartet?

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Registrieren</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  required
                />
                {errorsVal.email && (
                  <UserFeedbackText
                    content={errorsVal.email}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  onChange={handleChange}
                  required
                />
                {errorsVal.username && (
                  <UserFeedbackText
                    content={errorsVal.username}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  placeholder="Passwort"
                  type={showPassword ? "text" : "password"}

                  name="password"

                  onChange={handleChange}
                  required
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

                {errorsVal.password && (
                  <UserFeedbackText
                    content={errorsVal.password}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
              </div>
              <CheckboxTherms ontoggle={activateButton} />
            </CardContent>
            <CardFooter>
              {/* {activeButton && <Button>Registrieren</Button>} */}
              <Button disabled={!activeButton} type="submit">
                Registrieren
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
