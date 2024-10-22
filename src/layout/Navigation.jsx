// import { NavMenubar } from "@/components/usedComponents/navMenu/NavMenubar";

import { NavMenu } from "@/components/ownComponents/navMenu/NavMenu";

const Navigation = () => {
  return (
    <nav className="flex items-center border bg-background gap-[2px] border-none mt-4">
      <NavMenu />
    </nav>
  );
};

export default Navigation;
