const express = require('express');
const routerRoutes = express.Router();
const userController = require("../controllers/user.js");

// request body has building and number
routerRoutes.route('/search/building/:building/number/:number').get(userController.search);

// request body has building and number
routerRoutes.route('/report').put(userController.report);

// request body has building and number
routerRoutes.route('/resolve').put(userController.resolve);

// request body has building, number, user, userEmail
routerRoutes.route('/register').put(userController.register);

// request body has building, number, user, userEmail
routerRoutes.route('/deregister').put(userController.deregister);

module.exports = routerRoutes;