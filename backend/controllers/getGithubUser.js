const User = require("../models/User");
const axios = require("axios");

const getGithubUser = async (req, res) => {
  const { username } = req.body;

  // Normalize the username to lowercase
  const normalizedUsername = username.toLowerCase();

  try {
    // Check if user exists in DB
    let user = await User.findOne({
      username: normalizedUsername,
      soft_deleted: false,
    });

    if (!user) {
      // Fetch data from GitHub API
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const userData = userResponse.data;

      // Save new user to DB
      user = new User({
        username: userData.login.toLowerCase(), // Normalize to lowercase
        avatar_url: userData.avatar_url,
        location: userData.location,
        blog: userData.blog,
        bio: userData.bio,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        repos_url: userData.repos_url,
        followers_url: userData.followers_url,
        following_url: userData.following_url.replace("{/other_user}", ""), // Clean URL
      });

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching or saving user data:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getGithubUser;
