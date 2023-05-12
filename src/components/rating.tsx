interface RatingProps {
  selected?: number;
  onchange?: (selected: number) => void;
}

function Rating({ selected = 0, onchange = () => {} }: RatingProps) {
  return (
    <ul className="list-none flex items-center justify-around my-7">
      {[...Array(10).keys()].map((i) => {
        const label = (i + 1).toString();
        const id = `num${i + 1}`;
        const isSelected = selected === i + 1;

        return (
          <li
            key={i}
            className={`relative w-14 h-14 p-3 text-center rounded-full border-gray-300 border-2 transition duration-300 ${
              isSelected ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
          >
            <input
              type="radio"
              className="opacity-0"
              id={id}
              name="rating"
              value={i + 1}
              checked={isSelected}
              onChange={() => onchange(i + 1)}
            />
            <label
              htmlFor={id}
              className="absolute w-full h-full flex items-center justify-center rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-pink-500 hover:text-white transition duration-300"
            >
              {label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default Rating;
