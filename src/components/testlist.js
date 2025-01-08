import React from "react";
import { useContext } from "react";
import { userContext } from "../App.js";
import Testcard from "./testcard.js";

const Testlist = () => {
  const context = useContext(userContext);
  const { tests, namee } = context;
  //console.log(tests);
  if (tests === null) {
    return <div>Loading...</div>;
  }
  const studentdata = tests;
  //console.log(studentdata);
  //render the list of testcards , with sending each test card with testdata as props with unique key

  return (
    <div>
      {studentdata.map((test, index) => {
        return <Testcard key={index} testdata={test} namee={namee} />;
      })}
    </div>
  );
};

export default Testlist;
