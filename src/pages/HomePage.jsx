import { useEmotionsContext } from "../utils/EmotionsProvider";

const HomePage = () => {
  const { test } = useEmotionsContext();

  return <div>HomePage</div>;
};

export default HomePage;
