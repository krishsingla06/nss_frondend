import React from "react";
import { Link } from "react-router-dom";

const testcard = (props) => {
  const testnum = props.testdata.testnum;
  const scheduled = props.testdata.scheduled;
  const started = props.testdata.started;
  const starttime = props.testdata.starttime;
  const finished = props.testdata.finished;
  const finishtime = props.testdata.finishtime;
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
          <Link to={`/test/${testnum}`} className="btn btn-primary">
            {finished ? "View Result" : started ? "Continue" : "Start"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default testcard;
