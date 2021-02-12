import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = (props) => {
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [loadedCompanies, setLoadedCompanies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/api/v1/jobs`).then((res) => {
      setIsLoading(false);
      setLoadedJobs(res.data);
    });
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs: [loadedJobs, setLoadedJobs],
        companies: [loadedCompanies, setLoadedCompanies],
        page: [pageNumber, setPageNumber],
        loading: [isLoading, setIsLoading],
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};
