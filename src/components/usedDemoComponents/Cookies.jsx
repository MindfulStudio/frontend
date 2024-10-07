"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RegisterPopover } from "./RegisterPopover";
import cookierichtlinie from "@/legal/Cookierichtlinie.jsx";
import { useAuthContext } from "../../utils/contexts/AuthProvider";

export default function Cookies() {
  const { setCookieConsent } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    setTimeout(() => {
      setHide(true);
    }, 700);
    setCookieConsent(true);
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (document.cookie.includes("cookieConsent=true")) {
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-14 flex items-center justify-between p-4">
            <h1 className="text-[28px] font-medium">Wir nutzen Cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-sm font-normal text-start">
              Wir verwenden Cookies, um dir die Anmeldung und die Nutzung
              unserer Anwendung zu erleichtern. Weitere Infos findest du hier:{" "}
              <br />
              <RegisterPopover
                title={"Cookie-Richtlinie"}
                contentPopover={cookierichtlinie}
              />
              <br />
              <span className="text-sm">
                Indem du auf "
                <span className="font-medium opacity-80">Akzeptieren</span>"
                klickst, stimmst du der Nutzung von Cookies zu.
              </span>
              <br />
            </p>
          </div>
          <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
            <Button onClick={accept} className="w-full">
              Akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
