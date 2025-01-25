import React from "react";
import { useContext } from "react";
import { userContext } from "../App.js";
import { useNavigate } from "react-router-dom";

const Testcard = (props) => {
  const testnum = props.testdata.testnum;
  const scheduled = props.testdata.scheduled;
  const started = props.testdata.started;
  const starttime = props.testdata.starttime;
  const finished = props.testdata.finished;
  const finishtime = props.testdata.finishtime;
  const namee = props.namee;
  const context = useContext(userContext);
  const { tests, setTests } = context;
  const navigate = useNavigate();

  const startclick = async () => {
    //start the test
    console.log("start clicked");
    const response = await fetch("http://localhost:8000/starttest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //current time
      body: JSON.stringify({
        testnum,
        namee,
        starttime: new Date().toLocaleString(),
      }),
    });

    if (response.status !== 200) {
      alert("Error in starting test");
    } else {
      const res = await response.json();
      console.log("Test started successfully");
      console.log("res.questions : ", res.questions);

      let dummytests = [...tests];
      dummytests.find((test) => test.testnum === testnum).started = true;
      dummytests.find((test) => test.testnum === testnum).starttime =
        new Date().toLocaleString();
      dummytests.find((test) => test.testnum === testnum).questions =
        res.questions;
      await setTests(dummytests);
      console.log("Finally : ", tests);
      navigate(`/test/${testnum}/0`);
    }
    //redirect to test page

    //fetch request to start the test
  };

  const continueclick = () => {
    //continue the test
    //console.log("continue clicked");
    navigate(`/test/${testnum}/0`);
  };

  const viewresultclick = async () => {
    navigate(`result/${testnum}`);
    //view the result
    // try {
    //   const testrespone = tests.find((test) => test.testnum === testnum);
    //   let markedarray = [];

    //   let done = false;
    //   for (let i = 0; i < testrespone.questions.length; i++) {
    //     markedarray.push(testrespone.questions[i].marked);
    //     if (i === testrespone.questions.length - 1) {
    //       done = true;
    //     }
    //   }

    //   if (done) {
    //     const response = await fetch("http://localhost:8000/endtest", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       //current time
    //       body: JSON.stringify({
    //         testnum,
    //         namee,
    //         endtime: new Date().toLocaleString(),
    //         markedarray,
    //       }),
    //     });
    //     if (response.status !== 200) {
    //       alert("Error in ending test");
    //     } else {
    //       const res = await response.json();
    //       console.log("Test ended successfully");
    //       console.log("res : ", res);
    //       let dummytests = [...tests];
    //       dummytests.find((test) => test.testnum === testnum).finished = true;
    //       dummytests.find((test) => test.testnum === testnum).finishtime =
    //         new Date().toLocaleString();
    //       dummytests.find((test) => test.testnum === testnum).questions =
    //         res.questions; // res.questions is the updated questions array with correct answers and user answers
    //       await setTests(dummytests);
    //       console.log("Finally : ", tests);
    //       //navigate(`/test/${testnum}/result`);
    //     }
    //   }

    //   console.log("view result clicked");
    // } catch (err) {
    //   alert("Error in view result click");
    //   console.log("Error in view result click : ", err);
    // }
  };
  //link to different test page for each test based on finished or not
  return (
    <>
      <div className="card">
        <div className="card-header">Jee-Test</div>
        <div className="card-body">
          <h5 className="card-title">Test No. {testnum}</h5>
          <p className="card-text">
            Scheduled: {scheduled} <br />
            {started ? `Started at ${starttime}` : "Not Started"}
            <br />
            {started && finished ? `Finished at ${finishtime}` : ""}
          </p>
          {started && finished ? (
            <button onClick={viewresultclick} className="btn btn-primary">
              View Result
            </button>
          ) : started ? (
            <button onClick={continueclick} className="btn btn-primary">
              Continue
            </button>
          ) : (
            <button onClick={startclick} className="btn btn-primary">
              Start
            </button>
          )}
          {/* <Link to={`/test/${testnum}/0`} className="btn btn-primary">
            {finished ? "View Result" : started ? "Continue" : "Start"}
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Testcard;
