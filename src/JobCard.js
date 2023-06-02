import React from "react";
import './JobCard.css'


/** Component to render information about job
 *
 * Props:
 * - title: title of job
 * - companyName: name of company offering job
 * - salary: salary for job, only display if salary value exists
 * - equity: equity for job
 *
 * JobList/CompanyDetail -> JobCard
 *
 */


function JobCard({ title, salary, equity, companyName }) {
  return (
    <div className="job-card-container">
      <div className="job-card">
        <h3>{title}</h3>
        <h5>{companyName}</h5>
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
      </div>
    </div>
  );
}

export default JobCard;

