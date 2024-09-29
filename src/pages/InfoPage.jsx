import PageTitle from "../components/typo/PageTitle";

const InfoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 ">
      <main className="flex flex-col items-center w-[430px] h-screen pt-[109px] bg-background">
        <div className="max-w-[350px] max-h-[690px] overflow-auto">
          <PageTitle pagetitle="Über diese App" />
          <section className="mt-10">
            {/* <h2 className="font-semibold pb-2">Überblick</h2> */}
            <p className="text-sm">
              Mit dieser App kannst du deine Gefühle festhalten und
              nachvollziehen, in welchen Situationen sie auftreten. Erfasse,
              wann, wo und mit wem du dich wie gefühlt hast. Je nachdem, worauf
              du den Schwerpunkt setzen möchtest, kannst du auch weitere Angaben
              einfließen lassen, zum Beispiel zu deinem Schlafpensum,
              körperlicher Aktivität oder dem Wetter.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-semibold pb-2">Wozu?</h2>
            <p className="text-sm">
              Anhand von Auswertungen zu deinen Gefühlen in verschiedenen
              Kontexten kannst du Muster und Zusammenhänge erkennen, die dir
              helfen, deine Emotionen besser zu verstehen und bewusster damit
              umzugehen. Zusätzlich kannst du deine Einträge mit persönlichen
              Notizen versehen und sie dir später im Überblick in deinem Journal
              ansehen.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-semibold pb-2">
              Wonach sind die Gefühle sortiert?
            </h2>
            <p className="text-sm">
              Für die Einteilung der Gefühle in Überkategorien nutzen wir das
              Circumplex-Modell der Emotionen von Russel (1980) mit leichten
              Modifikationen und einer Erweiterung um die Kategorie gemischte
              Gefühle.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-semibold pb-2">Wichtiger Hinweis</h2>
            <p className="text-sm">
              Diese App dient dem besseren Verständnis deiner Gefühlswelt und
              ersetzt keine professionelle Beratung. Bei psychischen Problemen
              wende dich bitte an eine Expertin.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default InfoPage;
