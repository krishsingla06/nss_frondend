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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Page</h1>

        {/* Tests Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tests</h2>
          {testsadmin?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testsadmin.map((test) => (
                <button
                  key={test.testnum}
                  onClick={() => handleTestClick(test.testnum)}
                  className="bg-blue-500 text-black font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-200"
                >
                  Test {test.testnum} (Scheduled: {test.scheduled})
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tests available.</p>
          )}
        </section>

        <button>
          <Link
            to="/admin/addtest"
            className="bg-blue-500 text-black font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-200"
          >
            Add Test
          </Link>
        </button>

        {/* Users Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
          {userlist?.length > 0 ? (
            <ul className="space-y-2">
              {userlist.map((user) => (
                <li
                  key={user.username}
                  className="bg-gray-200 p-3 rounded-md flex justify-between items-center"
                >
                  <span className="font-medium">{user.username}</span>
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
