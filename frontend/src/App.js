import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Repositories from "./components/Repositories/Repositories.jsx";
// import RepositoryDetails from "./components/RepositoryDetails";
// import Followers from "./components/Followers";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home setUser={setUser} setRepositories={setRepositories} />}
        />
        <Route
          path="/repositories/:username"
          element={<Repositories user={user} repositories={repositories} />}
        />
        {/* <Route path="/repository/:repoName" element={<RepositoryDetails />} />
        <Route
          path="/followers/:username"
          element={
            <Followers setUser={setUser} setRepositories={setRepositories} />
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
