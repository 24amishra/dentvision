'use client';

import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { LucideBookOpen, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';


import { initializeApp } from 'firebase/app';
import {  collection, getDocs } from 'firebase/firestore/lite';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { shield } from 'lucide-react';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const[message,setMessage] = useState("");
  const[cont,setCont] = useState(false); 
  const firebaseConfig = {
    apiKey: "AIzaSyAZBuoliNmCKijga49KPaJwFDApRsvHb3Q",
    authDomain: "dentvision-e6298.firebaseapp.com",
    projectId: "dentvision-e6298",
    storageBucket: "dentvision-e6298.firebasestorage.app",
    messagingSenderId: "689681960765",
    appId: "1:689681960765:web:bb3bb88d8b80a74ab43f54",
    measurementId: "G-FJ69B4N0W6"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  const signIn = (e) =>{
    e.preventDefault();



  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {


    const user = userCredential.user;
    setMessage("Success!")
    console.log(user)
    setCont(true);
    



    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    setMessage(errorMessage)
  });



  }



  useEffect(() =>{

if (cont){
router.push('/dash')

}
  }
);




  const handleSubmit = async (e) => {



  
   





  
    setError('');
    setLoading(true);
  

  
     
    } 
  
  useEffect(() => {
    if (loading) {
      setTimeout(() => {

        
        router.push('/');
      }, 3000); // 3000ms = 3 seconds
    }
  }, [loading]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
          <div className="flex justify-center mb-6">
            <Shield className="text-blue-600 w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">DentVision Login</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={signIn} className="space-y-4">
            <Input placeholder="Email" type="email" className="w-full p-3 rounded-md border-2 border-blue-300 focus:border-green-500" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" className="w-full p-3 rounded-md border-2 border-blues-300 focus:border-green-500" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Login
            </Button>
          </form>
          {message}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <a href="/login" className="text-green-600 hover:underline">Create an Account</a>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}