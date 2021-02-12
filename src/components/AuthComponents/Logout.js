import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  let { logout, isAuthenticated } = useAuth0();
  if (!localStorage.getItem("username")) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  return (
    isAuthenticated && (
      <button
        className="btn btn-light"
        onClick={() => {
          logout();
          localStorage.removeItem("username");
        }}
      >
        Logout
      </button>
    )
  );
};

export default Logout;
