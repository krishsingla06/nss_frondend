import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

const Testpage = () => {
  const { testnum, questionnum } = useParams();
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { tests, setTests } = context;

  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  useEffect(() => {
    if (tests) {
      const studentdata = tests;
      const testdata = studentdata.find(
        (test) => test.testnum === parseInt(testnum)
      );
      if (testdata) {
        const markedOption = testdata.questions[parseInt(questionnum)].marked;
        setSelectedOption(markedOption);
      }
    }
  }, [tests, questionnum, testnum]);

  if (!tests) {
    return <div>Loading...</div>;
  } else {
    let dummytests = tests;
    const studentdata = tests;

    const testdata = studentdata.find(
      (test) => test.testnum === parseInt(testnum)
    );

    if (!testdata) {
      return <div>Test not found!</div>;
    }

    const handleOptionClick = (index) => {
      if (selectedOption === index) {
        setSelectedOption(null); // Deselect the option
      } else {
        setSelectedOption(index); // Update the selected option
      }
    };

    const handleNextClick = async () => {
      await (async () =>
        (dummytests.find(
          (test) => test.testnum === parseInt(testnum)
        ).questions[parseInt(questionnum)].marked =
          selectedOption !== null ? selectedOption : -1))();

      await setTests(dummytests);

      //make an api call to save the selected option
      const apiresponse = await fetch("http://localhost:8000/saveresponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namee: context.namee,
          testnum: parseInt(testnum),
          questionnum: parseInt(questionnum),
          selectedOption: selectedOption !== null ? selectedOption : -1,
        }),
      });

      if (apiresponse.status !== 200) {
        alert("Error in saving response");
      } else {
        console.log("Response saved successfully");
        const nextQuestionNum = parseInt(questionnum) + 1;
        if (nextQuestionNum < testdata.questions.length) {
          navigate(`/test/${testnum}/${nextQuestionNum}`);
        } else {
          alert("Submit the test?");
          navigate(`/test/${testnum}/result`);
        }
      }
    };

    const handlePrevClick = async () => {
      await (async () =>
        (dummytests.find(
          (test) => test.testnum === parseInt(testnum)
        ).questions[parseInt(questionnum)].marked =
          selectedOption !== null ? selectedOption : -1))();

      await setTests(dummytests);
      const apiresponse = await fetch("http://localhost:8000/saveresponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namee: context.namee,
          testnum: parseInt(testnum),
          questionnum: parseInt(questionnum),
          selectedOption: selectedOption !== null ? selectedOption : -1,
        }),
      });

      if (apiresponse.status !== 200) {
        alert("Error in saving response");
      } else {
        console.log("Response saved successfully");
        const prevQuestionNum = parseInt(questionnum) - 1;
        navigate(`/test/${testnum}/${prevQuestionNum}`);
      }
    };

    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333", marginTop: "20px" }}>
          Test Page
        </h1>
        <div
          style={{
            width: "95%",
            //maxWidth: "1000px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#555" }}>
            Test Number: {testnum} | Question Number: {questionnum}
          </h2>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <p style={{ fontSize: "18px", color: "#333", textAlign: "center" }}>
              {testdata.questions[parseInt(questionnum)].q}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {testdata.questions[parseInt(questionnum)].options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)} // Handle button click
                  style={{
                    backgroundColor:
                      selectedOption === index ? "#4CAF50" : "#fff",
                    color: selectedOption === index ? "#fff" : "#333",
                    border: "1px solid #ccc",
                    padding: "15px 20px",
                    margin: "10px 0",
                    cursor: "pointer",
                    borderRadius: "8px",
                    boxShadow:
                      selectedOption === index
                        ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                        : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    fontSize: "16px",
                    width: "100%", // Full width for option buttons
                  }}
                >
                  {option}
                </button>
              )
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              width: "100%",
            }}
          >
            {
              <button
                onClick={handlePrevClick}
                style={{
                  padding: "8px 15px", // Smaller padding
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  width: "auto", // Let the button size based on content
                  fontSize: "14px", // Smaller font size
                }}
                {...(questionnum === "0" && {
                  disabled: true,
                  style: {
                    padding: "8px 15px", // Smaller padding
                    backgroundColor: "#ccc", // Lighter background color
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "not-allowed",
                    transition: "background-color 0.3s",
                    width: "auto", // Let the button size based on content
                    fontSize: "14px", // Smaller font size
                  },
                })}
              >
                Previous
              </button>
            }

            <button
              onClick={handleNextClick}
              style={{
                padding: "8px 15px", // Smaller padding
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                width: "auto", // Let the button size based on content
                fontSize: "14px", // Smaller font size
              }}
            >
              {questionnum < testdata.questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      </div>

      // <div>
      //   <h1>Test Page</h1>
      //   <h2>Test Number: {testnum}</h2>
      //   <h2>Question Number: {questionnum}</h2>
      //   <p>{testdata.questions[parseInt(questionnum)].q}</p>
      //   {testdata.questions[parseInt(questionnum)].options.map(
      //     (option, index) => (
      //       <button
      //         key={index}
      //         onClick={() => handleOptionClick(index)} // Handle button click
      //         style={{
      //           backgroundColor: selectedOption === index ? "green" : "white",
      //           color: selectedOption === index ? "white" : "black",
      //           border: "1px solid #ccc",
      //           padding: "10px",
      //           margin: "5px",
      //           cursor: "pointer",
      //         }}
      //       >
      //         {option}
      //       </button>
      //     )
      //   )}
      //   {questionnum > 0 && <button onClick={handlePrevClick}>Previous</button>}

      //   <button onClick={handleNextClick}>
      //     {questionnum < testdata.questions.length - 1 ? "Next" : "Submit"}
      //   </button>
      // </div>
    );
  }
};

export default Testpage;
