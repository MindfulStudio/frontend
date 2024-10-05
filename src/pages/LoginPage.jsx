import { LoginTabs } from "@/components/usedDemoComponents/LoginTabs";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 ">
      <main className="flex flex-col items-center w-[430px] h-screen pt-[109px] bg-background">
        <LoginTabs />
      </main>
    </div>
  );
};

export default LoginPage;
