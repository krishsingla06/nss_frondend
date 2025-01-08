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
    const res = await fetch("http://localhost:8000/starttest", {
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
    if (res.status !== 200) {
      alert("Error in starting test");
    } else {
      console.log("Test started successfully");

      let dummytests = tests;
      dummytests.studentdata.find(
        (test) => test.testnum === testnum
      ).started = true;
      dummytests.studentdata.find(
        (test) => test.testnum === testnum
      ).starttime = new Date().toLocaleString();
      dummytests.studentdata.find(
        (test) => test.testnum === testnum
      ).questions = res.questionsandoptions;
      await setTests(dummytests);
      console.log("Finally : ", tests);
      navigate(`/test/${testnum}/0`);
    }
    //redirect to test page

    //fetch request to start the test
  };

  const continueclick = () => {
    //continue the test
    console.log("continue clicked");
  };

  const viewresultclick = () => {
    //view the result
    console.log("view result clicked");
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
