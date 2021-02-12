import React, { useContext, useState, useEffect } from "react";
import { JobContext } from "./JobsContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import AuthService from "../../services/auth-service";
import authHeader from "../../services/auth-header";

const JobImage = styled.img`
  width: 10%;
`;

const JobContainer = styled.div`
  text-align: left;
  padding: 1%
  border-radius: 10px;
`;

const JobDetails = (props) => {
  const { jobs } = useContext(JobContext);
  const [loadedJobs] = jobs;

  const [currentUser, setcurrentUser] = useState();
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setcurrentUser(user);
    currentUser
      ? axios
          .get(`http://localhost:8080/api/v1/users/${currentUser.id}`)
          .then((res) => setuserDetails(res.data))
      : console.log("Not logged in");
  }, []);

  const {
    match: { params },
  } = props;
  const jobId = params.JobID;

  function addToFavorites() {
    axios.post(
      `http://localhost:8080/api/v1/jobs/${jobId}/addFavoriteJob/user/${currentUser.id}`
    );
    props.history.push(`/users/${currentUser.id}/favoriteJobs`);
    window.location.reload();
  }

  function deleteJob() {
    axios.delete(`http://localhost:8080/api/v1/jobs/${jobId}`, {
      headers: authHeader(),
    });
    props.history.push(`/`);
    window.location.reload();
  }

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      {loadedJobs
        .filter((job) => job.id === params.JobID)
        .map((job) => (
          <JobContainer>
            <div class="row profile">
              <div class="col-md-3">
                <div class="profile-sidebar">
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={job.company.companyLogo}
                      class="img-responsive"
                      style={{ width: "50%" }}
                      alt=""
                    />
                  </div>
                  <div class="profile-usertitle">
                    <div class="profile-usertitle-name">
                      <h3>
                        <strong>{job.name}</strong>
                      </h3>
                    </div>
                    {/* <div class="profile-usertitle-job">{company.jobRole}</div> */}
                  </div>
                  <div class="profile-userbuttons">
                    {currentUser &&
                    currentUser.roles.includes("ROLE_COMPANY") &&
                    job.company.id === currentUser.id ? (
                      <div>
                        <button className="btn btn-danger" onClick={deleteJob}>
                          Delete job
                        </button>
                        <br />
                        <br />

                        <a
                          href={`/updateJobDetails/${job.id}`}
                          className="btn btn-success"
                          role="button"
                        >
                          Edit Job Details
                        </a>
                        <br />
                      </div>
                    ) : !currentUser ? (
                      ""
                    ) : currentUser &&
                      currentUser.roles.includes("ROLE_USER") ? (
                      <div className="mt-5">
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-success"
                        >
                          Apply
                        </a>
                        <button
                          onClick={addToFavorites}
                          className="btn btn-primary"
                        >
                          Add to favorites
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mt-5">
                      Job posted by <h3>{job.company.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="profile-content" style={{ height: "100%" }}>
                  <small>Published on {job.publishedDate}</small>
                  <div>
                    <div>
                      <div style={{ marginTop: "2%" }}>
                        <strong>Type: </strong>
                        <h6 style={{ color: "green", display: "inline" }}>
                          {job.type}
                        </h6>
                      </div>
                      <div style={{ marginTop: "2%" }}>
                        <h6>
                          <strong>Location:</strong> {job.location}
                        </h6>
                      </div>
                    </div>
                    <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      ></div>
                      <hr />
                      <div className="mt-3">
                        <h3>Requirements</h3>
                        <p>
                          Cras elementum nec felis in volutpat. Nam ipsum purus,
                          euismod ac tincidunt nec, imperdiet in nunc. Sed ac
                          aliquet mi. Aliquam varius pretium elit, non iaculis
                          augue porta et. Donec nibh nunc, rutrum quis mauris
                          id, semper rutrum justo. Sed eu eros sit amet mauris
                          finibus interdum. Nulla pharetra nisi in bibendum
                          interdum. Etiam sed suscipit nisi. Integer fringilla
                          semper justo, eget sollicitudin eros cursus nec.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </JobContainer>
        ))}
    </div>
  );
};

export default JobDetails;
