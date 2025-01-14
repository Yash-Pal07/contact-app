import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { updatecontacts } from "../store/actions/contactsAction";
import { useNavigate } from "react-router-dom";

const Editcontact = () => {
  const [image, setimage] = useState("");
  const { id: selectedId } = useParams();

  const data = useSelector((state) => state.contacts.data);

  const datatoedit = data.find((item) => item.id === selectedId);

  const [Newname, setNewname] = useState(datatoedit ? datatoedit.name : "");
  const [Newemail, setNewemail] = useState(datatoedit ? datatoedit.email : "");
  const [Newphone, setNewphone] = useState(datatoedit ? datatoedit.phone : "");
  const [Newaddress, setNewaddress] = useState(
    datatoedit ? datatoedit.address : ""
  );
  const [NewImageUrl, setNewImageUrl] = useState(
    datatoedit ? datatoedit.image : ""
  );

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
      setNewImageUrl(response.data.url);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const EditedContact = {
      id: selectedId,
      name: Newname,
      email: Newemail,
      phone: Newphone,
      address: Newaddress,
      image: NewImageUrl,
    };
    dispatch(updatecontacts(EditedContact));
    navigate("/contacts");
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full h-full ">
      <div className="edit-head w-full h-[15%] bg-blue-200 flex items-center px-[1vw] ">
        <Link to="/contacts">
          <i className="edit-back ri-arrow-left-long-line text-2xl font-semibold"></i>
        </Link>
        <h1 className="edit-header-text text-2xl ml-[1vw] font-semibold">
          Edit Contact
        </h1>
      </div>

      {selectedId ? (
        <div className="w-full  h-[85%] px-[1vw] py-[1.5vx]">
          <form className="Edit-form w-full h-full flex flex-col justify-evenly gap-2 p-[.5vw]">
            {/* Upload image 👽 */}
            <div className="flex  items-start w-full">
              <div className="flex flex-col  gap-[1vw]">
                <label
                  htmlFor="image"
                  className="block text-lg font-semibold mb-1"
                >
                  Add Image
                </label>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setimage(file);
                    UploadHandler(file);
                  }}
                  id="image"
                  type="file"
                  accept="image/*"
                  className=" w-[85%] rounded-[2px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="w-[40%] h-full  flex justify-center">
                {NewImageUrl ? (
                  <img
                    src={NewImageUrl}
                    alt="Uploaded"
                    className=" edit-Image-View w-[5vw]  h-[5vw] rounded-full object-cover object-center"
                  />
                ) : (
                  <div>
                    <img
                      className="w-[5vw]  h-[5vw] rounded-full object-cover object-center"
                      src="https://plus.unsplash.com/premium_vector-1727956885330-0b80b9df0fc7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Full Name.. */}
            <div className="flex justify-between gap-3 items-center">
              <label
                htmlFor="name"
                className="element block text-lg font-semibold mb-1 text-nowrap"
              >
                Full Name :
              </label>
              <input
                onChange={(e) => setNewname(e.target.value)}
                value={Newname}
                id="name"
                type="text"
                placeholder="Enter full name"
                className="inputt px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Email.. */}
            <div className="flex justify-between gap-3 items-center">
              <label
                htmlFor="email"
                className="element block text-lg font-semibold mb-1 text-nowrap"
              >
                Email :
              </label>
              <input
                onChange={(e) => setNewemail(e.target.value)}
                value={Newemail}
                id="email"
                type="email"
                placeholder="Enter email address"
                className="inputt px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Phone.. */}
            <div className="flex justify-between gap-3 items-center">
              <label
                htmlFor="phone"
                className="element block text-lg font-semibold mb-1 text-nowrap"
              >
                Ph. Number :
              </label>
              <input
                onChange={(e) => setNewphone(e.target.value)}
                value={Newphone}
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                className="inputt px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Address... */}
            <div className="flex justify-between gap-3 items-center">
              <label
                htmlFor="address"
                className="element block text-lg font-semibold mb-1 text-nowrap"
              >
                Address :
              </label>
              <textarea
                onChange={(e) => setNewaddress(e.target.value)}
                value={Newaddress}
                id="address"
                placeholder="Enter address"
                className="inputt px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none h-[60px]"
              ></textarea>
            </div>

            {/* Submit Button.. */}

            <button
              onClick={(e) => {
                submitHandler(e);
                alert("Contact Updated..");
              }}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-[8vw] h-full font-semibold text-2xl">
          <h1>No contacts added yet...</h1> <p>😿</p>
        </div>
      )}
    </div>
  );
};

export default Editcontact;
