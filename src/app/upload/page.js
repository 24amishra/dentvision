'use client';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { motion } from 'framer-motion';


const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [imageValid, setImageValid] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const[uid, setUid] = useState(null);
  const[date,setDate] = useState(null);
  const[img,setImg] = useState(1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUserEmail(user.email);
        setUid(user.uid);
  
        const isoDate = new Date().toISOString().split('T')[0];
        setDate(isoDate);
      } else {
        console.log("No user found");
        // router.push('/login'); // if needed
      }
    });
  
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
      setImageValid(false);
      setMessage('Please upload a JPG or JPEG image.');
      return;
    }

    const formData = new FormData();
    const userData = new FormData();
    formData.append('file', file);

    formData.append('email',userEmail)
    formData.append('uid',uid);
    formData.append('date',date);



    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/data', {
        method: 'POST',
        body: formData,
    
      });

      const output = await res.json();
      console.log(output);

      setProbability(Math.round(output.Probability * 100));

      const predCase = output["predicted condition"];
      if (predCase === 0) {
        setPrediction('Calculus (Plaque) detected');
      } else if (predCase === 1) {
        setPrediction('No Health Issues detected!');
      } else if (predCase === 2) {
        setPrediction('Gingivitis or other issue detected');
      }

      setMessage('File uploaded successfully!');
      setImg(img + 1);
      console.log(img);
    } catch (err) {
      console.error('Error during file upload:', err);
      setMessage('Error uploading file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">File Upload</div>
        {!userEmail && (
          <div className="space-x-4">
            <a href="/log2" className="hover:text-blue-500">Login</a>
            <a href="/login" className="hover:text-blue-500">Create an Account</a>
          </div>
        )}
      </nav>
      {userEmail && ( 

<div className="space-x-4">
            <a href="/log2" className="font-bold text-lg hover:text-blue-500">Welcome {userEmail}</a>
            

            <p>Upload three different images of your smile from each of these angles: front, left side, and right side. Ensure the lighting is not too dark, with focus on your teeth.</p>
          </div>



      )}

{ img == 1 && 
<motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
      <div> <p> 1. Front Facing </p>
      
        <input
          type="file"
          accept=".jpg,.jpeg"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-10"
        />

<img href = 'image.png'></img>
      </div>
     

      <button
        onClick={onFileUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="text-sm">{message}</p>}
      </motion.div>
}
     
{ img == 2 && <motion.div   initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}>
      <div> <p> 2. Left side angle </p>
        <input
          type="file"
          accept=".jpg,.jpeg"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-10" 
        />
      </div>
     

      <button
        onClick={onFileUpload}
        disabled={loading && img  == 2}  
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="text-sm">Please upload a file</p>}
      </motion.div>
     }





{
  img  == 3 && 
  
  <motion.div   initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}>
      <div> <p> 3. Right side angle</p>
        <input
          type="file"
          accept=".jpg,.jpeg"
          onChange={onFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-10"
        />
      </div>
     

      <button
        onClick={onFileUpload}
        disabled={loading &&  img > 2}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="text-sm">Please Upload a file</p>}
      </motion.div>
}









    </div>
    
  );
};

export default FileUpload;
