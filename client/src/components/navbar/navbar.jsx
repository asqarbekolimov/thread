import React, { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link to={"/"}>
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
        <Link to={"/dashboard"}>
          <VscAccount className="text-2xl cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
