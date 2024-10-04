import { RegisterTabs } from "@/components/usedDemoComponents/RegisterTabs";

const RegisterPage = () => {
  // TODO: style anpassen
  // NOTICE: vielleicht checkbox und RegsiterTab/LoginTabs dynamisch machen? <= sinnvoll?
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 ">
      <main className="flex flex-col items-center w-[430px] h-screen pt-[109px] bg-background">
        <RegisterTabs />
      </main>
    </div>
  );
};

export default RegisterPage;
