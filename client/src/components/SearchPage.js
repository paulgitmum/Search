import React from "react";
import "./SearchPage.css";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = React.useState("");
  const history = useHistory();

  const searchHandler = () => {
    history.push({
      pathname: "/results",
      state: { searchQuery: query },
    });
  };

  

  const handleQuery = (e) => {
    const query = e.target.value;
    setQuery(query);
  };


  return (
    <div>
      <div className="nav-bar"></div>
      <div className="search-container">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search employee..."
            onChange={handleQuery}
            className="main-search-input"
          />
          <IconButton onClick={searchHandler}>
            <SearchIcon style={{ color: "1px solid rgb(199, 198, 198)" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
