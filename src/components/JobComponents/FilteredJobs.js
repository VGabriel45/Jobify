import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

const CardLinks = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    color: #00b3e2;
    text-decoration: none;
  }
`;

export default function FilteredJobs(props) {
  const {
    match: { params },
  } = props;
  const [filteredJobs, setfilteredJobs] = useState([]);
  const location = params.location.toLowerCase();
  const name = params.name.toLowerCase();

  useEffect(() => {
    location !== "undefined" && name !== "undefined"
      ? axios
          .get(
            `http://localhost:8080/api/v1/jobs/name/${name}/location/${location}`
          )
          .then((res) => setfilteredJobs(res.data))
      : location === "undefined" && name !== "undefined"
      ? axios
          .get(`http://localhost:8080/api/v1/jobs/jobName/${name}`)
          .then((res) => setfilteredJobs(res.data))
      : location !== "undefined" && name === "undefined"
      ? axios
          .get(`http://localhost:8080/api/v1/jobs/location/${location}`)
          .then((res) => setfilteredJobs(res.data))
      : axios
          .get("http://localhost:8080/api/v1/jobs")
          .then((res) => setfilteredJobs(res.data));
  }, [location]);

  const displayJobs = (array) => {
    return array.map((job) => (
      <CardLinks key={job.id} to={"/job/" + job.id}>
        <div className="card">
          <h4>{job.company.name}</h4>
          <img src={job.company.companyLogo} alt="" />
          <strong>
            <h5>{job.name}</h5>
          </strong>
          <p>Location: {job.location}</p>
          <p>
            Job type: <strong style={{ color: "green" }}>{job.type}</strong>
          </p>
        </div>
      </CardLinks>
    ));
  };

  const content =
    filteredJobs.length <= 0 ? (
      <div>
        <h1>
          No jobs found,{" "}
          <Link to="/">
            <strong>try again</strong>
          </Link>
        </h1>
      </div>
    ) : (
      <div className="cards">{displayJobs(filteredJobs)}</div>
    );

  return <div>{content}</div>;
}
