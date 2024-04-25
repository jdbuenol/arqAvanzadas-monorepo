import { Router } from "express";
import controller from "./controller";

const router = Router();

router.get("/validate-token", controller.validateToken);
router.post("/ambassador/login", controller.login);
router.post("/admin/login", controller.login);
router.post("/ambassador/register", controller.register);
router.post("/admin/register", controller.register);

export default router;
