import CheckInFeelingDisplay from "@/components/ownComponents/recordPage/CheckInFeelingDisplay";

//++ import EmotionsProvider
import { useEmotionsContext } from "@/utils/EmotionsProvider";

const RecordPage = () => {
  const { feelingsFamilies } = useEmotionsContext();

  return (
    <main className="pt-[109px] px-[50px] flex flex-col items-center">
      <div>{feelingsFamilies.length > 0 && <CheckInFeelingDisplay />}</div>

      {/* TODO: Add other Display Components of the Recordprocess based on the check in progress (conditionally rendered) */}
    </main>
  );
};

export default RecordPage;
