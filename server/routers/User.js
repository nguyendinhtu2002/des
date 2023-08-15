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
  getUserIsNhanVien,
  getUserIsGuest,
  toltalMoneyGuest,
} = require("../controller/UserController");
const { protect } = require("../middleware/AuthMiddleware");
const { getByGuest } = require("../controller/JobController");
const router = express.Router();

router.get("/toltalMoneyGuest",toltalMoneyGuest)
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
router.get("/getNhanVien/getAll",getUserIsNhanVien)
router.get("/getGuest/getAll",getUserIsGuest)
module.exports = router;
