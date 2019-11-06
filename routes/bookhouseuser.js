const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  requireAuthentication
} = require("../controllers/bookhouseusercontroller");
const { registerValidator } = require("../validators/bookhousevalidator");

router.post("/register", registerValidator, register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
