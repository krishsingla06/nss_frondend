import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import { useEffect, useState } from "react";
import About from "./components/Aboutt";
import { Routes, Route } from "react-router-dom";
import { createContext } from "react";
import Testlist from "./components/testlist.js";
import TestPage from "./components/testpage.js";

const userContext = createContext();
function App() {
  const [mode, setMode] = useState("light");
  const [namee, setNamee] = useState("student1");
  const [tests, setTests] = useState(null);
  // //fetch tests from server with post request with body having namee=student1
  useEffect(() => {
    //async () => {
    let ignore = false;
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
        console.log("Data received");
        console.log(data);
        if (!ignore) setTests(data);
      });
    return () => {
      ignore = true;
    };
  }, [namee]);

  const [text, setText] = useState("");

  return (
    <userContext.Provider
      value={{ namee, setNamee, text, setText, tests, setTests }}
    >
      <Navbar title="JEE Wallah" mode={mode} setMode={setMode} />
      <div
        className="container-fluid " //add ,margin from top
        style={{
          width: "100vw",
          color: mode === "dark" ? "white" : "#212529",
          backgroundColor: mode === "dark" ? "#212529" : "white",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1> Hello </h1>
                <Testlist />
                {/* <Textform heading="Enter text to be analysed" mode={mode} /> */}
              </>
            }
          />
          <Route path="/test/:testnum/:questionnum" element={<TestPage />} />
        </Routes>

        {/* <Textform heading="Enter text to be analysed" mode={mode} /> */}
        {/* if endpoint is /about then show <About/>  instead of Textform*/}
      </div>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
