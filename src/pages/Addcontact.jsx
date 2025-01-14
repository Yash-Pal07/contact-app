import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../store/actions/contactsAction";
import Navbar2 from "../components/Navbar2";
import { nanoid } from "@reduxjs/toolkit";


const AddContact = () => {
  const [image, setImage] = useState(null); // Stores the file
  const [imageUrl, setImageUrl] = useState(""); // Stores the uploaded image URL
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const UploadHandler = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "contacts-image");
    data.append("cloud_name", "doy9tagkp");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doy9tagkp/image/upload",
        data
      );
      const uploadedImageUrl = response.data.secure_url; // Get the uploaded image URL
      setImageUrl(uploadedImageUrl); // Set the image URL in the state
    } catch (error) {
      console.error("Error uploading the images:", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !imageUrl) {
      alert("Please fill out all fields and upload an image!");
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
      address,
      image: imageUrl, // Add the uploaded image URL
    };
    
    dispatch(addContact(newContact)); // Save the contact to Redux
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setImage(null);
    setImageUrl(null);
    alert("Contact added successfully!");
  };

  return (
    <div className="Add-page w-full h-full bg-gray-100 shadow-lg rounded-lg">
      <div className="Contact-header h-[15%] w-full border-b-[2px] border-gray-300 text-2xl font-semibold flex justify-start px-[2vw] items-center bg-blue-200">
        Contact
      </div>

      <Navbar2 />

      {/* Form Section */}
      <div className="h-[78%] w-full py-[1vw] px-4">
        <form
          onSubmit={submitHandler}
          className="w-full h-full flex flex-col justify-evenly gap-2 p-[.5vw]"
        >
          {/* Image Upload */}
          <div className="flex  items-start w-full">
            <div className="flex flex-col  gap-[1vw]">
            <label htmlFor="image" className="block text-lg font-semibold mb-1">
              Add Image
            </label>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file); // Set the file in state
                  UploadHandler(file); // Upload the file to Cloudinary
                }}
                id="image"
                type="file"
                accept="image/*"
                className="w-[85%] rounded-[2px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
                </div>
              <div className="w-[40%] h-full  flex justify-center">
                {imageUrl ? <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="Image-View w-[5vw]  h-[5vw] rounded-full object-cover object-center"
                  /> : <div><img className="Image-View  w-[5vw]  h-[5vw] rounded-full object-cover object-center" src="https://plus.unsplash.com/premium_vector-1727956885330-0b80b9df0fc7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>}
              </div>
          </div>

           {/* Full Name */}
           <div className="flex justify-between gap-3 items-center">
            <label htmlFor="name" className="block text-lg font-semibold mb-1 text-nowrap">
              Full Name : 
            </label>
            <input
            onChange={(e) =>setName(e.target.value)}
            value={name}
              id="name"
              type="text"
              placeholder="Enter full name"
              className=" px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Email */}
          <div className="flex justify-between gap-3 items-center">
            <label htmlFor="email" className="block text-lg font-semibold mb-1 text-nowrap">
              Email : 
            </label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
              id="email"
              type="email"
              placeholder="Enter email address"
              className=" px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Phone */}
          <div className="flex justify-between gap-3 items-center">
            <label htmlFor="phone" className="block text-lg font-semibold mb-1 text-nowrap">
              Ph. Number : 
            </label>
            <input
            onChange={(e)=>setPhone(e.target.value)}
            value={phone}
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className=" px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Address */}
          <div className="flex justify-between gap-3 items-center">
            <label htmlFor="address" className="block text-lg font-semibold mb-1 text-nowrap">
              Address : 
            </label>
            <textarea
            onChange={(e)=>setAddress(e.target.value)}
            value={address}
              id="address"
              placeholder="Enter address"
              className=" px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none h-[60px]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
          onClick={submitHandler}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Contact
          </button>
        </form>
        </div>
    </div>
  );
};

export default AddContact;
