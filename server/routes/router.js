import { Router } from 'express';
const routerRoutes = Router();
import { search, report, register, deregister } from "../controllers/user.js";
import { resolve, getRegisteredLockers } from "../controllers/admin.js";

// user routes

// request body has building and number
routerRoutes.route('/search/building/:building/number/:number').get(search);

// request body has building and number
routerRoutes.route('/report').put(report);

// request body has building, number, user, userEmail
routerRoutes.route('/register').put(register);

// request body has building, number, user, userEmail
routerRoutes.route('/deregister').put(deregister);

// admin routes

// request body has building and number
routerRoutes.route('/resolve').put(resolve);

// request body has nothing
routerRoutes.route('/getRegisteredLockers').get(getRegisteredLockers);

export default routerRoutes;