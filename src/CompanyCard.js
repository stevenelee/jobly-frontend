import React from "react";
import "./CompanyCard.css";
import { Link } from "react-router-dom";

/** Component to render information about company
 *
 * Props:
 * - company: { handle, name, description, logoUrl }
 *
 * CompanyList  -> CompanyCard
 *
 */

function CompanyCard({ company }) {
  return (
    <div className="company-card-container">
      <Link to={`/companies/${company.handle}`} className="company-link">
        {" "}
        {/* Move the Link here */}
        <div className="company-card">
          <h3>{company.name}</h3>
          <p>{company.description}</p>
          {company.logoUrl && <img src={company.logoUrl} alt={company.name} />}
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;
