import { CardHeader } from "@/components/ui/card";
import { useMetricsContext } from "@/utils/MetricsProvider";
import { useTagContext } from "@/utils/TagProvider";
import MessageMetricsM2 from "./MessageMetricsM2";
import UserFeedbackText from "@/components/typo/UserFeedbackText";
import { useEffect, useState } from "react";

const SelectTag = () => {
  const {
    showMetricsTwo,
    selectedTag,
    setSelectTag,
    statisticsByTag,
    disableTag,
    setDisableTag,
    setMetricsTwoStatus,
    fetchStatsByTag,
    renderTagListbyCategoryMetrics,

  } = useMetricsContext();
  const { renderTagListbyCategory, tagError } = useTagContext();

  // TODO: ausgewähltes Tag in setSelectedTag speichern

  // console.log({ selectedTag });

  // TODO: wenn ein Tag ausgewählt wurde, ist auswahl aller anderen tags disabled
  // TODO: trigger StatisticTwo

  // TODO: build statisticTwo

  return (
    <div>
      {showMetricsTwo && (
        <div>
          <CardHeader>
            <MessageMetricsM2 />
          </CardHeader>

          <div className="mt-5 overflow-auto max-h-[450px] bg-background p-2">
            {/* Zeitpunkt: */}
            <p className="pb-2">Zeitpunkt:</p>
            <div className="overflow-auto max-h-60 bg-white p-2">
              <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
                {renderTagListbyCategoryMetrics("wann")}
              </ul>
              {tagError?.category === "wann" && (
                <UserFeedbackText content={tagError.message} type="error" />
              )}
            </div>

            {/* Ort: */}
            <p className="pb-2">Ort:</p>
            <div className="overflow-auto max-h-60  bg-white p-2">
              <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
                {renderTagListbyCategoryMetrics("wo")}
              </ul>
              {tagError?.category === "wo" && (
                <UserFeedbackText content={tagError.message} type="error" />
              )}
            </div>

            {/* Mit wem: */}
            <p className="pb-2">Mit wem:</p>
            <div className="overflow-auto max-h-60  bg-white p-2">
              <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
                {renderTagListbyCategoryMetrics("mitWem")}
              </ul>
              {tagError?.category === "mitWem" && (
                <UserFeedbackText content={tagError.message} type="error" />
              )}
            </div>

            {/* Kontext: */}
            <p className="pb-2">Kontext:</p>
            <div className="overflow-auto max-h-60  bg-white p-2">
              <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
                {renderTagListbyCategoryMetrics("was")}
              </ul>
              {tagError?.category === "was" && (
                <UserFeedbackText content={tagError.message} type="error" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTag;
