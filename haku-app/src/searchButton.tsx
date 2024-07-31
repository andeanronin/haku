import searchStyles from "./searchButton.module.css"; // Changed import to use CSS modules
import { useState } from "react";

function SearchButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  const handleInputBlur = () => {
    setIsExpanded(false);
  };

  return (
    <div className={searchStyles.searchBox}>
      <button
        className={`${searchStyles.btnSearch} ${
          // expanded class applies conditionally, hiding the search button and icon when user clicks it
          isExpanded ? searchStyles.expanded : ""
        }`}
        onClick={handleSearchClick}
      >
        <span className={searchStyles.searchIcon}></span>{" "}
      </button>
      <input
        type="text"
        // expanded class applies conditionally on the input search element
        className={`${searchStyles.inputSearch} ${
          isExpanded ? searchStyles.expanded : ""
        }`}
        placeholder="busca fondos..."
        onBlur={handleInputBlur}
      />
    </div>
  );
}

export default SearchButton;
