import { ConfigTabs } from "@/components/usedDemoComponents/ConfigTabs";

const ConfigPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <main className=" pt-28 flex-grow flex flex-col items-center w-[430px] h-screen bg-background">
        <ConfigTabs />
      </main>
    </div>
  );
};

export default ConfigPage;
