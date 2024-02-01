import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PendingRes from './PendingRes';
import ApprovedRes from './ApprovedRes';
import RejectedRes from './RejectedRes';


export default function AdminDashboard() {

  
  const [title,setTitle] = useState('pending')
  

  

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-4">
          <button type="button" className="btn btn-warning btn-block " onClick={(e)=>setTitle('pending')} >Pending Restaurants</button>
        </div>
        <div className="col-4 text-center">
          <button type="button" className="btn btn-success btn-block" onClick={(e)=>setTitle('approved')}>Approved Restaurants</button>
        </div>
        <div className="col-4 text-right">
          <button type="button" className="btn btn-danger btn-block" onClick={(e)=>setTitle('rejected')}>Rejected Restaurants</button>
        </div>
      </div>
      {title == "pending" && <PendingRes/>}
      {title== "approved" && <ApprovedRes/>}
      {title == "rejected" && <RejectedRes/>}

    </div>
  );
}
