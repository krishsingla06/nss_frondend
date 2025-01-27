import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import { useEffect, useState } from "react";
import About from "./components/Aboutt";
import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext } from "react";
import Testlist from "./components/testlist.js";
import TestPage from "./components/testpage.js";
import Result from "./components/result.js";
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import AdminPage from "./components/adminpage.js";
import TestDetail from "./components/TestDetail.js";
import Addtest from "./components/Addtest.js";

const userContext = createContext();
function App() {
  const [mode, setMode] = useState("light");
  const [namee, setNamee] = useState(null);
  const [tests, setTests] = useState(null);
  const [testsadmin, setTestsadmin] = useState(null);
  const [userlist, setUserlist] = useState(null);
  const [role, setRole] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken")); // Get token from localStorage
  const navigate = useNavigate();
  // //fetch tests from server with post request with body having namee=student1
  useEffect(() => {
    setRole(localStorage.getItem("role"));
    if (role === "student") {
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
          if (!ignore) setTests(data.studentdata);
        });
      return () => {
        ignore = true;
      };
    } else {
      let ignore = false;
      console.log("useEffect called");
      fetch("http://localhost:8000/getadmindata", {
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
          if (!ignore) {
            setTestsadmin(data.admindata);
            setUserlist(data.userlist);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [namee, role]);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken")); // Get token from localStorage
    if (!authToken) {
      // If no token found, allow navigation to login or signup
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        navigate("/login"); // Redirect to login page if no token and not visiting login/signup
      }
    } else {
      // If token found, allow navigation to all pages
      setNamee(localStorage.getItem("username"));
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      ) {
        if (role === "student") navigate("/");
        // Redirect to home page if token is found and visiting login/signup
        else navigate("/admin");
      }
    }
  }, [authToken, navigate, role]);

  const [text, setText] = useState("");

  return (
    <userContext.Provider
      value={{
        namee,
        setNamee,
        text,
        setText,
        tests,
        setTests,
        role,
        setRole,
        testsadmin,
        setTestsadmin,
        userlist,
        setUserlist,
      }}
    >
      <Navbar title="JEE Wallah" mode={mode} setMode={setMode} />
      <div
        className="container-fluid " //add ,margin from top
        style={{
          width: "100vw", // Full width
          height: "100vh", // Full height
          marginTop: "20px", // Add margin from the top
          display: "flex",
          flexDirection: "column", // Ensure content fills the vertical space
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1> Hello {namee}</h1>
                <Testlist />
                {/* <Textform heading="Enter text to be analysed" mode={mode} /> */}
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/test/:testnum/:questionnum" element={<TestPage />} />
          <Route path="/result/:testnum" element={<Result />} />
          <Route
            path="/admin"
            element={
              <>
                <h1>Hello {namee}</h1>
                <AdminPage />
              </>
            }
          />
          <Route path="/admin/test/:testnum" element={<TestDetail />} />
          <Route path="admin/addtest" element={<Addtest />} />
        </Routes>

        {/* <Textform heading="Enter text to be analysed" mode={mode} /> */}
        {/* if endpoint is /about then show <About/>  instead of Textform*/}
      </div>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
