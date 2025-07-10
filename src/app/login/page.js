// App.js
'use client'
import React from 'react';

import { initializeApp } from 'firebase/app';
import {  collection, getDocs } from 'firebase/firestore/lite';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { auth } from '../firebase';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
export default function Login() {




// Get a list of cities from your database

//start app function and export

  const[email,setEmail] = useState("");
  const[pwrd,setPwrd] = useState("");
  const[message,setMessage] = useState("");
  const[error,setError] = useState(false);

  const signUp = (e) =>
    
    {
      console.log("Sending" + email + pwrd);
      
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwrd)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    setMessage("Success!")
    // ...
  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);
    setError(true);
    setMessage(errorMessage.slice(10))



    // ..
  });
}
  return (
    //
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900">
    <Toaster position="top-center" reverseOrder={false} />
    <motion.div initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 100 }}>
      <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <div className="flex justify-center mb-6">
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Create Your DentVision Account</h2>
        <p className="text-gray-600 text-center mb-4">Join Dentvision to take control of your dental health.</p>
      <form onSubmit={signUp} className="space-y-4">
          <Input placeholder="Email" type="email" className="w-full p-3 rounded-md border-2 border-blue-300 focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" className="w-full p-3 rounded-md border-2 border-blue-300 focus:border-blue-500" value={pwrd} onChange={(e) => setPwrd(e.target.value)} />
          <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Create Account
          </Button>
          {error && 
          <div className = "text-red-300">
          <p>Error: {message}</p>
          </div>
          }
        </form>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/log2" className="text-green-600 hover:underline">Login</a>
        </motion.div>
      </Card>
    </motion.div>
  </div>
  );
}

