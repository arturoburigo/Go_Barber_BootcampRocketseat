import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'
import './database'
import 'reflect-metadata'
import cors from 'cors'
import UploadConfig from './config/upload'
import AppError from './error/AppError'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(UploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statuscode).json({
      status: 'error',
      message: err.message,
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(3333, () => {
  console.log('Backend started')
})
