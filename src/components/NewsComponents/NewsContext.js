import React, { createContext, useState, useEffect } from "react";

export const NewsContext = createContext();

export const NewsProvider = (props) => {
  const [loadedNews, setLoadedNews] = useState([]);

  useEffect(() => {
    fetch(
      "http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-18&sortBy=publishedAt&apiKey=f46893f70f12415eb802523a642a40a5"
    )
      .then((res) => res.json())
      .then((data) => setLoadedNews(data.articles));
  });

  return (
    <NewsContext.Provider value={[loadedNews, setLoadedNews]}>
      {props.children}
    </NewsContext.Provider>
  );
};
