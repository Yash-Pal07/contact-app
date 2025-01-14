import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'
import { useDispatch, useSelector } from 'react-redux'
import 'remixicon/fonts/remixicon.css'

import { Link } from'react-router-dom'
import { deleteContact } from '../store/actions/contactsAction'

const Contacts = () => {
  
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.contacts.filterarr);

  
  return (
    <div className='w-full h-full bg-white'>
      <Navbar />
      <Navbar2 />
      <div className='w-full h-[78%] Contact overflow-auto'>
          {data.length > 0 ? data.map((item,index)=>{
            return <div key={index} className='contacts-display w-full py-[.5vw] justify-between h-[5.5vw] border-b-[2px] border-solid border-blue-200 flex items-center px-[2vw]'>
            <div className='flex items-center'>
            <img className='Contact-image w-[3.5vw] h-[3.5vw] rounded-full bg-gray-500 object-cover object-center' src={item.image} alt="" />
            <h1 className='contact-name ml-[1.5vw] text-[1.3vw] font-semibold text-nowrap truncate'>{item.name}</h1>
            </div>
            <div className='w-[20%] h-full flex justify-center items-center'>
            <Link to={`/contacts/${item.id}`} >
              <i className="ri-pencil-line text-black text-2xl "></i>
            </Link>
            <i onClick={()=>dispatch(deleteContact(item.id))} className="ri-delete-bin-6-line text-2xl ml-[1vw] cursor-pointer"></i>
            </div>
          </div>
          }): <div className='flex flex-col items-center pt-[8vw] h-full font-semibold text-2xl'><h1>No contacts added yet...</h1> <p>😿</p></div>}
      </div>
    </div>
  )
}

export default Contacts
