import React from "react";

const AdminMain = () => {
  return (
    <div className="min-h-[90vh] bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">School Admin Dashboard</h1>
         
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Students */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Students</h2>
            <p className="text-3xl font-bold text-gray-600 mt-2">120</p>
          </div>

          {/* Card 2: Total Teachers */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Teachers</h2>
            <p className="text-3xl font-bold text-gray-600 mt-2">9</p>
          </div>

          {/* Card 3: Total Classes */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Total Classes</h2>
            <p className="text-3xl font-bold text-gray-600 mt-2">8</p>
          </div>

          {/* Card 4: Upcoming Events */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <p className="text-xl text-gray-600 mt-2">2 this week</p>
          </div>
        </div>

        {/* Recent Activities Table */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-gray-600">Activity</th>
                  <th className="text-left py-3 px-4 text-gray-600">User</th>
                  <th className="text-left py-3 px-4 text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Student Enrollment</td>
                  <td className="py-3 px-4 text-gray-700">Admin</td>
                  <td className="py-3 px-4 text-gray-700">2024-11-26</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Grade Report Uploaded</td>
                  <td className="py-3 px-4 text-gray-700">Teacher A</td>
                  <td className="py-3 px-4 text-gray-700">2024-11-25</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Event Announcement</td>
                  <td className="py-3 px-4 text-gray-700">Admin</td>
                  <td className="py-3 px-4 text-gray-700">2024-11-24</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMain;
