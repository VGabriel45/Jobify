import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const JobImage = styled.img`
  width: 85%;
  margin: 5px;
`;

const JobContainer = styled.div`
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 10px;
  background-color: aliceblue;
`;

const JobPageByCompany = (props) => {
  const [job, setJob] = useState({});

  const {
    match: { params },
  } = props;

  const jobId = params.jobId;
  const companyId = params.companyId;

  async function getData() {
    await axios
      .get(`http://localhost:8080/api/v1/companies/${companyId}/jobs/${jobId}`)
      .then((res) => setJob(res.data));
  }

  function deleteJob() {
    axios.delete(`http://localhost:8080/api/v1/jobs/${jobId}`);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <JobContainer className="container">
        <h1 key={job.id} style={{ marginTop: "2%" }}>
          {job.name}
        </h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <div
              className="row"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              <div className="col" style={{ marginTop: "5%" }}>
                <strong>Type: </strong>
                <h6 style={{ color: "green", display: "inline" }}>
                  {job.type}
                </h6>
              </div>
              <div className="col" style={{ marginTop: "5%" }}>
                <h6>
                  <strong>Location:</strong> {job.location}
                </h6>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
          </div>
          <div
            style={{ textAlign: "center", marginTop: "6%" }}
            className="col-4"
          >
            <h3>{job.companyName}</h3>
            <JobImage src={job.companyLogo} alt="" />
            <br />
            <div style={{ marginTop: "5%" }}>
              <button onClick={deleteJob}>
                <a href="/companies">Delete</a>
              </button>
              <div>
                <a href={job.applyLink}>How to apply</a>
              </div>
            </div>
          </div>
        </div>
      </JobContainer>
    </div>
  );
};

export default JobPageByCompany;
