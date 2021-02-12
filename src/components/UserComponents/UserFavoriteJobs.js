import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function UserFavoriteJobs(props) {
  const [favorites, setfavorites] = useState([]);
  const {
    match: { params },
  } = props;
  const userId = params.userId;

  async function getCompanies() {
    await axios
      .get(`http://localhost:8080/api/v1/users/${userId}/favoriteJobs`)
      .then((res) => setfavorites(res.data));
  }

  // function deleteJob() {
  //   axios.delete(
  //     `http://localhost:8080/api/v1/jobs/${jobId}/addFavoriteJob/user/${currentUser.id}`,
  //     {
  //       headers: authHeader(),
  //     }
  //   );
  //   console.log(jobId);
  // }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div>
      <h1>My favorite jobs</h1>
      <div className="cards">
        {favorites.length > 0
          ? favorites.map((f) => (
              <CardLinks key={f.id} to={"/job/" + f.id}>
                <div className="card">
                  <h4 style={{ width: "50%" }}>{f.company.name}</h4>
                  <img src={f.company.companyLogo} alt="" />
                  <strong>
                    <h5>{f.name}</h5>
                  </strong>
                  <p>Location: {f.location}</p>
                  <p>
                    Job type:{" "}
                    <strong style={{ color: "green" }}>{f.type}</strong>
                  </p>
                </div>
              </CardLinks>
            ))
          : "Empty"}
      </div>
    </div>
  );
}
