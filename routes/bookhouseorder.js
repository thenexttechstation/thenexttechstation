const express = require("express");
const router = express.Router();

const {
  requireAuthentication,
  isAuth
} = require("../controllers/bookhouseusercontroller");
const {
  findProfileByUserId
} = require("../controllers/bookhouseuserprofilecontroller");
const { createOrder } = require("../controllers/bookhouseordercontroller");

router.post(
  "/order/create/:bookhouseuserId",
  requireAuthentication,
  isAuth,
  createOrder
);

router.param("bookhouseuserId", findProfileByUserId);

module.exports = router;
