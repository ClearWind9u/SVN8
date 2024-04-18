const express = require("express");
const {
  addAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminAccountController");

const router = express.Router();

router.post("/admin", addAdmin);
router.get("/admins", getAllAdmins);
router.get("/admin/:id", getAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

module.exports = {
  routes: router,
};
