import PageTitle from "../components/typo/PageTitle";

const InfoPage = () => {
  return (
    <main className="flex flex-col items-center w-full h-screen pt-[109px]">
      <div className="max-w-[350px] max-h-[690px] overflow-auto">
        <PageTitle pagetitle="Über uns" />
        <section className="mt-5">
          <p>
            Mit dieser Anwendung kannst du deine Gefühle festhalten und besser
            nachvollziehen, in welchen Situationen sie auftreten. Du kannst
            erfassen, wann, wo und mit wem du dich auf eine bestimmte Weise
            gefühlt hast, und optional weitere Informationen wie Schlaf,
            körperliche Aktivität oder das Wetter hinzufügen. Zudem hast du die
            Möglichkeit, persönliche Notizen zu machen. Nach mehreren Einträgen
            erhältst du Statistiken, die dir zeigen, wie oft bestimmte Gefühle
            in verschiedenen Kontexten aufgetreten sind. Eine Tagebuchfunktion
            bietet dir eine Übersicht über deine wöchentlichen Gefühle, und du
            kannst jederzeit auf Notizen und Details zu einzelnen Gefühlen
            zugreifen. Bitte beachte: Diese App dient dem besseren Verständnis
            deiner eigenen Gefühlswelt und ersetzt keine professionelle
            Beratung. Bei psychischen Problemen wende dich bitte an einen
            Expertin.
          </p>
        </section>
      </div>
    </main>
  );
};

export default InfoPage;
