import React from "react";
import { NavLink } from "react-router-dom";


const Navbar2 = () => {
  return (
    <div className="w-full h-[7%]  flex justify-between">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "w-[50%] border-b-2 border-black h-full text-lg font-semibold flex items-center justify-center"
            : "w-[50%] h-full text-lg font-semibold flex items-center justify-center"
        }
      >
        Add Contact
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) =>
          isActive
            ? "w-[50%] border-b-2 border-black h-full text-lg font-semibold flex items-center justify-center"
            : "w-[50%] h-full text-lg font-semibold flex items-center justify-center"
        }
      >
        Contacts
      </NavLink>
    </div>
  );
};

export default Navbar2;
