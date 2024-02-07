import { Dispatch, SetStateAction } from "react";
import useTheme from "../hooks/useTheme";
import events from "../utils/const";

interface FilterCategoriesProps {
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

export default function FilterCategories({
  setSelectedCategory,
}: FilterCategoriesProps) {
  const categories = events.map((event) => event.category);
  const uniqueCategories = [...new Set(categories)];

  const { changeTheme } = useTheme();

  return (
    <div className="filter">
      <div className="filter__select">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {uniqueCategories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="theme-toggler">
        <input
          type="checkbox"
          id="theme-toggler__checkbox"
          className="theme-toggler__checkbox"
        />
        <label
          htmlFor="theme-toggler__checkbox"
          className="theme-toggler__label"
          onClick={changeTheme}
        >
          Toggle
        </label>
      </div>
    </div>
  );
}
