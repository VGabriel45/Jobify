import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AuthService from "../../services/auth-service";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <BottomNavigationAction label="Previous" icon={<ArrowBackIosIcon />} />
      {currentUser ? (
        <a href={`users/${currentUser.id}/favoriteJobs`}>
          {" "}
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </a>
      ) : (
        ""
      )}

      <BottomNavigationAction label="Previous" icon={<ArrowForwardIosIcon />} />
    </div>
  );
}
