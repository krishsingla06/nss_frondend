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
      const studentdata = tests.studentdata;
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
    const studentdata = tests.studentdata;
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
      // Handle next button click
      if (selectedOption === null) {
        //alert("Please select an option!");
        // console.log("Please select an option!");
        // const nextQuestionNum = parseInt(questionnum) + 1;
        // if (nextQuestionNum < testdata.questions.length) {
        //   navigate(`/test/${testnum}/${nextQuestionNum}`);
        // } else {
        //   alert("Submit the test?");
        //   navigate(`/test/${testnum}/result`);
        // }
        // return;
        setSelectedOption(-1);
      }

      await (async () =>
        (dummytests.studentdata.find(
          (test) => test.testnum === parseInt(testnum)
        ).questions[parseInt(questionnum)].marked = selectedOption
          ? selectedOption
          : -1))();

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
          selectedOption: selectedOption ? selectedOption : -1,
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
      // Handle next button click
      // if (selectedOption === null) {
      //   // const prevQuestionNum = parseInt(questionnum) - 1;
      //   // navigate(`/test/${testnum}/${prevQuestionNum}`);
      //   // return;
      //   setSelectedOption(-1);
      // }

      // Update the selected option in the testdata
      await (async () =>
        (dummytests.studentdata.find(
          (test) => test.testnum === parseInt(testnum)
        ).questions[parseInt(questionnum)].marked = selectedOption
          ? selectedOption
          : -1))();

      await setTests(dummytests);
      //testdata.questions[parseInt(questionnum)].selectedOption = selectedOption;
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
          selectedOption: selectedOption ? selectedOption : -1,
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
      <div>
        <h1>Test Page</h1>
        <h2>Test Number: {testnum}</h2>
        <h2>Question Number: {questionnum}</h2>
        <p>{testdata.questions[parseInt(questionnum)].q}</p>
        {testdata.questions[parseInt(questionnum)].options.map(
          (option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)} // Handle button click
              style={{
                backgroundColor: selectedOption === index ? "green" : "white",
                color: selectedOption === index ? "white" : "black",
                border: "1px solid #ccc",
                padding: "10px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          )
        )}
        {questionnum > 0 && <button onClick={handlePrevClick}>Previous</button>}

        <button onClick={handleNextClick}>
          {questionnum < testdata.questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    );
  }
};

export default Testpage;
