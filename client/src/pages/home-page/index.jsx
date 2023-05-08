import React, { useContext, useEffect } from "react";
import Blogs from "../../components/blogs";
import { useBlogs } from "../../services/api/fetcher";

const HomePage = () => {
  const { data, error, isLoading, mutate } = useBlogs();

  if(error) return console.log(error, "err");

  return (
    <div className="w-full h-full max-h-[calc(100vh_-_100px)] mt-3 overflow-y-scroll">
      <Blogs data={data} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
