import { Router } from "express";
import * as user from "../controllers/authController";
import * as verifyMiddleware from "../middleware/verify";

const router = Router();

router.post('/register', user.signUp);
router.post('/login', user.signIn);
router.get('/profile', verifyMiddleware.verifyToken, user.getProfile);

export default router;