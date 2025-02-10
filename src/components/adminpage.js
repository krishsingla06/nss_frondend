import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import "D:/my-app/src/components/style.css";

const Adminpage = () => {
  const { testsadmin, userlist } = useContext(userContext);
  const navigate = useNavigate();

  const handleTestClick = (testnum) => {
    navigate(`/admin/test/${testnum}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-mint-200 to-lavender-300 p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/95 shadow-2xl rounded-2xl p-10 space-y-10 backdrop-blur-lg">
        {/* Animated Header */}
        <h1 className="text-5xl font-extrabold text-center mb-8 animate-float">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-600">
            Admin Dashboard
          </span>
        </h1>

        {/* Tests Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            <span className="pb-2 border-b-4 border-gradient-to-r from-indigo-400 to-teal-400">
              Manage Tests
            </span>
          </h2>
          {testsadmin?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {testsadmin.map((test) => (
                <button
                  type="button"
                  class="btn btn-outline-primary m-1"
                  key={test.testnum}
                  onClick={() => handleTestClick(test.testnum)}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 text-lg tracking-wide">
                    Test {test.testnum}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-xl font-medium">
              No tests available.
            </p>
          )}
        </section>

        <div className="flex justify-start px-4 md:ml-[16.666%] lg:ml-0 w-full">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => navigate("/admin/addtest")}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 text-lg tracking-wide">
              Add New Test
            </span>
          </button>
        </div>

        {/* Users Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            <span className="pb-2 border-b-4 border-gradient-to-r from-teal-400 to-indigo-400">
              Users List
            </span>
          </h2>
          {userlist?.length > 0 ? (
            <ul className="space-y-1">
              {userlist.map((user) => (
                <li
                  key={user.username}
                  className="bg-white p-1 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-between items-center border-l-4 border-teal-400 hover:border-indigo-500 group"
                >
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 text-lg tracking-wide">
                      {user.username}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center text-xl font-medium">
              No users available.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Adminpage;
