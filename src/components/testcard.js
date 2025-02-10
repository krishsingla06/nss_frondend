import React from "react";
import { useContext } from "react";
import { userContext } from "../App.js";
import { useNavigate } from "react-router-dom";

const Testcard = (props) => {
  const testnum = props.testdata.testnum;
  const scheduled = props.testdata.scheduled;
  const started = props.testdata.started;
  let starttime = props.testdata.starttime;
  const finished = props.testdata.finished;
  const finishtime = props.testdata.finishtime;
  const namee = props.namee;
  const context = useContext(userContext);
  const { tests, setTests } = context;
  const navigate = useNavigate();


  const checkScheduledTime = () => {
    const scheduledTime = new Date(scheduled);
    const currentTime = new Date();
    return currentTime < scheduledTime;
  };

  const startclick = async () => {
    let starttimee = new Date();
    let scheduledd = new Date(scheduled);
    console.log("scheduledd : ", scheduledd);
    console.log("starttimee : ", starttimee);
    if (starttimee > scheduledd) {
      console.log("starttimee > scheduledd");
      starttime = scheduledd.toLocaleString();
    } else {
      console.log("starttimee < scheduledd");
      starttime = starttimee.toLocaleString();
    }
    console.log("start clicked");
    console.log("starttime : ", starttime);
    const response = await fetch("http://localhost:8000/starttest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        testnum,
        namee,
        starttime: starttime,
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
      dummytests.find((test) => test.testnum === testnum).starttime = starttime;
      dummytests.find((test) => test.testnum === testnum).questions =
        res.questions;
      await setTests(dummytests);
      console.log("Finally : ", tests);
      navigate(`/test/${testnum}/0`);
    }
  };

  const continueclick = () => {
    if (checkTimeLimit()) {
      alert("Time limit exceeded. You cannot continue the test.");
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

  const checkTimeLimit = () => {
    const startTime = new Date(starttime);
    const currentTime = new Date();
    const timeDifference = (currentTime - startTime) / (1000 * 60 * 60); // time in hours
    return timeDifference > 3;
  };
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
