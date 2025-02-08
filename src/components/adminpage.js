import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Adminpage = () => {
  const { testsadmin, userlist } = useContext(userContext);
  const navigate = useNavigate();

  const handleTestClick = (testnum) => {
    // Navigate to a detailed view of the selected test
    navigate(`/admin/test/${testnum}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-yellow-300 to-blue-400 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* Tests Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-purple-800">
            Manage Tests
          </h2>
          {testsadmin?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testsadmin.map((test) => (
                <button
                  key={test.testnum}
                  onClick={() => handleTestClick(test.testnum)}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 focus:outline-none transition-all duration-300 transform hover:scale-105"
                >
                  Test {test.testnum} (Scheduled: {test.scheduled})
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tests available.</p>
          )}
        </section>

        <div className="text-center">
          <Link
            to="/admin/addtest"
            className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 focus:outline-none transition-all duration-300"
          >
            Add Test
          </Link>
        </div>

        {/* Users Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-teal-800">Manage Users</h2>
          {userlist?.length > 0 ? (
            <ul className="space-y-4">
              {userlist.map((user) => (
                <li
                  key={user.username}
                  className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-green-200 hover:to-teal-200 transition-all duration-200 flex justify-between items-center"
                >
                  <span className="font-medium text-lg text-teal-800">
                    {user.username}
                  </span>
                  <span className="text-sm text-gray-600">
                    ID: {user.username}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No users available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Adminpage;
