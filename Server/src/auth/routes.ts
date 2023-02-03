import { Router } from "express";

import login from "./functions/login";
import register from "./functions/register";

const router = Router()

router.post('/login', login)
router.post('/register', register)

export default router