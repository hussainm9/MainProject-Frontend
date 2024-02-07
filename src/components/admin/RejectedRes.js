import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function RejectedRes() {
  const [rejected,setRejected]=useState([])

  useEffect(()=>{
    const rejectedRestaurants=async()=>{
      try{
        const response=await axios.get('http://localhost:3786/api/rejected',{
          headers:{
            Authorization:localStorage.getItem('token')
          }
        })
        const data=response.data
        setRejected(data)
        console.log(data)
        

      }
      catch(error){
        console.log('Error fetching pending restaurants:', error)
      }
    }
    rejectedRestaurants()
  },[])

  return (
    <div>
        <h2 className="col-4">Rejected restaurants - {rejected.length}</h2>
        {
          rejected.map((ele,i)=>{
            return <ul key={i}>
              <p>{`${i+1}) ${ele.name}`}
              <button type="button" class="btn btn-outline-info btn-sm" >View Reason</button>

              
              </p>
            </ul>
          })
        }
    </div>
  )
}