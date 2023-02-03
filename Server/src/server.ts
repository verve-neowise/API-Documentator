import './setup'

import express from 'express'
import cors from 'cors'

import api from './api'
import { PORT } from '@shared/config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', api)

app.listen(PORT || 1234, () => {
    console.log('server is running on http://localhost:' + PORT);
})