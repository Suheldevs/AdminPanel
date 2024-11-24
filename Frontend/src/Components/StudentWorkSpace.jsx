import React from "react";

const StudentWorkspace = () => {
  return (
    <div className="min-h-[70vh] bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-pink-600 text-white py-4 px-8">
        <h1 className="text-2xl font-bold">Student Workspace</h1>
        <p className="text-gray-200">Stay updated and access your learning resources</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Assignments */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📌 Upcoming Assignments</h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <p>Math Homework - Chapter 5</p>
                <span className="text-sm text-gray-600">Due: Nov 30</span>
              </li>
              <li className="flex justify-between items-center">
                <p>Science Project Proposal</p>
                <span className="text-sm text-gray-600">Due: Dec 2</span>
              </li>
              <li className="flex justify-between items-center">
                <p>English Essay - Draft 1</p>
                <span className="text-sm text-gray-600">Due: Dec 5</span>
              </li>
            </ul>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700">
              View All Assignments
            </button>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🔔 Notifications</h2>
            <ul className="space-y-3">
              <li className="text-gray-600">New announcement: School Sports Day on Dec 15!</li>
              <li className="text-gray-600">Parent-teacher meeting scheduled for Dec 8.</li>
              <li className="text-gray-600">Holiday on Nov 25 for Thanksgiving.</li>
            </ul>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700">
              View All Notifications
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🔗 Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-purple-600 hover:underline"
                >
                  📘 Class Notes - Math
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-600 hover:underline"
                >
                  📝 Submit Assignment - English
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-600 hover:underline"
                >
                  📅 Weekly Timetable
                </a>
              </li>
            </ul>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700">
              Explore Resources
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentWorkspace;
