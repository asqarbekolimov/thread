import React, { useContext, useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import {
  AiOutlineGlobal,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { userReducer } from "../../reducer/userReducer";
import { UserContext } from "../../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="max-w-[620px] container flex items-center justify-between py-5">
      <div>
        <Link to={state ? "/" : "/auth"}>
          <AiOutlineGlobal className="text-2xl cursor-pointer" />
        </Link>
      </div>
      <div onClick={handleTheme} className="w-10 cursor-pointer">
        {theme === "dark" ? (
          <img className="w-10" src="/white-logo.svg" alt="" />
        ) : (
          <img className="w-10" src="/black-logo.svg" alt="" />
        )}
      </div>
      <div className="w-10">
        {state ? (
          <Link to={"/dashboard"}>
            {" "}
            <VscAccount className="text-2xl cursor-pointer" />
          </Link>
        ) : (
          <Link to={"/auth"}>
            <AiOutlineUserAdd className="text-2xl cursor-pointer" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
