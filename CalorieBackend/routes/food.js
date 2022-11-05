const express = require("express");
const { foodController } = require("../controllers");

const router = express.Router();

router.post("/addfood", foodController.addNewEntity);
router.post("/addfood/adminAdd", foodController.adminAddEntity);
router.post("/addfood/adminEdit", foodController.adminEditEntity);
router.post("/addfood/adminDelete", foodController.adminDeleteEntity);
router.get("/getfood", foodController.getAllFood);
router.get("/getFiltereFood", foodController.getFilteredFood);
router.get("/entityReport", foodController.getEntryReport);
router.get("/avgCalories", foodController.getAverageCalorie);


module.exports = router;
