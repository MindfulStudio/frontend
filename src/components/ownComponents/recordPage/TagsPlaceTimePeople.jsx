import { useTagContext } from "@/utils/TagProvider";
import { useEmotionsContext } from "@/utils/EmotionsProvider";
import InputAndButtonForCustomTag from "./InputAndButtonForCustomTag";
import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { Card } from "@/components/ui/card";

const TagsPlaceTimePeople = () => {
  // States from Providers:
  const { selectedFeeling } = useEmotionsContext();
  const { renderTagListbyCategory, tagError } = useTagContext();

  return (
    <div className="flex flex-col items-center">
      {/* <h2> {selectedFamily}</h2> for debugging*/}
      <section
        className="mt-16 flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        <h2>
          Wann hast du dich{" "}
          <span className="font-bold">{selectedFeeling?.name}</span> gefühlt?
        </h2>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[141px] overflow-y-scroll">
          <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
            {renderTagListbyCategory("wann")}
          </ul>
          <InputAndButtonForCustomTag category={"wann"} />
          {tagError?.category === "wann" && (
            <UserFeedbackText content={tagError.message} type="error" />
          )}
        </Card>

        <p>
          Wo hast du dich
          <span className="font-bold"> {selectedFeeling?.name}</span> gefühlt?
        </p>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[141px] overflow-y-scroll">
          <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
            {renderTagListbyCategory("wo")}
          </ul>
          <InputAndButtonForCustomTag category={"wo"} />
          {tagError?.category === "wo" && (
            <UserFeedbackText content={tagError.message} type="error" />
          )}
        </Card>

        <p>
          Mit wem hast du dich
          <span className="font-bold"> {selectedFeeling?.name} </span>
          gefühlt?
        </p>
        <Card className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[141px] overflow-y-scroll">
          <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
            {renderTagListbyCategory("mitWem")}
          </ul>
          <InputAndButtonForCustomTag category={"mitWem"} />
          {tagError?.category === "mitWem" && (
            <UserFeedbackText content={tagError.message} type="error" />
          )}
        </Card>
      </section>
    </div>
  );
};

export default TagsPlaceTimePeople;
