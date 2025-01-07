import React from "react";
import { useContext } from "react";
import { userContext } from "../App.js";
import Testcard from "./testcard.js";

const Testlist = () => {
  const context = useContext(userContext);
  const tests = context;
  console.log(tests);
  //render the list of testcards , with sending each test card with testdata as props

  return (
    <div>
      <Testcard />
    </div>
  );
};

export default Testlist;
