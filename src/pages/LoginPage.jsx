import { LoginTabs } from "@/components/usedDemoComponents/LoginTabs";

const LoginPage = () => {
  // TODO: Logik implementieren
  // NOTICE: vielleicht checkbox und RegsiterTab/LoginTabs dynamisch machen? <= sinnvoll?
  return (
    <main className="flex flex-col items-center w-full h-screen pt-[109px]">
      <LoginTabs />
    </main>
  );
};

export default LoginPage;
