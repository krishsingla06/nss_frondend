import React from "react";
//import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../App";

const Textform = (props) => {
  //   const [text, setText] = useState("");
  const context = useContext(userContext);
  const { text, setText } = context;
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleOnClickUppercase = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleOnClickLowercase = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleClearText = () => {
    let newText = "";
    setText(newText);
  };

  return (
    <>
      <h1
        htmlFor="exampleTextarea"
        className="form-label"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        {props.heading}
      </h1>
      <textarea
        className="form-control"
        id="exampleTextarea"
        rows="16"
        style={{
          resize: "vertical",
          overflow: "auto",
          borderWidth: "3px",
          fontWeight: "bold",
          color: props.mode === "dark" ? "white" : "black",
          backgroundColor: props.mode === "dark" ? "#212529" : "white",
          fontSize: "1.2rem",
        }} // Allows resizing and scrolling
        value={text}
        onChange={handleOnChange}
      ></textarea>
      <button className="btn btn-primary my-3" onClick={handleOnClickUppercase}>
        Convert to UpperCase
      </button>
      <button
        className="btn btn-primary my-3 mx-3"
        onClick={handleOnClickLowercase}
      >
        Convert to LowerCase
      </button>

      <button className="btn btn-primary my-3" onClick={handleClearText}>
        Clear Text
      </button>

      <h2>Text Summary</h2>
      <p>
        {text.split(" ").filter((element) => element.length !== 0).length} words
        and{" "}
        {text.length -
          text.split(" ").filter((element) => element.length === 0).length >=
        0
          ? text.length -
            text.split(" ").filter((element) => element.length === 0).length
          : 0}{" "}
        characters
      </p>

      <h2>Preview</h2>
      <p>{text.length > 0 ? text : "Enter something in the textbox above"}</p>
    </>
  );
};

export default Textform;
