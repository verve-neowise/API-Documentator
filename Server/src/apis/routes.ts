import authMiddleware from "@shared/middlewares/auth-middleware";
import { Router } from "express";
import createApi from "./functions/create-api";
import deleteApi from "./functions/delete-api";
import allApis from "./functions/all-apis";
import getApi from "./functions/get-api";
import updateResource from "./functions/update-resource";
import getOwnship from "./functions/get-ownship";
import updateApi from "./functions/update-api";
import getPublicApis from "./functions/get-public-apis";

const router = Router()

router.use(authMiddleware())

router.get('/', allApis)
router.get('/community', getPublicApis)
router.get('/:id', getApi)
router.get('/:id/ownship', getOwnship)
router.post('/', createApi)
router.put('/:id/resource', updateResource)
router.put('/:id', updateApi)
router.delete('/:id', deleteApi)

export default router