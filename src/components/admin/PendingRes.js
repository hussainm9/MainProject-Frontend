import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert'

export default function PendingRes() {
  const [pendingRes, setPendingRes] = useState([])
  const [select,setSelect]=useState({})
  const [data,setData]=useState(false)

  useEffect(() => {
    const fetchPendingRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3786/api/newly-registered', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        const data = response.data
        console.log(data);
        setPendingRes(data);
      } catch (error) {
        console.error('Error fetching pending restaurants:', error)
      }
    }

    fetchPendingRestaurants()

  }, [])

  const handleView = (id) => {
    console.log(id)
    
    console.log('working')
    const selectedItem = pendingRes.find((ele) => ele._id ===id )
    setSelect(selectedItem)
    setData(true)
    
    console.log(selectedItem)
  };
  const handleApprove=async(id)=>{
    console.log(id)
    try {
        await axios.put(`http://localhost:3786/api/approved-restaurant/${id}`, {newStatus: 'approved'}, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        swal("Approved","Sucessfully Approved","success")

    }catch(error){
        console.log('error while changing state',error)
    }
  }
  const handleReject=async(id)=>{
    console.log(id)
    try {
        await axios.put(`http://localhost:3786/api/approved-restaurant/${id}`, {newStatus: 'rejected'}, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        swal("Rejected","Rejected Sucessfully","success")

    }catch(error){
        console.log('error while changing state',error)
    }
  }
  

  return (
    <div>
      
      {data ? (
        <div>
            <h2 className='text-center'>Details of Restaurant -{select.name}</h2>
            <p>Name: {select.name}</p>
            <p>Street:{select.address.street}</p>
            <p>Area:{select.address.area}</p>
            <p>City:{select.address.city}</p>
            <p>district:{select.address.district}</p>
            <p>State:{select.address.state}</p>
            <p>PinCode:{select.address.pincode}</p>
            <p>Description: {select.description}</p>
            <p>Image:{select.image}</p>
            <p>GST No: {select.gstNo}</p>
            <p>License Number: {select.licenseNumber}</p>
            <button className="btn btn-success btn-block btn-sm " onClick={(e) => handleApprove(select._id)}>Approve</button>
            <button className="btn btn-danger btn-block btn-sm" onClick={(e)=>handleReject(select._id)}>Reject</button>
        </div>
        ) : (
        <div>
        <h2 className="col-4">Pending Restaurants - {pendingRes.length}</h2>
        <table class="table table-bordered  w-75 " >
          <thead >
            <tr className='table-primary'>
              <th scope="col-4">S.No</th>
              <th scope="col-6">Restaurant Name</th>
              <th scope="col-2">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {pendingRes.map((ele, i) => (
              <tr>
                <th scope="row">{`${i+1}`}</th>
                  <td>{ele.name}</td>
                  <td>
                    <button className="btn btn btn-outline-info btn-small" onClick={() => handleView(ele._id)}>
                      View
                    </button>
                  </td>
                  
                </tr>
              
            ))}
    
          </tbody>
        </table>
         
        
        </div>
      )}
      
    </div>
  );
} 

