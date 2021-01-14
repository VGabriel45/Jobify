import React, { useState } from "react";
import axios from "axios";

export default function AddJobForm(props) {
  const [job, setJob] = useState({});
  const {
    match: { params },
  } = props;
  const companyId = params.companyId;

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    setJob({
      name: data.get("name"),
      desc: data.get("desc"),
      applyLink: data.get("applyLink"),
      type: data.get("type"),
      location: data.get("location"),
    });

    axios.post(`http://localhost:8080/api/v1/companies/${companyId}/jobs`, {
      name: data.get("name"),
      description: data.get("desc"),
      applyLink: data.get("applyLink"),
      type: data.get("type"),
      location: data.get("location"),
    });
  }

  return (
    <div>
      <form
        className="form-signin"
        method="post"
        action="/login"
        onSubmit={submitForm}
      >
        <h2 className="form-signin-heading">Add job</h2>
        <p>
          
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Job name"
            required=""
            autoFocus=""
          />
        </p>
        <p>
          
          <textarea
            type="text"
            id="desc"
            name="desc"
            className="form-control"
            placeholder="Description"
            required=""
            autoFocus=""
          />
        </p>
        <p>
          <input
            type="text"
            id="applyLink"
            name="applyLink"
            className="form-control"
            placeholder="Link to apply"
            required=""
          />
        </p>
        <p>
          {/* <input
            type="text"
            id="type"
            name="type"
            className="form-control"
            placeholder="Fulltime/Parttime"
            required=""
          /> */}
          <select class="form-select" name="type">
            <option selected value="Fulltime">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
            <option value="Project Based">Project Based</option>
          </select>
        </p>
        <p>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            placeholder="Location"
            required=""
          />
        </p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Add job
        </button>
      </form>
    </div>
  );
}
