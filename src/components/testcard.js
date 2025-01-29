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

  //function to check if current time is greater than scheduled time or not

  const checkScheduledTime = () => {
    const scheduledTime = new Date(scheduled);
    const currentTime = new Date();
    return currentTime < scheduledTime;
  };

  const startclick = async () => {
    let starttimee = new Date().toLocaleString();
    console.log("scheduled : ", scheduled);
    console.log("starttimee : ", starttimee);
    if (starttimee > scheduled) {
      starttimee = scheduled;
    }
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
        starttime: starttimee,
        //starttime: new Date().toLocaleString(),
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
    if (checkTimeLimit()) {
      alert("Time limit exceeded. You cannot continue the test.");
      //set the test as finished and finished time as start time + 3 hours

      const dummytests = [...tests];
      dummytests.find((test) => test.testnum === testnum).finished = true;
      dummytests.find((test) => test.testnum === testnum).finishtime = new Date(
        new Date(starttime).getTime() + 3 * 60 * 60 * 1000
      ).toLocaleString();
      setTests(dummytests);
      navigate(`/result/${testnum}`);
      return;
    }
    navigate(`/test/${testnum}/0`);
  };

  const viewresultclick = async () => {
    navigate(`result/${testnum}`);
  };

  // Check if more than 3 hours have passed since the test start time
  const checkTimeLimit = () => {
    const startTime = new Date(starttime);
    const currentTime = new Date();
    const timeDifference = (currentTime - startTime) / (1000 * 60 * 60); // time in hours
    return timeDifference > 3;
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
            <button
              onClick={startclick}
              disabled={checkScheduledTime()}
              className="btn btn-primary"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Testcard;
