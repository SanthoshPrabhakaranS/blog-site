import React from "react";
import AboutImg from "../../assets/aboutImg.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex-1 h-[calc(100vh_-_100px)] flex flex-col gap-5 w-[20%] px-4 bg-[#FCF2FB] mt-3">
      <header className="w-full p-1 py-2 border-t-2 border-b-2 border-gray-300 flex justify-center items-center mt-3 font-medium">
        <p>ABOUT ME</p>
      </header>
      <main className="w-full flex flex-col gap-2">
        <img
          className="w-full h-full max-h-[300px] rounded-md"
          src={AboutImg}
        />
        <p className="font-medium text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere odit
          dignissimos ducimus, quisquam placeat enim nobis consectetur animi
          temporibus magnam? Laborum obcaecati ipsum neque unde?
        </p>
      </main>
      <footer className="flex flex-col gap-3">
        <p className="w-full p-1 py-2 border-t-2 border-b-2 border-gray-300 flex justify-center items-center mt-3 font-medium">
          CATEGORIES
        </p>
        <ul className="grid grid-cols-2 w-full place-items-center gap-y-2 font-medium">
          <li className="cursor-pointer hover:text-gray-500">
            <Link to={"/blogs/Music"}>Music</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link to={"/blogs/Sport"}>Sport</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link to={"/blogs/Life"}>Life</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-500">
            <Link to={"/blogs/Health"}>Health</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Sidebar;
