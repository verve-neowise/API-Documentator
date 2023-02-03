import { Router } from "express"

import auth from '@auth/routes'
import apis from '@apis/routes'

const router = Router()

router.use('/auth', auth)
router.use('/apis', apis)

export default router