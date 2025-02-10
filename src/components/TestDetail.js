import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";

const TestDetail = () => {
  const { testnum } = useParams();
  const { testsadmin } = useContext(userContext); 

  console.log("Test ID: ", testnum);
  console.log("Tests Admin: ", testsadmin);

  const test = testsadmin?.find((test) => test.testnum === parseInt(testnum));

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-xl font-semibold text-red-500">
          Test not found. Please check the URL or try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Test {test.testnum} (Scheduled: {test.scheduled})
        </h1>
        <ul className="space-y-4">
          {test.questions.map((question, index) => (
            <li key={index} className="bg-gray-200 p-4 rounded-md shadow-inner">
              <p className="font-medium text-lg mb-2">
                Q{index + 1}: {question.q}
              </p>
              <ul className="ml-4 mt-2 list-decimal">
                {question.options.map((option, idx) => (
                  <li key={idx} className="text-gray-700">
                    {option}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-2">
                Correct Answer: Option {question.ans + 1}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestDetail;
