const express = require("express");
const {
  createJob,
  getJob,
  getAllJobs,
  updateStatus,
  getJobByStatus,
  deleteJob,
  updateJob,
  getJobByUser,
  cancelJob,
  deleteImg,
  updateOrder,
  getByGuest,
  updateGuest,
  updateByAdmin,
  getTotalPrice,
  getStatusCountByDesign,
  getStatusCountByDesigner,
} = require("../controller/JobController");
const { protect, user, guest, admin } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/createJob",  createJob);
router.get("/getAll", getAllJobs);
router.get("/:id", protect, getJob);
router.put("/update/:id", updateStatus);
router.get("/getall/byUser", protect, user, getJobByStatus);
router.delete("/delete/:id", deleteJob);
router.post("/addUsertoJob/:id", protect, updateJob);
router.get("/getJob/ByUser/:designerId", getJobByUser);
router.post("/cancelJob/:id", protect, user, cancelJob);
router.delete("/detele/img/:id", deleteImg);
router.put("/update/other/:id", protect, updateOrder);
router.get("/getall/byGuest/:guestId", protect, guest, getByGuest);
router.put("/update/guest/:id", protect, guest, updateGuest);
router.put("/update/admin/:id",protect,admin,updateByAdmin)
router.get("/getAllPrice/byAdmin",getTotalPrice)
router.get("/getStatusCountByDesign/admin",getStatusCountByDesigner)
module.exports = router;
