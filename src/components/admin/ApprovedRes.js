import React,{useState,useEffect} from 'react'
import axios from 'axios';

export default function ApprovedRes() {
    const [approved,setApproved]=useState([])


    useEffect(()=>{
        const approvedRestaurants=async ()=>{
            try{
                const response=await axios.get('http://localhost:3786/api/approved',{
                    headers:{
                        Authorization:localStorage.getItem('token')
                        
                    }
                })
                const data=response.data
                console.log(data)
                setApproved(data)

            }
            catch(error){
                console.error('Error fetching pending restaurants:', error)
            }
           
        };
        approvedRestaurants()
    },[])
    
  return (
    <div >
        <h2 className="col-4">Approved Restaurants - {approved.length}</h2>
        {approved.map((ele,i)=>{
            return <ul key={i}>
                 <p >{`${i+1}) ${ele.name}`}
                    <button className='btn btn-outline-info'>View</button>
                 </p>
            </ul>
        })}
    </div>
  )
}