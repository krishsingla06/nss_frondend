import React from "react";
import { useContext } from "react";
import { userContext } from "../App";

const About = () => {
  const context = useContext(userContext);
  context.setNamee("Vaishali");
  return <div>This is about page {context.namee}</div>;
};

export default About;
