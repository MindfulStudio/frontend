import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CheckboxTherms } from "./CheckboxTherms";
import EyeOpenIcon from "/src/assets/icons/eye-svgrepo-com.svg";
import EyeClosedIcon from "/src/assets/icons/eye-close-svgrepo-com.svg";
import { useEffect, useState, useRef } from "react";
import UserFeedbackText from "../typo/UserFeedbackText";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function RegisterTabs() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorsVal, setErrorsVal] = useState({});
  const [activeButton, setActiveButton] = useState(false);
  const [warning, setWarning] = useState(null);
  const [AGBChecked, setAGBChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(6);

  // states for validation errors coming from server
  const [emailWarning, setEmailWarning] = useState(null);
  const [usernameWarning, setUsernameWarning] = useState(null);
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [reCaptchaChecked, setReCaptchaChecked] = useState(false);

  const navigate = useNavigate();
  const reCaptchaRef = useRef();

  useEffect(() => {
    const validateErrors = validateFormInput(userData);
    setErrorsVal(Object.keys(validateErrors).length > 0 ? validateErrors : {});
    // activate button if there is no valError && the checkbox is checked
    setActiveButton(
      Object.entries(validateErrors).length === 0 && AGBChecked ? true : false
    );
  }, [userData, AGBChecked]);

  // countdown
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

  // ############### FUNCTIONS ###############

  // show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // track input:
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    // clear server error onChange
    e.target.id === "email"
      ? setEmailWarning(null)
      : e.target.id === "username"
      ? setUsernameWarning(null)
      : e.target.id === "password"
      ? setPasswordWarning(null)
      : null;
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
          const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
          if (!usernameRegex.test(formData[key])) {
            valErrors[key] =
              "Der Benutzername darf nur Buchstaben und Zahlen enthalten und muss zwischen 3 und 12 Zeichen lang sein.";
          }
          break;
        case "password":
          const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.#$!%*?&^_])[A-Za-z\d@.#$!%*?&^_]{8,}$/;

          if (!passwordRegex.test(formData[key])) {
            valErrors[key] =
              "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl sowie ein Sonderzeichen (@.#$!%*?&^_) enthalten.";
          }
          break;
        default:
          valErrors[key] = "Ungültige Eingabe!";
          break;
      }
    });
    return valErrors;
  };

  // submit input - register POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailWarning(null);
    setUsernameWarning(null);
    setPasswordWarning(null);
    setWarning(null);

    const reCaptchaValue = reCaptchaRef.current.getValue();

    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathOne;
      const response = await fetch(`${baseURL}${pathURL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, reCaptchaValue }),
      });
      resetReCaptcha();

      if (!response.ok) {
        const errorData = await response.json();

        // handle server-side validation errors
        if (errorData.errorType === "ValidationError") {
          errorData.errors.forEach((error) => {
            switch (error.path) {
              case "email":
                setEmailWarning(
                  "Die angegebene Email hat ein ungültiges Format."
                );
                break;
              case "username":
                setUsernameWarning(
                  "Der Username darf nur Buchstaben und Zahlen enthalten und muss zwischen 3 und 12 Zeichen lang sein."
                );
                break;
              case "password":
                setPasswordWarning(
                  "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl sowie ein Sonderzeichen (@.#$!%*?&^_) enthalten."
                );
                break;
            }
          });
          console.log(errorData);
          return;
        }

        // handle email duplication error separately, since it is not a validation error
        if (errorData.error.code === 11000) {
          setEmailWarning("Die angegebene Email ist bereits registriert.");
          console.log(errorData);
          return;
        }

        // handle other server errors
        handleServerErrors();

        throw new Error(errorData.message || "registration failed");
      }

      const data = await response.json();
      console.log(data);

      // clear input fields
      setUserData({ email: "", username: "", password: "" });
      // activate success message
      setSuccess(true);
    } catch (error) {
      // handle other server errors
      handleServerErrors();
      console.log(error);
      resetReCaptcha();
    }
  };

  // reset reCaptcha
  const resetReCaptcha = () => {
    reCaptchaRef.current.reset();
    setReCaptchaChecked(false);
  };

  // show server errors
  const handleServerErrors = () => {
    setWarning(
      "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später noch einmal."
    );
  };

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
                  value={userData.email}
                  id="email"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  required
                  disabled={success}
                />
                {errorsVal.email && userData.email && (
                  <UserFeedbackText
                    content={errorsVal.email}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
                {emailWarning && (
                  <UserFeedbackText content={emailWarning} type={"error"} />
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  value={userData.username}
                  id="username"
                  placeholder="Username"
                  type="text"
                  onChange={handleChange}
                  required
                  disabled={success}
                />
                {errorsVal.username && userData.username && (
                  <UserFeedbackText
                    content={errorsVal.username}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
                {usernameWarning && (
                  <UserFeedbackText content={usernameWarning} type={"error"} />
                )}
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  value={userData.password}
                  id="password"
                  placeholder="Passwort"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  required
                  disabled={success}
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
                {errorsVal.password && userData.password && (
                  <UserFeedbackText
                    content={errorsVal.password}
                    type={"validation"} // vllt. bei validation noch farben ändern? ist nicht gut zu erkennen
                  />
                )}
                {passwordWarning && (
                  <UserFeedbackText content={passwordWarning} type={"error"} />
                )}
              </div>
              <CheckboxTherms
                success={success}
                ontoggle={() => setAGBChecked((val) => !val)}
              />

              {/* show server error message here */}
              {warning && <UserFeedbackText content={warning} type={"info"} />}
              {/* show success message here */}
              {success && (
                <>
                  <UserFeedbackText
                    content={
                      "Vielen Dank für deine Registrierung. Dein Konto wurde erfolgreich erstellt. Um deine Registrierung abzuschließen, überprüfe bitte deine Email-Adresse."
                    }
                    type={"tooltip"}
                  />
                  <UserFeedbackText
                    content={`Du wirst in ${countdown} Sekunden zur Login-Seite weitergeleitet.`}
                    type={"info"}
                  />
                </>
              )}
              {/* reCAPTCHA */}
              {!success && (
                <ReCAPTCHA
                  ref={reCaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={() => setReCaptchaChecked((val) => !val)}
                />
              )}
            </CardContent>
            <CardFooter>
              <Button
                disabled={!activeButton || success || !reCaptchaChecked}
                type="submit"
              >
                Registrieren
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
