import React from "react";
import ContactUs from "../Components/ContactUs";
import Footer from "../Components/Footer";
import { Button } from "flowbite-react";

const Home = () => {
  return (
    <div>
    <section className="bg-white flex flex-col md:flex-row items-center justify-between px-12 md:px-16 py-10">
      {/* Left Section */}
      <div className="text-center md:text-left md:w-1/2 space-y-6 ">
        <h1 className="text-xl md:text-2xl font-bold text-gray-700">CITY MONTESSORI SCHOOL</h1>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          MATERIAL, HUMAN & DIVINE EDUCATION
        </h2>
        <p className="text-gray-500 md:text-base">
          The mission of CMS is to create a better future for all children. We achieve this
          by maximising opportunities for children through holistic, values-based education
          of the highest quality and through initiatives that promote unity and meaningful
          social action for development.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <Button className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800" gradientDuoTone="purpleToPink">
            Know More About Us
          </Button>
          <button className="px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200">
            Online Admission
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative mt-8 md:mt-0 md:w-1/2">
        <img
          src='../src\assets\blonde-1297289_1920.png'
          alt="Student"
          className="h-screen w-full rounded-lg"
        />
        <div className="absolute top-10 right-0 bg-gradient-to-r from-pink-600 to-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 w-32 h-32 rounded-full opacity-50 transform translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 bg-gradient-to-r from-blue-500 to-pink-500 w-24 h-24 rounded-full opacity-50 transform -translate-x-10 translate-y-10"></div>
      </div>
    </section>
    <div id="ContactUs">
    <ContactUs/>
    </div>
    <div id="About">
    <Footer/>
    </div>
    </div>
  );
};

export default Home;
