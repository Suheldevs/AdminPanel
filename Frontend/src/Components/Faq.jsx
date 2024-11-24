import React, { useState } from "react";

const FaqPage = () => {
  // State to manage which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  // FAQs data
  const faqs = [
    {
      question: "What is the admission process?",
      answer:
        "The admission process includes filling out an application form, submitting necessary documents, and attending an interview or entrance test.",
    },
    {
      question: "What are the school timings?",
      answer:
        "Our school operates from Monday to Friday, 8:00 AM to 3:30 PM. Extra classes and activities are scheduled for Saturdays.",
    },
    {
      question: "How can I contact the school administration?",
      answer:
        "You can reach out to the administration via email at admin@school.com or call us at +1 234 567 890.",
    },
    {
      question: "Are meals provided at school?",
      answer:
        "Yes, we provide healthy and nutritious meals during lunch breaks, and snacks are also available for purchase.",
    },
    {
      question: "Does the school offer extracurricular activities?",
      answer:
        "Yes, we offer a range of extracurricular activities such as sports, music, art, coding, and more.",
    },
  ];

  // Toggle FAQ function
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Find answers to the most commonly asked questions below.
        </p>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left text-gray-800 font-medium text-lg hover:text-blue-600"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
