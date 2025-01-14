import React from "react";
import Addcontact from "./pages/Addcontact";
import Contacts from "./pages/Contacts";
import { Route, Routes } from "react-router-dom";
import Editcontact from "./pages/Editcontact";

const App = () => {
  return (
    <div className="Main w-full h-screen flex justify-center items-center">
      <div className="Outer-div w-[25%] h-[82%] border-[1px] border-solid border-black rounded-lg relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Addcontact />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<Editcontact/>} />
        </Routes>
        <Addcontact />
      </div>
    </div>
  );
};

export default App;
