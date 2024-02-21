import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
  HiLogout,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
  // { name: "Log Out", to: "/", icon: HiLogout },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-2">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = ({ removeCookie, cookies }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // window.location.href("http://localhost:3000");
        removeCookie("useremail");
        removeCookie("password");
        removeCookie("valid");
      })
      .catch((error) => {
        removeCookie("useremail");
        alert(error);
        // An error happened.
      });
  };
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <h2 className="items-center text-base mt-4 text-gray-400 hover:text-cyan-400">
          {cookies.useremail}
        </h2>
        <NavLinks />
        <NavLink
          to="/"
          className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={logout}
        >
          <HiLogout className="w-6 h-6 mr-2" />
          Log Out
        </NavLink>
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <h2 className="items-center text-base mt-4 text-gray-400 hover:text-cyan-400">
          {cookies.useremail}
        </h2>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        <NavLink
          to="/"
          className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={logout}
        >
          <HiLogout className="w-6 h-6 mr-2" />
          Log Out
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
