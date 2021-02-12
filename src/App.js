import "./App.css";
import Home from "./components/Home";
import { JobProvider } from "./components/JobComponents/JobsContext";
import UserProfile from "./components/UserComponents/UserProfile";
import Navbar from "./components/NavigationComponents/Navbar";
import JobDetails from "./components/JobComponents/JobDetails";
import News from "./components/NewsComponents/NewsPage";
import Companies from "./components/CompanyComponents/Companies";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompanyDetails from "./components/CompanyComponents/CompanyDetails";
import AddCompanyForm from "./components/CompanyComponents/AddCompanyForm";
import AddJobForm from "./components/JobComponents/AddJobForm";
import JobPageByCompany from "./components/JobComponents/JobPageByCompany";
import UserFavoriteJobs from "./components/UserComponents/UserFavoriteJobs";
import Footer from "./components/NavigationComponents/Footer";
import FilteredJobs from "./components/JobComponents/FilteredJobs";
import UsersLookingForJobPage from "./components/UserComponents/UsersLookingForJobPage";
import Login from "./components/AuthComponents/Login";
import RegisterCompany from "./components/AuthComponents/RegisterCompany";
import RegisterUser from "./components/AuthComponents/RegisterUser";
import UpdateCompanyDetails from "./components/CompanyComponents/UpdateCompanyDetails";
import AuthService from "./services/auth-service";
import UserProfileUpdate from "./components/UserComponents/UserProfileUpdate";
import UpdateJobDetails from "./components/JobComponents/UpdateJobDetails";

import React, { Component, useState } from "react";

export default function App() {
  const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div className="App">
      <Router>
        <Navbar />
        <JobProvider>
          <Switch>
            <Route path="/job/:JobID" component={JobDetails} />
            <Route
              path="/jobs/name/:name/location/:location"
              component={FilteredJobs}
            />
            <Route
              path="/users/:userId/favoriteJobs"
              exact
              component={UserFavoriteJobs}
            />
            <Route
              path="/users/lookingForJob"
              exact
              component={UsersLookingForJobPage}
            />
            <Route
              path="/company/:CompanyId"
              exact
              component={CompanyDetails}
            />
            <Route path="/myCompany/:id" exact component={CompanyDetails} />
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/news" exact component={News} />
            <Route path="/companies" exact component={Companies} />
            <Route
              path="/companies/addCompany"
              exactcomponent={AddCompanyForm}
            />
            <Route
              path="/companies/update/:companyId"
              exact
              component={UpdateCompanyDetails}
            />
            <Route
              path="/updateJobDetails/:jobId"
              exact
              component={UpdateJobDetails}
            />
            <Route
              path="/companies/:companyId/jobs"
              exact
              component={AddJobForm}
            />
            <Route
              path="/companies/:companyId/jobs/:jobId"
              exact
              component={JobPageByCompany}
            />

            <Route exact path="/login" component={Login} />
            <Route exact path="/user/register" component={RegisterUser} />
            <Route exact path="/register/company" component={RegisterCompany} />
            <Route
              exact
              path="/user/myProfile/:userId"
              component={UserProfile}
            />
            <Route exact path="/user/profile/:userId" component={UserProfile} />
            <Route
              exact
              path="/user/profile/update/:userId"
              component={UserProfileUpdate}
            />
            <Route
              exact
              path="/updateJobDetails/:jobId"
              component={UpdateJobDetails}
            />
          </Switch>
        </JobProvider>
        <Footer />
      </Router>
    </div>
  );
}
