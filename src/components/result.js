import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../App";

const Result = () => {
  const { testnum } = useParams();
  const context = useContext(userContext);
  const { tests } = context;

  // Find the test data using testnum
  const test = tests.find((test) => test.testnum === parseInt(testnum));

  console.log("Test : ", test);

  let total = 0;

  // Calculate the total correct answers
  test.questions.forEach((question) => {
    if (question.ans === question.marked) {
      total++;
    }
  });

  console.log("Total : ", total);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Result</h1>
      <h2>Test Number : {testnum}</h2>
      <h2>Total Questions : {test.questions.length}</h2>
      <h2>Correct Answers : {total}</h2>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        {test.questions.map((question, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor:
                question.ans === question.marked ? "#d4edda" : "#f8d7da",
              color: question.ans === question.marked ? "#155724" : "#721c24",
            }}
          >
            <p>
              <strong>Q{index + 1}: </strong>
              {question.q}
            </p>
            <ul>
              {question.options.map((option, idx) => (
                <li
                  key={idx}
                  style={{
                    fontWeight: option === question.ans ? "bold" : "normal",
                    textDecoration:
                      option === question.marked ? "underline" : "none",
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p>
              <strong>Marked:</strong> {question.marked}
            </p>
            <p>
              <strong>Correct Answer:</strong> {question.ans}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
