import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Repositories.css";

const Repositories = () => {
  const { username } = useParams(); // Get username from URL
  const [userDetails, setUserDetails] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://autonomize-assignment-lfuk.vercel.app/api/users/repositories/${username}`
        );
        setUserDetails(response.data.user);
        setRepositories(response.data.repositories);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data!");
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="repositories">
      {userDetails && (
        <div className="user-details">
          <img src={userDetails.avatar_url} alt={userDetails.username} />
          <h2>{userDetails.username}</h2>
          <p>{userDetails.bio}</p>
          <p>Location: {userDetails.location || "N/A"}</p>
          <p>Blog: {userDetails.blog || "N/A"}</p>
          <p>Followers: {userDetails.followers}</p>
          <p>Following: {userDetails.following}</p>
        </div>
      )}
      <div className="repo-list">
        <h3>Repositories</h3>
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <div key={repo.id} className="repo">
              <h4>{repo.name}</h4>
              <p>{repo.description || "No description available"}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View Repository
              </a>
            </div>
          ))
        ) : (
          <p>No repositories found</p>
        )}
      </div>
    </div>
  );
};

export default Repositories;
