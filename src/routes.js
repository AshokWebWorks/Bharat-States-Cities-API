const { Router } = require("express");
const controller = require("./controller");
const router = new Router();

router.get("/states", controller.getAllStates);
router.get("/states/:id", controller.getStateById);
router.get("/states/:id/cities", controller.getCitiesByStateId);
router.get("/cities", controller.getAllCities);

module.exports = router;
