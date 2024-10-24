const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const advertController = require("../controller/advertController");

// ================CATEGORTY ROUTES============

// CREATE
router.post("/create", advertController.createAds);

//UPDATE
router.put("/:id", advertController.updateAd);

//DELETE
router.delete("/:id", advertController.deleteAd);

// GET All category
router.get("/", advertController.getAds);

//GET CATEGORY DETAIL
router.get("/:id", advertController.getAd);

//GET CATEGORY POST
// Endpoint to get posts by a specific category ID

module.exports = router;
