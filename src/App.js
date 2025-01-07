import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import { useEffect, useState } from "react";
import About from "./components/Aboutt";
import { Routes, Route } from "react-router-dom";
import { createContext } from "react";
import Testlist from "./components/testlist.js";

const userContext = createContext();
function App() {
  const [mode, setMode] = useState("light");
  const [namee, setNamee] = useState("student1");
  const [tests, setTests] = useState();
  // //fetch tests from server with post request with body having namee=student1
  useEffect(() => {
    console.log("useEffect called");
    fetch("http://localhost:8000/getstudentdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ namee }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTests(data);
      });
  }, [namee]);

  const [text, setText] = useState("");

  return (
    <userContext.Provider
      value={{ namee, setNamee, text, setText, tests, setTests }}
    >
      <Navbar title="TextUtils" mode={mode} setMode={setMode} />
      <div
        className="container-fluid " //add ,margin from top
        style={{
          width: "100vw",
          color: mode === "dark" ? "white" : "#212529",
          backgroundColor: mode === "dark" ? "#212529" : "white",
        }}
      >
        <Testlist />
        {/* <Routes>
          <Route
            path="/"
            element={
              <>
                <h1> Hello </h1>
                <Textform heading="Enter text to be analysed" mode={mode} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes> */}

        {/* <Textform heading="Enter text to be analysed" mode={mode} /> */}
        {/* if endpoint is /about then show <About/>  instead of Textform*/}
      </div>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
