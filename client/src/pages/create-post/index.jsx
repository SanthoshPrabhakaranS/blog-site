import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Storage from "../../storage/storage";
import BlogsService from "../../services/api/blogs";

const CreatePost = () => {
  const _ApiService = new BlogsService();
  const storage = new Storage();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentImage, setContentImage] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const userId = storage.getItem("userId");
  const navigate = useNavigate();

  const _onChangeInputHandler = (event, type) => {
    if (type === "title") {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const _onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setContentImage(event.target.files[0]);
    }
  };

  const _onOptionsChange = (event) => {
    setCategory(event.target.value);
  };

  const _createPost = async (e) => {
    e.preventDefault();
    const contentText = content.split("\n");
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("blogTitle", title);
    formData.append("blogImage", contentImage);
    formData.append("blogContent", contentText);
    formData.append("blogCategory", category);

    if (content !== "" && title !== "") {
      const response = await _ApiService.createBlog(formData);
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error("Fields to be filled!");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-[2rem]">
      <Toaster />
      <Navbar />
      <div className="w-full h-full max-h-[calc(100vh_-_100px)] p-2 px-[20rem] relative overflow-y-scroll">
        <button
          onClick={_createPost}
          className="p-2 bg-green-800 text-white font-semibold rounded-md absolute top-0 right-[10%] hover:bg-green-600"
        >
          Publish
        </button>
        <img
          src={image}
          className={`w-full h-full max-h-[400px] object-fill rounded-xl mb-2 ${
            image ? "flex" : "hidden"
          }`}
          alt="img"
        />
        <div className="flex flex-row items-center gap-2">
          <label
            className="p-2 rounded-[50%] text-gray-500 font-bold text-lg border-2 flex justify-center items-start h-[3rem] w-[3rem] cursor-pointer hover:bg-gray-300 mb-10"
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
          <textarea
            onChange={(e) => _onChangeInputHandler(e, "title")}
            value={title}
            type="text"
            className="border-none p-3 placeholder:text-[1.7rem] focus:outline-none text-[1.7rem] w-full max-h-[200px] font-semibold"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-row gap-2 items-center ml-3 mb-2 ">
          <label
            className="font-semibold text-xl text-gray-400"
            htmlFor="category"
          >
            Category:{" "}
          </label>
          <select
            defaultValue={"Music"}
            onChange={_onOptionsChange}
            value={category}
            id="category"
            className="focus:outline-none p-1 px-2"
          >
            <option value="Music">Music</option>
            <option value="Life">Life</option>
            <option value="Sport">Sport</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <textarea
          onChange={(e) => _onChangeInputHandler(e, "content")}
          value={content}
          type="text"
          className={`border-none p-3 placeholder:text-[1.3rem] focus:outline-none text-[1.3rem] w-full h-full max-h-[700px] font-medium `}
          placeholder="Tell your story..."
        />
      </div>
    </div>
  );
};

export default CreatePost;
