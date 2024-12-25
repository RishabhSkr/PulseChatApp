import React from 'react'
import { Link } from 'react-router-dom';
import HeroImage from '../../assets/Hero.svg';  // Add this import
const Hero = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className=" mr-auto place-self-center lg:col-span-7 lg: mt-16">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Pulse Chat: Instant Connections, Effortless Conversations
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">
            Connect Seamlessly, Chat Effortlessly: Elevate Your Communication Experience 
            with Our Intuitive Chat Application!
          </p>
          
          <div className="flex flex-wrap gap-4">
           
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800"
                >
                  Login
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-700"
                >
                  Register
                </Link>
            
              <Link
                to="/chathome"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800"
              >
                Start Chatting
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
          </div>
        </div>
        
        <div className="hidden  lg:mt-0 lg:col-span-5 lg:flex">
          <img src={HeroImage} alt="Chat App Interface"/>
        </div>
      </div>
    </section>
  )
}

export default Hero