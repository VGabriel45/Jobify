import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import authHeader from "../../services/auth-header";

export default function UpdateCompanyDetails() {
  const history = useHistory();
  const { companyId } = useParams();

  const [company, setCompany] = useState({
    name: "",
    email: "",
    websiteLink: "",
    companyLogo: "",
  });

  const onChangeHandler = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/companies/${companyId}`)
      .then((res) => {
        setCompany({
          name: res.data.name,
          email: res.data.email,
          websiteLink: res.data.websiteLink,
          companyLogo: res.data.companyLogo,
        });
      });
  }, [companyId]);

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/v1/companies/${companyId}`, company, {
        headers: authHeader(),
      })
      .then((response) => {
        history.push(`/company/${companyId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card
      style={{ marginTop: "3rem", marginLeft: "18rem", marginRight: "18rem" }}
    >
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>Update Company</Card.Title>
        <form className="form-signin">
          <p>
            <input
              className="form-control"
              placeholder="Company Name"
              name="name"
              value={company.name}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={company.email}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Website Link"
              name="websiteLink"
              value={company.websiteLink}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Company Logo"
              name="companyLogo"
              value={company.companyLogo}
              onChange={onChangeHandler}
              required
            />
          </p>
          <button className="btn btn-success" onClick={updateHandler}>
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => history.push(`/company/${companyId}`)}
          >
            Cancel
          </button>
        </form>
      </Card.Body>
    </Card>
  );
}
