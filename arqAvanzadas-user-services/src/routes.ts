import {Router} from "express";
import {Ambassadors, Rankings, findByEmail, findById} from "./controller/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";

export const routes = (router: Router) => {
    // Admin
    router.get('/api/admin/ambassadors', AuthMiddleware, Ambassadors);

    // Ambassador
    router.get('/api/ambassador/rankings', AuthMiddleware, Rankings);

    router.get('/find-by-email/:email', AuthMiddleware, findByEmail);
    router.get('/find-by-id/:id', AuthMiddleware, findById);
}
