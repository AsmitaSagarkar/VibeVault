'use client';

import {useEffect,useState} from "react";



export default function History(){
  const [mood,setMood] = useState([]);
useEffect(() =>{
    const fetchMood = async()=>{
      const res = await fetch("http://localhost:5000/api/mood");
      const data =await res.json();
      if(data.success){
        setMood(data.data);
      }
    };
    fetchMood();

  },[]);

    return(


        <>
        <h1>Your Mood History</h1>

        <div>
            <ul>
                {mood.map((item:any)=>(
                    <li key={item.id}>
                        <p>{item.mood}</p>
                        <p>{item.message}</p>
                        <p>{item.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}


