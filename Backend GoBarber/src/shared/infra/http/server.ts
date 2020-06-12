import express, { Request, Response, NextFunction } from 'express'
import AppError from '@shared/errors/AppError'
import '@shared/infra/typeorm'
import '@shared/container'
import 'reflect-metadata'
import cors from 'cors'
import UploadConfig from '@config/upload'
import routes from './routes'

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
  console.log('Backend started 🔥')
})
