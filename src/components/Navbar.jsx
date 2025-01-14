import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchfilter,
  searchingContact,
} from "../store/reducers/contactsSlice";

const Navbar = () => {
  const [Searching, setSearching] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchfilter(Searching));
  }, [Searching]);

  return (
    <div className="Navbar w-full h-[15%] bg-blue-200 flex justify-between items-center px-[2vw]">
      <input
        value={Searching}
        onChange={(e) => setSearching(e.target.value)}
        className="nav-search px-[1vw] py-[.5vw] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        type="text"
        placeholder="Search contact..."
      />
      <div className="nav-image w-[3vw] bg-blue-300 h-[3vw] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src="https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
