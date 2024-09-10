import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ConfigSwitch } from "./ConfigSwitch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserFeedbackText from "../typo/UserFeedbackText";

export function ConfigTabs() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // create state for configData:
  const [configData, setConfigData] = useState({
    isConfigured: true,
    sleepingHours: true,
    physicalActivity: true,
    weather: true,
  });
  // NOTICE: Die Toggles sind falsch rum gestyled (checked/true ist ausgegraut und hat den toggle-Kreis links statt rechts). Das kann man z.B. korrigieren, indem man in components/ui/switch.jsx die Wörter unchecked und checked überall jeweils vertauscht (wollte ich nicht einfach so machen ohne es mit euch abzusprechen).

  // get user's configData from backend at mounting
  useEffect(() => {
    const getConfigData = async () => {
      // fetching configData - GET:
      try {
        const baseURL = import.meta.env.VITE_baseURL;
        const pathURL = import.meta.env.VITE_basePathTwo;
        const response = await fetch(`${baseURL}${pathURL}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        // In case of userNotFound error:
        if (!response.ok) {
          setError({
            message:
              "Ein unerwarteter Fehler ist aufgetreten. Bitte loggen Sie sich neu ein.",
          });
          return;
        } else {
          // Set configData according to backend (isConfigured must be true)
          setConfigData({
            ...data.data.config,
            isConfigured: true,
          });
        }
        return;
      } catch {
        // In case of any other server errors:
        setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
      }
    };
    getConfigData();
  }, []);

  // toggle configData on change:
  const handleChange = (id) => {
    setConfigData((prevConfig) => ({
      ...prevConfig,
      [id]: !prevConfig[id],
    }));
    setError(null);
  };

  // submit - send configData to backend:
  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetching configData - PATCH:
    try {
      const baseURL = import.meta.env.VITE_baseURL;
      const pathURL = import.meta.env.VITE_basePathTwo;
      const response = await fetch(`${baseURL}${pathURL}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ config: configData }),
        credentials: "include",
      });

      const data = await response.json();

      // In case of userNotFound error:
      if (!response.ok) {
        setError({
          message:
            "Ein unerwarteter Fehler ist aufgetreten. Bitte loggen Sie sich neu ein.",
        });
        return;
      } else {
        navigate("/dashboard");
      }
      return data;
    } catch {
      // In case of any other server errors:
      setError({ message: "Ein unerwarteter Serverfehler ist aufgetreten." });
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[350px]">
      <TabsContent value="account">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Konfiguration</CardTitle>
              <CardDescription>
                Was möchtest du noch zusätzlich erfassen?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <ConfigSwitch
                  name={"Schlaf"}
                  id={"sleepingHours"}
                  handleChange={handleChange}
                  configData={configData}
                />
              </div>
              <div className="space-y-1">
                <ConfigSwitch
                  name={"körperliche Aktivität"}
                  id={"physicalActivity"}
                  handleChange={handleChange}
                  configData={configData}
                />
              </div>
              <div className="space-y-1">
                <ConfigSwitch
                  name={"Wetter"}
                  id={"weather"}
                  handleChange={handleChange}
                  configData={configData}
                />
              </div>
              {error && (
                <UserFeedbackText content={error.message} type="error" />
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit">weiter</Button>
              {/* weiter oder bestätigen? */}
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
