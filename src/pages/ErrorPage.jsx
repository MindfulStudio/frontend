import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 ">
      <main className="flex flex-col items-center w-[430px] h-screen pt-[109px] bg-background">
        <h2 className=" p-2 text-lg text-center">
          Hoppla! 404 - Seite nicht gefunden
        </h2>

        <h3 className=" p-9 text-md">
          Diese Seite scheint nicht zu existieren. Vielleicht gab es einen
          Tippfehler im Link? Oder die Seite wurde verschoben oder gelöscht.
        </h3>
        <button className="mt-5 bg-primary text-white px-4 py-2 rounded">
          <NavLink to="/">Zurück zur Startseite</NavLink>
        </button>
      </main>
    </div>
  );
};

export default ErrorPage;
