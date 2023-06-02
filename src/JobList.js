import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";


/** Component to display list of jobs
 *
 * State:
 * - jobsList: {jobs: [{id, title, salary, equity,
 *                      companyHandle, companyName }, ...}]}
 *                   isLoading: determines what get rendered based on value}
 *
 * RoutesList -> JobList-> SearchForm/JobCard
 *
 */

function JobList() {
  const [jobsList, setJobsList] = useState({
    jobs: null,
    isLoading: true,
  });

  /** Make get request and update jobsList upon mount */
  useEffect(function fetchJobsWhenMounted() {
    async function fetchJobs() {
      searchJobs();
    };
    fetchJobs();
  }, []);

  /** Perform search with argument */
  async function searchJobs(query) {
    const response = await JoblyApi.getJobs(query);
    setJobsList({
      jobs: response,
      isLoading: false,
    });
  };

  if (jobsList.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <SearchForm handleSearch={searchJobs}/>
      {jobsList.jobs.map(job =>
        <JobCard key={job.id}
                 title={job.title}
                 companyName={job.companyName}
                 salary={job.salary}
                 equity={job.equity} />
        )
      }
    </div>
  );
}

export default JobList;