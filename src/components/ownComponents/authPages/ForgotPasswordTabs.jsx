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

import { Link } from "react-router-dom";
import { forgotPassword } from "../../../utils/services/forgotPassword";
import UserFeedbackText from "../../typo/UserFeedbackText";

const ForgotPasswordTabs = () => {
  // Local States
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  //   SIDE EFFECTS:

  // clear info/error messages (at input change)
  useEffect(() => {
    setError(null);
    setInfo(null);
  }, [email]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email, setError, setInfo);
    setEmail("");
  };

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <form onSubmit={handleEmailSubmit}>
            <CardHeader>
              <CardTitle>Passwort zurücksetzen</CardTitle>
              <CardDescription>
                Gib deine Email ein und wir senden dir einen Link zum
                Zurücksenden deines Passworts per Mail.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />

                <div className="text-sm text-gray-500">
                  Du kennst dein Passwort?{" "}
                  <Link to="/anmeldung" className="font-medium underline">
                    Login
                  </Link>
                </div>
                {error && (
                  <UserFeedbackText content={error.message} type="error" />
                )}
                {info && (
                  <UserFeedbackText content={info.message} type="info" />
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <Button type="submit" disabled={!email}>
                Zurücksetzen
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ForgotPasswordTabs;
