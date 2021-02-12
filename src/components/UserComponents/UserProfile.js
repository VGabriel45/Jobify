import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../services/auth-service";
import authHeader from "../../services/auth-header";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

export default function UserProfile(props) {
  const { userId } = useParams();
  console.log(userId);
  const [user, setuser] = useState({});
  const [userSkills, setuserSkills] = useState([]);

  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  const deleteUser = () => {
    axios.delete(`http://localhost:8080/api/v1/users/${user.id}`, {
      headers: authHeader(),
    });
    logOut();
    props.history.push("/");
    window.location.reload();
  };

  const logOut = () => {
    AuthService.logout();
  };

  const isLookingForJob = () => {
    axios.put(`http://localhost:8080/api/v1/users/lookingForJob/${user.id}`);
    window.location.reload();
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await axios.get(
      `http://localhost:8080/api/v1/users/${userId}`
    );
    setuser(response.data);
    const userResponse = axios.get(
      `http://localhost:8080/api/v1/user/${userId}/skills`
    );
    setuserSkills((await userResponse).data);
  }

  return (
    <div class="container">
      <div class="row profile">
        <div class="col-md-3">
          <div class="profile-sidebar">
            <div class="profile-userpic">
              <img src={user.image} class="img-responsive" alt="" />
            </div>

            <div class="profile-usertitle">
              <div class="profile-usertitle-name">{user.username}</div>
              <div class="profile-usertitle-job">{user.jobRole}</div>
            </div>

            {(currentUser && currentUser.id !== userId) ||
            (currentUser.roles.includes("ROLE_USER" || "ROLE_COMPANY") &&
              currentUser.id !== userId) ? (
              <div class="profile-userbuttons">
                <button type="button" class="btn btn-success btn-sm">
                  Follow
                </button>
                <button type="button" class="btn btn-danger btn-sm">
                  Message
                </button>
                <hr />
                <h3>Skills</h3>
                <div style={{ margin: "5%" }}>
                  <div class="profile-usermenu">
                    <ul class="nav">
                      {userSkills.map((skill) => (
                        <li class="active">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "2px" }}
                          >
                            <i class="glyphicon glyphicon-home">{skill.name}</i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : !currentUser ? (
              ""
            ) : currentUser.id === user.id ? (
              <div class="profile-userbuttons">
                <a
                  href={`/user/profile/update/${user.id}`}
                  className="btn btn-success btn-sm"
                  role="button"
                >
                  Edit profile
                </a>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  onClick={deleteUser}
                >
                  Delete account
                </button>
                <button
                  type="button"
                  className={
                    user.lookingForJob
                      ? "btn btn-success mt-2"
                      : "btn btn-danger mt-2"
                  }
                  onClick={isLookingForJob}
                >
                  Looking for job{" "}
                  {user.lookingForJob ? <CheckIcon /> : <ClearIcon />}
                </button>
                <h3 className="mt-3">Skills</h3>
                <div style={{ margin: "5%" }}>
                  <div class="profile-usermenu">
                    <ul class="nav">
                      {userSkills.map((skill) => (
                        <li class="active">
                          <button
                            className="btn btn-primary"
                            style={{ margin: "2px" }}
                          >
                            <i class="glyphicon glyphicon-home">{skill.name}</i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div class="profile-userbuttons">
                <button type="button" class="btn btn-success btn-sm">
                  Follow
                </button>
                <button type="button" class="btn btn-danger btn-sm">
                  Message
                </button>
                <button type="button" class="btn btn-primary btn-sm">
                  Hire
                </button>
              </div>
            )}
          </div>
        </div>
        <div class="col-md-9">
          <div class="profile-content">
            Hello my name is <strong>{user.username}</strong> and I am a{" "}
            <strong>{user.jobRole}</strong> with{" "}
            <strong>
              {user.experience}
              {user.experience === "1" ? " year" : " years"} of experience.
            </strong>
            <hr />
            <h3>Studies</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            ultricies ultricies nibh, vitae euismod turpis molestie in. Etiam
            viverra, nisi sed iaculis accumsan, felis leo interdum mi, eu
            dignissim magna dui quis mi. Praesent vitae mi tristique ex
            elementum lacinia. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Mauris auctor, lacus ac varius mollis, enim sapien
            dignissim ex, eget venenatis nibh nunc at nisl. Maecenas elit lacus,
            sollicitudin vel euismod quis, tempus suscipit magna. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
            <hr />
            <h3>About me</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            ultricies ultricies nibh, vitae euismod turpis molestie in. Etiam
            viverra, nisi sed iaculis accumsan, felis leo interdum mi, eu
            dignissim magna dui quis mi. Praesent vitae mi tristique ex
            elementum lacinia. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Mauris auctor, lacus ac varius mollis, enim sapien
            dignissim ex, eget venenatis nibh nunc at nisl. Maecenas elit lacus,
            sollicitudin vel euismod quis, tempus suscipit magna. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </div>
    </div>
  );
}
