import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import './CompanyCard.css';

/** Component to display details about jobs for specific company
 *
 * State:
 * - compDetails: { company: { handle, name, description, numEmployees, logoUrl,
 *                  jobs: [{id, title, salary, equity}]}
 *                  isLoading: determines what get rendered based on value}
 *
 * RoutesList/CompanyList -> CompanyDetails -> JobCard
 *
 */

function CompanyDetail() {
  const [compDetails, setCompDetails] = useState({
    company: null,
    isLoading: true,
  });

  const {handle} = useParams();

  useEffect(function fetchCompDetailsWhenMounted() {
    async function fetchCompDetail() {
      const response = await JoblyApi.getCompany(handle);
      setCompDetails({
        company: response,
        isLoading: false,
      });
    };
    fetchCompDetail();
  }, []);

  if (compDetails.isLoading) return <i>Loading...</i>;

  return (
    <div className="company-card-container">
      <div >
        <h2>{compDetails.company.name}</h2>
        <p>{compDetails.company.description}</p>

        <div>
          {compDetails.company.jobs.map(job =>
            <JobCard key={job.id}
                      title={job.title}
                      salary={job.salary}
                      equity={job.equity} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
