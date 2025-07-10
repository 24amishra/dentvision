'use client'
import { initializeApp } from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {useState,useEffect } from 'react';
import HistogramChart from './graph';






export default function Dash(){
   const[email,setEmail] = useState(null);
   const[uid,setUid] = useState(null);
   const[entries,setEntries] = useState([]);
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
           console.log(user);
          setEmail(user.email);
     
         } else {
           console.log("No user found");
           // router.push('/login'); // if needed
         }
       });
     
       return () => unsubscribe(); // cleanup on unmount
     }, []);


     useEffect( ()=>{
      fetch(`/api/entries?email=${encodeURIComponent(email)}`).then((res => res.json())).then((data) =>{
  setEntries(data)

     


}).catch((err) => {
console.error(err);

})






     })








return(
<div>
<div className = 'flex flex-col justify-center items-center  '>

    <p className='font-bold text-lg'>Welcome to the dashboard, {email} </p>

  

<a  className = 'min-h-screen'href = '/upload'>Click here to upload a file.</a>
<ul>

{entries.map((entry,index) =>(

<li key = {index}>{JSON.stringify(entry)}</li>

)


)}


</ul>

{/* <HistogramChart key={col} title={col} data={data} /> */}




    </div>
    </div>
)





}