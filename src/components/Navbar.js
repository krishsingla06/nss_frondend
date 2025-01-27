import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    // Redirect to login page
    window.location.href = "/login";
  };
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg ${
          props.mode === "dark"
            ? "bg-dark navbar-dark"
            : "bg-light navbar-light"
        }`}
        style={{ border: "1px solid white" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">{props.title}</div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <button
                className="btn btn-primary"
                style={{
                  color: "white",
                  height: "38px",
                  width: "100px",
                  marginLeft: "1000px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleLogout} // Call the logout function on click
              >
                Logout
              </button>
            </ul>
            {/* <div className="form-check form-switch ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={() => {
                  // Toggle logic for dark/light mode here
                  props.setMode(props.mode === "dark" ? "light" : "dark");
                }}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
                style={{ color: props.mode === "dark" ? "white" : "black" }}
              >
                {props.mode === "dark" ? "Dark Mode" : "Light Mode"}
              </label>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

// const Navbar = (props) => {
//   return (
//     <div>
//       <nav className={`navbar navbar-expand-lg bg-body-tertiary`}>
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">
//             {props.title}
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="/">
//                   Home
//                 </a>
//               </li>
//               <li className="nav -item">
//                 <a className="nav-link" href="/">
//                   About
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["light", "dark"]), // Restrict mode to 'light' or 'dark'
};

export default Navbar;
