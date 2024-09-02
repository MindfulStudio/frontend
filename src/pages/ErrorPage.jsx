import PageTitle from "@/components/typo/PageTitle";
import HighlightText from "@/components/typo/HighlightText";
import UserFeedbackText from "@/components/typo/UserFeedbackText";

const ErrorPage = () => {
  return (
    <div>
      {/* re-usable text component: pass the title of the corresponding page as a prop*/}
      <PageTitle pagetitle="ErrorPage" />

      {/* directly styled element: */}
      <h2 className="border-b pt-2 text-lg tracking-tight">
        404 - Page not found
      </h2>

      {/* If you don´t put any font family etc. here, the default is Cantarell */}
      <p>Everything will be fine.</p>

      <p className="font-display pb-5">Just go back to Home.</p>

      <p>Heute hast du dich</p>
      <p className="font-bold">müde</p>
      <p>gefühlt</p>

      <p>Here we test some font style components:</p>

      {/* re-usable highlight text component: pass the text and the font size as props */}
      <HighlightText highlighttext="I´m a big Highlight!" fontsize="text-lg" />

      <HighlightText
        highlighttext="I´m a medium Highlight!"
        fontsize="text-md"
      />

      {/* re-usable feedback text component: pass the feedback text and the type of feedback as props */}
      <UserFeedbackText content="This is a feedback." type="error" />
      <UserFeedbackText content="This is a feedback." type="validation" />
      <UserFeedbackText content="This is a feedback." type="info" />
      <UserFeedbackText content="This is a feedback." type="tooltip" />
    </div>
  );
};

export default ErrorPage;
