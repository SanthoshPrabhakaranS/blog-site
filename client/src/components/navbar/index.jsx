import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Storage from "../../storage/storage";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const storage = new Storage();
  const navigate = useNavigate();
  const userIsLoggedIn = storage.getItem("userId");
  const { user } = useContext(AuthContext);
  const profile = storage.getItem("userImage");

  const _logout = () => {
    storage.clearStorage();
    navigate("/");
  };

  return (
    <nav className="w-full p-3 px-8 flex justify-between items-center border-b">
      <div>
        <h1 className="text-[1.3rem] font-semibold">Blog Site</h1>
      </div>
      <ul className="flex items-center gap-3 font-medium">
        <Link to={"/"}>
          <li className="cursor-pointer hover:underline transition">HOME</li>
        </Link>
        <Link to={`${userIsLoggedIn ? "/write-post" : "/login"}`}>
          {userIsLoggedIn ? (
            <li className="cursor-pointer hover:underline transition">WRITE</li>
          ) : (
            <li className="cursor-pointer hover:underline transition">LOGIN</li>
          )}
        </Link>

        {userIsLoggedIn ? (
          <>
            <li
              onClick={_logout}
              className="cursor-pointer hover:underline transition"
            >
              LOGOUT
            </li>
            <li>
              <img
                src={profile}
                alt="user-img"
                className="w-[40px] h-[40px] rounded-full"
              />
            </li>
          </>
        ) : (
          <Link to={"/register"}>
            <li className="cursor-pointer hover:underline transition">
              REGISTER
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
