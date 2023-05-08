import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "rsuite/Loader";

const Blogs = ({ data, isLoading, message }) => {
  const _TimeStamp = (value) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className="grid grid-cols-2 gap-[2rem]">
      {isLoading ? <Loader /> : null}
      {message != "No blogs in this category" ? (
        data?.data?.map((blog) => {
          return (
            <div
              key={blog._id}
              className="w-full h-full flex flex-col gap-3 cursor-pointer"
            >
              <Link to={`/${blog._id}`}>
                <div className="w-full h-full max-h-[300px] ">
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={blog.blogImage}
                  />
                </div>
                <div className="">
                  <h1 className="font-semibold text-[1.5rem] mt-2">
                    {blog.blogTitle}
                  </h1>
                </div>
                <div className="w-full flex flex-col gap-2 mt-2">
                  <span className="text-center w-full text-gray-400 font-medium text-sm italic">
                    {_TimeStamp(blog.createdAt)}
                  </span>
                  <p className="font-medium text-[.9rem]">{`${blog.blogContent.substring(
                    0,
                    250
                  )}...`}</p>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <h1 className="font-medium text-lg">No blogs to show</h1>
      )}
    </div>
  );
};

export default Blogs;
