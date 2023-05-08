import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetSingleBlog } from "../../services/api/fetcher";
import { icons } from "../../icons/icons";
import Storage from "../../storage/storage";
import { Loader } from "rsuite";
import BlogsService from "../../services/api/blogs";
import toast, { Toaster } from "react-hot-toast";

const SingleBlog = () => {
  const location = useLocation();
  const storage = new Storage();
  const _ApiService = new BlogsService();
  const username = storage.getItem("userName");
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editImageView, setEditImageView] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const id = location.pathname
    .toString()
    .substring(location.pathname.lastIndexOf("/") + 1);
  const { data, isLoading, error, mutate } = useGetSingleBlog(id);

  const _enableEdit = () => {
    setEdit(true);
    setEditTitle(data?.data.blogTitle);
    setEditImageView(data?.data.blogImage);
    setEditContent(data?.data.blogContent);
  };

  const _save = async () => {
    try {
      const formData = new FormData();
      formData.append("blogId", id);
      formData.append("blogTitle", editTitle);
      formData.append("blogContent", editContent);
      formData.append("blogImage", editImage);

      const response = await _ApiService.updateBlog(formData);
      toast.success(response.message);
      setEdit(false);
      mutate();
    } catch (error) {
      console.log(error, "err");
    }
  };

  const _onChangeInputHandler = (event, type) => {
    if (type === "title") {
      setEditTitle(event.target.value);
    } else {
      setEditContent(event.target.value);
    }
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const _onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditImageView(URL.createObjectURL(event.target.files[0]));
      setEditImage(event.target.files[0]);
    }
  };

  const _deleteBlog = async (blogId) => {
    const response = await _ApiService.deleteBlog(blogId);
    console.log(response);
    navigate("/");
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {isLoading && <Loader content="Loading..." />}
      <Toaster />
      <div className="px-[11rem] flex w-full justify-between items-center mt-1">
        <p className="flex p-1 text-[1.5rem] mt-2 ">
          <Link className="hover:text-gray-500 cursor-pointer" to={"/"}>
            {icons.back}
          </Link>
        </p>
        {edit ? (
          <button
            onClick={_save}
            className="p-1 px-4 bg-gray-900 text-white transition-all border text-sm rounded-md font-semibold hover:bg-white hover:text-gray-900"
          >
            Save changes
          </button>
        ) : data?.author === username ? (
          <div className="flex flex-row gap-2">
            <button
              onClick={_enableEdit}
              className="p-1 px-4 bg-gray-900 text-white transition-all border text-sm rounded-md font-semibold hover:bg-white hover:text-gray-900"
            >
              Edit blog
            </button>
            <button
              onClick={() => _deleteBlog(data?.data?._id)}
              className="p-1 px-4 bg-gray-900 text-white transition-all border text-sm rounded-md font-semibold hover:bg-white hover:text-gray-900"
            >
              Delete blog
            </button>
          </div>
        ) : null}
      </div>
      <div className="w-full h-full max-h-[calc(100vh_-_150px)] px-[11rem] relative overflow-y-scroll">
        {!isLoading && (
          <img
            src={edit ? editImageView : data?.data.blogImage}
            className={`w-full h-full max-h-[400px] object-fill rounded-xl mb-2
        }`}
            alt="img"
          />
        )}

        {edit ? (
          <>
            <label
              className="p-2 rounded-[50%] text-gray-500 font-bold text-lg border-2 flex justify-center items-start h-[3rem] w-[3rem] cursor-pointer hover:bg-gray-300"
              htmlFor="image"
            >
              +
            </label>
            <input
              type="file"
              onChange={_onImageChange}
              id="image"
              className="hidden"
            />
          </>
        ) : null}

        <div className="flex flex-col items-center gap-2">
          {edit ? (
            <textarea
              onChange={(e) => _onChangeInputHandler(e, "title")}
              value={editTitle}
              type="text"
              className="border-none p-2 placeholder:text-[1.7rem] focus:outline-none text-[1.7rem] w-full max-h-[200px] font-semibold"
              placeholder="Title"
            />
          ) : (
            <h1 className="font-semibold text-[1.8rem]">
              {data?.data.blogTitle}
            </h1>
          )}

          <p className="w-full flex justify-end items-center font-medium italic text-lg text-gray-600">
            - {data?.author}
          </p>
          {edit ? (
            <textarea
              onChange={(e) => _onChangeInputHandler(e, "content")}
              value={editContent}
              type="text"
              className={`border-none p-3 placeholder:text-[1.3rem] focus:outline-none text-[1.3rem] w-full h-full max-h-[700px] font-medium`}
              placeholder="Tell your story..."
            />
          ) : (
            data?.data.blogContent.split("\n").map((paragraph, index) => (
              <p
                className="font-medium text-[1.2rem] text-gray-600 whitespace-pre-wrap"
                key={index}
              >
                {paragraph}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
