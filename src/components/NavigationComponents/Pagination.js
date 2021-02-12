import React, { useContext } from "react";
import { JobContext } from "./JobsContext";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Pagination() {
  const classes = useStyles();
  const { page } = useContext(JobContext);
  const [pageNumber, setPageNumber] = page;

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <div>
      <BottomNavigationAction
        label="Previous"
        icon={<ArrowBackIosIcon />}
        disabled={pageNumber <= 1}
        onClick={prevPage}
      />
      <a href={`users/e205173d-44b9-42ba-a7dc-f9f88b782768/favoriteJobs`}>
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      </a>
      <BottomNavigationAction
        label="Previous"
        icon={<ArrowForwardIosIcon />}
        disabled={pageNumber >= 4}
        onClick={nextPage}
      />
    </div>
  );
}

export default Pagination;
