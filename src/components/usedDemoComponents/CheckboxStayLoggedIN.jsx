// "use client"

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function CheckboxStayLoggedIn({ ontoggle }) {
  // AGB aus json => TODO: json: AGB
  const agb = "Es gibt noch keine AGB.";

  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const handleStayLoggedIn = () => {
    setStayLoggedIn(!stayLoggedIn);
    ontoggle(stayLoggedIn);
  };
  // console.log(stayLoggedIn);

  return (
    <div className="flex items-center space-x-2 pb-2">
      <Checkbox
        id="terms"
        checked={stayLoggedIn}
        onClick={handleStayLoggedIn}
      />
      <p className="text-sm">eingeloggt bleiben</p>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></label>
    </div>
  );
}
