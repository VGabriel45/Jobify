import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import authHeader from "../../services/auth-header";

export default function UpdateJobDetails() {
  const history = useHistory();
  const { jobId } = useParams();

  const [job, setJob] = useState({
    name: "",
    description: "",
    applyLink: "",
    type: "",
    location: "",
  });

  const onChangeHandler = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/jobs/${jobId}`).then((res) => {
      setJob({
        name: res.data.name,
        description: res.data.description,
        applyLink: res.data.applyLink,
        type: res.data.type,
        location: res.data.location,
      });
    });
  }, [jobId]);

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/v1/jobs/${jobId}`, job, {
        headers: authHeader(),
      })
      .then((response) => {
        history.push(`/job/${jobId}`);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card
      style={{ marginTop: "3rem", marginLeft: "18rem", marginRight: "18rem" }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          Update Job Details
        </Card.Title>
        <form className="form-signin">
          <p>
            <input
              className="form-control"
              placeholder="Job Name"
              name="name"
              value={job.name}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <textarea
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={job.description}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Link to apply"
              name="applyLink"
              value={job.applyLink}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <select
              className="form-control"
              name="type"
              onChange={onChangeHandler}
            >
              <option selected value={job.type}>
                {job.type}
              </option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Project Based">Project Based</option>
            </select>
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Job Location"
              name="location"
              value={job.location}
              onChange={onChangeHandler}
              required
            />
          </p>
          <button className="btn btn-success" onClick={updateHandler}>
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => history.push(`/job/${jobId}`)}
          >
            Cancel
          </button>
        </form>
      </Card.Body>
    </Card>
  );
}
