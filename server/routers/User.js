const express = require("express");
const {
  register,
  loginUser,
  loginGuest,
  getUserById,
  getAll,
  updateAccount,
  RefreshTokenController,
  loginAdmin,
  detelteAccount,
  userisCustomer,
  toltalMoneyUser,
} = require("../controller/UserController");
const { protect } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.post("/loginGuest", loginGuest);
router.get("/getAll", getAll);
router.get("/:_id", getUserById);
router.post("/updateAccount/:id", updateAccount);
router.post("/refresh_token", RefreshTokenController);
router.delete("/delete/:id",detelteAccount)
router.get("/getAll/iscustomer", userisCustomer);
router.get("/totalMoney/dashboard/admin",toltalMoneyUser)
module.exports = router;
