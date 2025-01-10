import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ setUser, setRepositories }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/getUser`,
        { username }
      );

      console.log(response.data);
      setUser(response.data.user);
      setRepositories(response.data.repositories);
      navigate(`/repositories/${username}`);
    } catch (error) {
      alert("User not found!");
    }
  };

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
