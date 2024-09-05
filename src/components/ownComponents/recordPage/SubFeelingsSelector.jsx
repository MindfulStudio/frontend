const SubFeelingsSelector = ({ subFeelings, onSelectedFeeling }) => (
  <div className="w-[290px] bg-white p-[22px] text-center mt-5 mb-7 h-[423px] overflow-y-auto">
    <ul className="flex flex-wrap gap-3 justify-center list-none p-0">
      {/* map through all the subemotions and display them in a list: */}
      {subFeelings.map((feeling) => (
        <li
          key={feeling.id}
          onClick={() => onSelectedFeeling(feeling)}
          className="cursor-pointer rounded-sm p-2 hover:bg-selected-subemotion hover:rotate-on-hover text-md"
        >
          {feeling.name}
        </li>
      ))}
    </ul>
  </div>
);

export default SubFeelingsSelector;

/* NOTICE: hover:bg-selected-subemotion is a custom color, which is defined in tailwind-config.js */
/* NOTICE: hover:rotate-on-hover is a custom class, which is defined in tailwind-config.js! */
