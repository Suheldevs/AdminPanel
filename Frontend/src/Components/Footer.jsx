import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 md:px-16">
      {/* Footer Top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-gray-700">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About CMS</h3>
          <p className="text-sm text-gray-400">
            City Montessori School (CMS) aims to provide holistic education and values-based learning
            to shape the leaders of tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#admission" className="hover:underline">
                Online Admission
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#newsletter" className="hover:underline">
                Newsletter
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i> {/* Replace with SVG or FontAwesome */}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-6">
        <p>© 2024 City Montessori School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
