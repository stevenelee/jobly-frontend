import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";


/** Component to display list of companies
 *
 * State:
 * - companiesList: {companies: [{handle, name, description,
 *                                numEmployees, logoUrl }, ...] }
 *                   isLoading: determines what get rendered based on value}
 *
 * RoutesList -> CompanyList-> SearchForm/CompanyCard
 *
 */

function CompanyList() {
  const [companiesList, setCompaniesList] = useState({
    companies: null,
    isLoading: true,
  });

  /** Make get request and update companiesList upon mount */
  useEffect(function fetchCompaniesWhenMounted() {
    async function fetchCompanies() {
      searchCompanies();
    }
    fetchCompanies();
  }, []);

  /** Perform search with argument */
  async function searchCompanies(query) {
    const response = await JoblyApi.getCompanies(query);
    setCompaniesList({
      companies: response,
      isLoading: false,
    });
  }

  if (companiesList.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <SearchForm handleSearch={searchCompanies} />
      {companiesList.companies.map((company) => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default CompanyList;
