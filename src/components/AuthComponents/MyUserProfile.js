import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth-service";

export default function MyUserProfile(props) {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    currentUser
      ? axios
          .get(`http://localhost:8080/api/v1/users/${currentUser.id}`)
          .then((res) => setuserDetails(res.data))
      : console.log("Not logged in");
  }, []);

  return (
    <div className="container">
      {currentUser ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.token}
            {currentUser.token}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      ) : (
        (props.history.push("/login"), window.location.reload())
      )}
    </div>
  );
}
