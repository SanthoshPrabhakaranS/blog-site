import React, { useEffect, useState } from "react";
import { useGetCategory } from "../../services/api/fetcher";
import { useLocation } from "react-router-dom";
import Blogs from "../../components/blogs";

const CategoryPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const category = location.pathname
    .toString()
    .substring(location.pathname.lastIndexOf("/") + 1);
  const { data, isLoading, error, mutate } = useGetCategory(category);

  useEffect(() => {
    mutate();
    if (data?.message == "No blogs in this category")
      return setMessage(data.message);
  }, []);

  return (
    <div className="w-full h-full max-h-[calc(100vh_-_100px)] mt-3 overflow-y-scroll">
      <Blogs data={data} isLoading={isLoading} message={message} />
    </div>
  );
};

export default CategoryPage;
