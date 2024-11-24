import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-16">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">CONTACT US</h2>

      {/* Contact Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Head Office */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Head Office</h3>
          <div className="space-y-2">
            <p className="flex items-center justify-center space-x-2 text-gray-600">
              <span>📞</span>
              <span>+91 522 2638738</span>
            </p>
            <p className="flex items-center justify-center space-x-2 text-gray-600">
              <span>📧</span>
              <span>info@cmseducation.org</span>
            </p>
          </div>
        </div>

        {/* QAID */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">QAID</h3>
          <div className="space-y-2">
            <p className="flex items-center justify-center space-x-2 text-gray-600">
              <span>📞</span>
              <span>+91 522 2638606</span>
            </p>
            <p className="flex items-center justify-center space-x-2 text-gray-600">
              <span>📧</span>
              <span>qaid@cmseducation.org</span>
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-pink-700 text-white rounded-lg p-8 space-y-6">
        <h3 className="text-xl font-bold">Subscribe to our Newsletter!</h3>
        <p className="text-sm">Stay updated with our weekly bulletin.</p>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name *"
            className="col-span-2 md:col-span-1 p-3 rounded bg-gray-100 text-black focus:outline-none"
          />
          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            className="col-span-2 md:col-span-1 p-3 rounded bg-gray-100 text-black focus:outline-none"
          />
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address *"
            className="col-span-2 p-3 rounded bg-gray-100 text-black focus:outline-none"
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 bg-white text-blue-900 py-2 px-4 font-semibold rounded hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
