const express = require("express");
const router = express.Router();
const {
  requireAuthentication,
  isAuth,
  isadministrator
} = require("../controllers/bookhouseusercontroller");
const {
  findProfileByUserId,
  getsingleUser,
  updateUser
} = require("../controllers/bookhouseuserprofilecontroller");

router.get(
  "/token/:bookhouseuserId",
  requireAuthentication,
  isAuth,
  isadministrator,
  (request, response) => {
    response.json({
      bookhouseuser: request.profile
    });
  }
);
router.get(
  "/bookhouseuser/:bookhouseuserId",
  requireAuthentication,
  isAuth,
  isadministrator,
  getsingleUser
);
router.put(
  "/bookhouseuser/update/:bookhouseuserId",
  requireAuthentication,
  isAuth,
  isadministrator,
  updateUser
);
router.param("bookhouseuserId", findProfileByUserId);
module.exports = router;
