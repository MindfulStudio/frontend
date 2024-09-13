import { InputAndButtonForCustomTag } from "@/components/ownComponents/recordPage/InputAndButtonForCustomTag.jsx";
import { useEmotionsContext } from "@/utils/EmotionsProvider";
import { useTagContext } from "@/utils/TagProvider";

const TagsContext = () => {
  // States from Providers:
  const { selectedFeeling } = useEmotionsContext();
  const { renderTagListbyCategory } = useTagContext();

  return (
    <div className="flex flex-col items-center">
      <section className="mt-16 flex flex-col items-center">
        <h2>
          Womit könnte dein Gefühl{" "}
          <span className="font-bold">{selectedFeeling?.name}</span> in
          Verbindung stehen?
        </h2>
        <div
          className="w-[290px] bg-white p-[22px] text-center mt-16 h-[423px] overflow-y-scroll"
          /*           style={{ zIndex: 10 }}
           */
        >
          {renderTagListbyCategory("was")}

          {/* Add custom tags */}
          <InputAndButtonForCustomTag category={"was"} />
        </div>
      </section>
    </div>
  );
};

export default TagsContext;
