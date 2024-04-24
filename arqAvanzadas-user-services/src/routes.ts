import {Router} from "express";
import {Ambassadors, Rankings, findByEmail, findById} from "./controller/user.controller";


export const routes = (router: Router) => {
    // Admin
    router.get('/api/admin/ambassadors', Ambassadors);

    // Ambassador
    router.get('/api/ambassador/rankings', Rankings);

    router.get('/find-by-email/:email', findByEmail);
    router.get('/find-by-email/:id', findById);
}