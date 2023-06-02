import React, { useState } from "react";
import './SearchForm.css'; // import the css file


/** Form for searching/filtering companies/jobs
 *
 * Props:
 * - handleSearch: function to call in parent to handleSubmit
 *
 * State:
 * - searchTerm: term used to filter upon submit
 *
 * CompanyList/JobList -> SearchForm
 *
 */

function SearchForm( { handleSearch }) {
  const [searchTerm, setSearchTerm] = useState();

  /** Perform search with query */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm || undefined);
    setSearchTerm("");
  }

  /** Call parent function onChange */
  function handleChange(evt) {
    setSearchTerm(evt.target.value)
  };

  /** Render the form */
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        id="search"
        name="search"
        value={searchTerm}
        placeholder="Enter search term..."
        onChange={handleChange}
      />
      <button>Search</button>
    </form>
  );
}

export default SearchForm;

