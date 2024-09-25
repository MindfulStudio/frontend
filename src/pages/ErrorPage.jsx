import PageTitle from "@/components/typo/PageTitle";
import HighlightText from "@/components/typo/HighlightText";
import UserFeedbackText from "@/components/typo/UserFeedbackText";
import AnimatedFeelings from "@/components/ownComponents/errorPage/AnimatedFeelings.jsx";

const ErrorPage = () => {
  return (
    <div>
      <PageTitle pagetitle="ErrorPage" />
      <h2 className="border-b pt-2 text-lg tracking-tight">
        404 - Page not found
      </h2>
      <p>Everything will be fine.</p>
      <p className="font-highlight pb-5">Just go back to Home.</p>
      <p className="font-bold">müde</p>

      <AnimatedFeelings />

      <HighlightText highlighttext="I´m a big Highlight!" fontsize="text-lg" />
      <HighlightText
        highlighttext="I´m a medium Highlight!"
        fontsize="text-md"
      />
    </div>
  );
};

export default ErrorPage;
