const express = require("express");
const router = express.Router();
const {
  decreaseInventory
} = require("../controllers/bookhouseproductcontroller");

const {
  requireAuthentication,
  isAuth,
  isadministrator
} = require("../controllers/bookhouseusercontroller");
const {
  findProfileByUserId,
  addOrdersToUserHistory
} = require("../controllers/bookhouseuserprofilecontroller");
const {
  createOrder,
  listOrders
} = require("../controllers/bookhouseordercontroller");

router.post(
  "/order/create/:bookhouseuserId",
  requireAuthentication,
  isAuth,
  addOrdersToUserHistory,
  decreaseInventory,
  createOrder
);

router.get(
  "/order/list/:bookhouseuserId",
  requireAuthentication,
  isAuth,
  isadministrator,
  listOrders
);

router.param("bookhouseuserId", findProfileByUserId);

module.exports = router;
