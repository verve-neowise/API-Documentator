import './setup'

import express from 'express'
import cors from 'cors'

import api from './api'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', api)

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080/api');
})