const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    avatar_url: String,
    location: String,
    blog: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,
    created_at: Date,
    soft_deleted: { type: Boolean, default: false },
    repositories: {
      type: Array,
      default: [],
    },
    repos_url: String, // Store the GitHub repos URL
    followers_url: String, // Store the GitHub followers URL
    following_url: String, // Store the GitHub following URL
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
