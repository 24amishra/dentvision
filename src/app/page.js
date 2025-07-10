

'use client'
import Router from "next/navigation";
import { motion } from "framer-motion";

export default function Home(){





    return(





        <div className="min-h-screen bg-white text-gray-800">
        {/* Hero */}
        <motion.section
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8 }}
        
        className="bg-gradient-to-r from-blue-400 to-blue-800 text-white py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">DentVision Dental Assistant</h1>
            <p className="text-xl mb-8">
              Take control of your dental health today, powered by CNNs.
            </p>
            <a href="/log2" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100">
Login            </a>
          </div>
        </motion.section>
  
        {/* Features */}
        <motion.section 
       
         

        className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <motion.div   initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2}}
    viewport={{ once: true,amount:1 }} className="grid md:grid-cols-3 gap-8">
              <FeatureCard title="Lightweight and Simple" description="Simply upload an image of your smile and let us do the work." />
              <FeatureCard title="Secure" description="Your data is protected with industry best practices, from secure 3rd party vendors such as Firebase and MongoDB." />
              <FeatureCard title="Intuitive" description="Easily find the overall trends and intracicies behind your dental development over time." />
            </motion.div>
          </div>
        </motion.section>
  
        {/* CTA */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="mb-6">Join today and harness your dental health stress-free.</p>
            <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
              Sign Up Free
            </a>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );

    





}
function FeatureCard({ title, description }) {
  return (
    <div className="p-6 bg-white shadow rounded-lg text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}