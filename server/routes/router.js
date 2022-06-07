import { Router } from 'express';
const routerRoutes = Router();
import { search, report, register, deregister } from "../controllers/user.js";
import { resolve, downloadRegisteredLockers, count } from "../controllers/admin.js";
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;

// user routes

// default route
routerRoutes.route('/').get((req, res) => {
    res.redirect('http://localhost:3000');
})

// request body has building and number
routerRoutes.route('/api/search/building/:building/number/:number').get(search);

// request body has building and number
routerRoutes.route('/api/report').put(report);

// request body has building, number, user, userEmail
routerRoutes.route('/api/register').put(register);

// request body has building, number, user, userEmail
routerRoutes.route('/api/deregister').put(deregister);

// admin routes

// request body has building and number
routerRoutes.route('/api/resolve').put(requiresAuth(), resolve);

// request body has nothing
routerRoutes.route('/api/download-registered-lockers').get(requiresAuth(), downloadRegisteredLockers);

// request body has nothing
routerRoutes.route('/api/count').get(requiresAuth(), count);

export default routerRoutes;