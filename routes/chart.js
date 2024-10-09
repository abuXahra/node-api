const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const {
  chartData,
  lineChartData,
  barChartData,
} = require("../controller/chartController");

// ================CHART ROUTES============

router.get("/line-chart-data", lineChartData);
router.get("/bar-chart-data", barChartData);

module.exports = router;
