import React, { useState, useContext, useEffect, useRef } from "react";
import { userContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

const Testpage = () => {
  const { testnum, questionnum } = useParams();
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { tests, setTests, namee } = context;
  const [elapsedTime, setElapsedTime] = useState(""); // Track elapsed time

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const starttimeRef = useRef(-1);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
        starttimeRef.current = new Date(testdata.starttime);
        //starttimeRef.current = testdata.starttime;
      }
    }
  }, [tests, questionnum, testnum]);

  // Update the timer
  useEffect(() => {
    if (starttimeRef.current !== -1) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const elapsed = Math.floor((currentTime - starttimeRef.current) / 1000); // Elapsed time in seconds
        const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(
          2,
          "0"
        );
        const seconds = String(elapsed % 60).padStart(2, "0");
        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, []);

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
          console.log("Submit the test?");
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

    const handleSubmitClick = async () => {
      //view the result
      try {
        await handleNextClick();
        const testrespone = tests.find(
          (test) => test.testnum === parseInt(testnum)
        );
        //console.log("testrespone : ", testrespone);
        let markedarray = [];

        for (let i = 0; i < testrespone.questions.length; i++) {
          markedarray.push(testrespone.questions[i].marked);
          if (i === testrespone.questions.length - 1) {
            console.log("markedarray : ", markedarray);
            const response = await fetch("http://localhost:8000/endtest", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              //current time
              body: JSON.stringify({
                testnum,
                namee,
                endtime: new Date().toLocaleString(),
                markedarray,
              }),
            });
            if (response.status !== 200) {
              alert("Error in ending test");
            } else {
              const res = await response.json();
              console.log("Test ended successfully");
              console.log("res : ", res);
              let dummytests = [...tests];
              dummytests.find(
                (test) => test.testnum === parseInt(testnum)
              ).finished = true;
              dummytests.find(
                (test) => test.testnum === parseInt(testnum)
              ).finishtime = new Date().toLocaleString();
              dummytests.find(
                (test) => test.testnum === parseInt(testnum)
              ).questions = res.questions; // res.questions is the updated questions array with correct answers and user answers
              await setTests(dummytests);
              //await setTests(dummytests);
              console.log("Finally : ", tests);
              //navigate to home back

              navigate(`/result/${testnum}`, { replace: true }); //replace true
            }
          }
        }
        console.log("view result clicked");
      } catch (err) {
        alert("Error in view result click");
        console.log("Error in view result click : ", err);
      }
    };

    //------------------------------
    const handleQuestionClick = async (questionindex) => {
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
        navigate(`/test/${testnum}/${questionindex}`);
      }
    };
    //------------------------------

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
        <div
          style={{
            position: "fixed",
            top: 0,
            right: isSidebarOpen ? "0px" : "-220px", // Adjust sidebar visibility
            width: "200px",
            height: "100vh",
            backgroundColor: "#f5f5f5",
            borderLeft: "1px solid #ccc",
            transition: "right 0.3s ease",
            zIndex: 1000,
            padding: "10px",
            boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          }}
        >
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            style={{
              position: "absolute",
              top: "60px",
              left: "-90px",
              width: "40px",
              height: "40px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            {isSidebarOpen ? "<<" : ">>"}
          </button>

          {/* Question Numbers */}
          <h3>Questions</h3>
          {testdata.questions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(index)} // Handle question click
              //onClick={() => navigate(`/test/${testnum}/${index}`)} // Navigate to question
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: question.marked !== -1 ? "green" : "white",
                color: question.marked !== -1 ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              Q{index + 1}
            </button>
          ))}
        </div>

        {/* <h1 style={{ textAlign: "center", color: "#333", marginTop: "20px" }}>
          Test Page
        </h1> */}

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
          <h5 style={{ textAlign: "center", color: "#555" }}>
            Test Number: {testnum} | Question Number: {questionnum} | Start time
            : {starttimeRef.current.toLocaleString()}
          </h5>
          {/* <h6 style={{ textAlign: "center", color: "#555" }}>
            Timer: {elapsedTime}
          </h6> */}

          {/* Since total time i am assuming is 3 hours for each test , show remaining time also , updating it each second*/}
          <h6 style={{ textAlign: "center", color: "#555" }}>
            Remaining Time:{" "}
            {(() => {
              const totalSeconds =
                3 * 60 * 60 -
                Math.floor(
                  (new Date() - new Date(starttimeRef.current)) / 1000
                );
              const hours = Math.floor(totalSeconds / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = totalSeconds % 60;
              return `${String(hours).padStart(2, "0")}:${String(
                minutes
              ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            })()}
          </h6>

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
              onClick={
                questionnum < testdata.questions.length - 1
                  ? handleNextClick
                  : handleSubmitClick
              }
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
