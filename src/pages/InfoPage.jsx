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
              wann, wo und mit wem du dich so gefühlt hast. Du kannst auch
              Schlaf, Sport oder Wetter einbeziehen, um ein umfassenderes Bild
              zu erhalten.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-semibold pb-2">Was ist das Ziel der App?</h2>
            <p className="text-sm">
              Anhand von Auswertungen zu deinen Gefühlen in verschiedenen
              Kontexten kannst du Muster und Zusammenhänge erkennen, die dir
              helfen, deine Emotionen besser zu verstehen und bewusster damit
              umzugehen. Dazu kannst deine Einträge auch mit persönlichen
              Notizen versehen und sie dir in deinem Journal später noch einmal
              genauer ansehen.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-semibold pb-2">
              Wonach sind die Gefühle sortiert?
            </h2>
            <p className="text-sm">
              Die Einteilung der Gefühle in Überkategorien basiert grob auf dem
              Circumplex-Modell der Emotionen von James A. Russell (1980),
              veröffentlicht in &quot;A Circumplex Model of Affect&quot;. Die
              Kategorie gemischte Gefühle ist neu. Wenn du für ein Gefühl keinen
              passenden Begriff findest, kannst du auch ein eigenes Wort dafür
              eintragen.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="font-semibold pb-2">Wichtiger Hinweis</h2>
            <p className="text-sm">
              Diese App soll dir helfen, deine Gefühle besser zu verstehen,
              ersetzt jedoch keine professionelle Beratung. Bei psychischen
              Problemen such dir bitte professionelle Unterstützung.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default InfoPage;
