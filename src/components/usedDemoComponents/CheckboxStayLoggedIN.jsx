// "use client"

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxStayLoggedIn({ setStayLoggedIn }) {
  // AGB aus json => TODO: json: AGB
  const agb = "Es gibt noch keine AGB.";

  return (
    <div className="flex items-center space-x-2 pb-2">
      <Checkbox id="terms" onClick={() => setStayLoggedIn((val) => !val)} />
      <p className="text-sm">eingeloggt bleiben</p>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></label>
    </div>
  );
}
