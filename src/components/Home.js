import React from "react";
import SearchBar from "./UtilComponents/SearchBar";

function Home() {
  return (
    <React.Fragment>
      <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="img-fluid"
              src={process.env.PUBLIC_URL + "/banner.jpg"}
              alt="First slide"
            />
            <div class="carousel-caption">
              <h1 style={{ float: "left" }}>Discover New Opportunities</h1>
            </div>
          </div>
        </div>
      </div>
      <SearchBar />
    </React.Fragment>
  );
}

export default Home;
