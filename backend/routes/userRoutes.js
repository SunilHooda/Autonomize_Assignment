const express = require("express");
const getGithubUser = require("../controllers/getGithubUser");
const getUserRepositories = require("../controllers/getUserRepositories");

const router = express.Router();

router.post("/getUser", getGithubUser);
router.get("/repositories/:username", getUserRepositories);

module.exports = router;
