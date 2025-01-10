const User = require("../models/User");
const axios = require("axios");

const getUserRepositories = async (req, res) => {
  const { username } = req.params;

  try {
    // Find user by username
    const user = await User.findOne({
      username: username.toLowerCase(),
      soft_deleted: false,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch repositories only if not already stored
    if (!user.repositories || user.repositories.length === 0) {
      const reposResponse = await axios.get(user.repos_url);
      user.repositories = reposResponse.data;
      await user.save();
    }

    // Return user details and repositories
    res.status(200).json({
      user: {
        avatar_url: user.avatar_url,
        username: user.username,
        location: user.location,
        blog: user.blog,
        bio: user.bio,
        public_repos: user.public_repos,
        public_gists: user.public_gists,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
      },
      repositories: user.repositories,
    });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserRepositories;
