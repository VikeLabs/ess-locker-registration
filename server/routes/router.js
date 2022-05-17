import { Router } from 'express';
const routerRoutes = Router();
import { search, report, register, deregister } from "../controllers/user.js";
import { resolve, downloadRegisteredLockers, count } from "../controllers/admin.js";

// user routes

// default route
routerRoutes.route('/').get((req, res) => {
    res.redirect('http://localhost:3000');
})

// request body has building and number
routerRoutes.route('/search/building/:building/number/:number').get(search);

// request body has building and number
routerRoutes.route('/report').put(report);

// request body has building, number, user, userEmail
routerRoutes.route('/register').put(register);

// request body has building, number, user, userEmail
routerRoutes.route('/deregister').put(deregister);

// admin routes

// security middleware
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        console.log('logged in');
        return next();
    }

    console.log(req.headers);
    res.redirect('/login');
}

// request body has building and number
routerRoutes.route('/resolve').put(isAuthenticated, resolve);

// request body has nothing
routerRoutes.route('/download-registered-lockers').get(isAuthenticated, downloadRegisteredLockers);

// request body has nothing
routerRoutes.route('/count').get(isAuthenticated, count);

export default routerRoutes;