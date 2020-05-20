import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '../error/AppError'

import authKey from '../config/authKey'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('missing the jwt', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { key } = authKey.jwt

    const decode = verify(token, key)

    const { sub } = decode as TokenPayload

    request.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('invalid JWT Token', 401)
  }
}
