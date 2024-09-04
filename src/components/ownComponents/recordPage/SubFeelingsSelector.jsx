const SubFeelingsSelector = ({ subFeelings, onSelectFeeling }) => (
  <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md text-center max-w-md mx-auto">
    <ul className="list-none p-0">
      {/* map through all the subemotions and display them in a list: */}
      {subFeelings.map((feeling) => (
        <li
          key={feeling.id}
          onClick={() => onSelectFeeling(feeling)}
          className="cursor-pointer px-4 py-2 border border-gray-200 mb-2 rounded-md hover:bg-gray-100"
        >
          {feeling.name}
        </li>
      ))}
    </ul>
  </div>
);

export default SubFeelingsSelector;
