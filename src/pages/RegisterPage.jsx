import { RegisterTabs } from "@/components/usedDemoComponents/RegisterTabs";

const RegisterPage = () => {
  // TODO: Logik implementieren
  // TODO: style anpassen
  // NOTICE: vielleicht checkbox und RegsiterTab/LoginTabs dynamisch machen? <= sinnvoll?
  return (
    <main className="flex flex-col items-center w-full h-screen pt-[109px]">
      <RegisterTabs />
    </main>
  );
};

export default RegisterPage;
