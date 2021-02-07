import React from "react";
import "./ResultPage.css";
import SearchIcon from "@material-ui/icons/Search";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const [filtered, setFiltered] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [notFound, setNotFound] = React.useState("");
  const location = useLocation();

  let query = location.state.searchQuery;
  console.log(query);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const request = await fetch("http://localhost:8080/users");
const response = await request.json();

      let filteredValue = response.filter(
        (employee) => employee.first_name.toLowerCase() === query.toLowerCase()
      );
      if(filteredValue.length === 0){
        setNotFound('Not Found')
      }
      setFiltered(filteredValue);
     
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSelectOption = (e) => {
    const selectOption = e.target.value;

    if (selectOption === "last_name") {
      const sortedByLastName = filtered.sort((a, b) =>
        a.last_name > b.last_name ? 1 : -1
      );
      
      console.log(sortedByLastName);

      setFiltered([...filtered, sortedByLastName]);
    } else if (selectOption === "age") {
      const sortedByAge = filtered.sort((a, b) => (a.age > b.age ? 1 : -1));
      setFiltered([...filtered, sortedByAge]);
    } else if (selectOption === "job_title") {
      const sortedByJobTitle = filtered.sort((a, b) =>
        a.job_title > b.job_title ? 1 : -1
      );
      setFiltered([...filtered, sortedByJobTitle]);
    }
  };

  const ageHandler = (e) => {
    let enteredAge = e.target.value;
    setAge(enteredAge);
  };

  const jobTitleHandler = (e) => {
    let enteredJobTitle = e.target.value;
    setJobTitle(enteredJobTitle);
  };

  const handleFilter = () => {
  
    if (age === "" || jobTitle === "") {
      alert("Invalid search");
    }

    if (age && jobTitle) {
      const FilterByAgeAndJob = filtered.filter(
        (employee) =>
          employee.age === age &&
          employee.job_title.toLowerCase() === jobTitle.toLowerCase()
      );
     
      setFiltered(FilterByAgeAndJob);
    }
    setAge("");
    setJobTitle("");
  };

 
  return (
    <div>
      <div className="nav-bar-result">
        <div className="result-search">
          <SearchIcon style={{ marginLeft:"30px" }}/>
          <input placeholder="Search employee..." type="text" />
        </div>
      </div>

      <div className="result-container">
        <section className="filter-section">
          <div className="filter-text">
            <h1>Filters</h1>
          </div>

          <div className="filter-age">
            <h3>Age</h3>
            <input
              placeholder="Enter age"
              type="text"
              onChange={ageHandler}
              value={age}
            />
          </div>

          <div className="filter-job">
            <h3>Job Title</h3>
            <input
              placeholder="Enter job title"
              type="text"
              onChange={jobTitleHandler}
              value={jobTitle}
            />
          </div>

          <div className="apply-button">
            <button onClick={handleFilter}>Apply</button>
          </div>
        </section>

        <section className="result-section">
          <div className="sort-result">
            <div className="result-text">
              <h1>Results</h1>
            </div>

            <div className="sort-field">
              <select name="cars" id="cars" onChange={handleSelectOption}>
                <option value=""> Sort option...</option>
                <option value="age"> Sort by: age</option>
                <option value="job_title"> Sort by: Job title</option>
                <option value="last_name">Sort by: Last Name</option>
              </select>
            </div>
          </div>

          <div className="result-content">
            {filtered && filtered.map((item) => {
                  return (
                    <div key={item.id}>
                      <p className="single-user">
                        {`${item.first_name}  ${item.last_name}    Age:${item.age}   Job Title:${item.job_title}`}
                      </p>
                    </div>
                  );
                })
              }
              {notFound && <p>No match can be found !!!</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ResultPage;
