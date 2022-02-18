const express = require('express');
const routerRoutes = express.Router();
const userController = require("../controllers/user.js");
const adminController = require("../controllers/admin.js");

// user routes

// request body has building and number
routerRoutes.route('/search/building/:building/number/:number').get(userController.search);

// request body has building and number
routerRoutes.route('/report').put(userController.report);

// request body has building, number, user, userEmail
routerRoutes.route('/register').put(userController.register);

// request body has building, number, user, userEmail
routerRoutes.route('/deregister').put(userController.deregister);

// admin routes

// request body has building and number
routerRoutes.route('/resolve').put(adminController.resolve);

// request body has nothing
routerRoutes.route('/getRegisterLockers').get(adminController.getRegisteredLockers);

module.exports = routerRoutes;