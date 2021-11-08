
import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


import AppError from '@modules/Shared/errors/AppErro';
import authConfig from '@config/authConfig';


interface ITokenPayload {
  account_id: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token não informado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, authConfig.jwt.secret);

    const { account_id } = decode as ITokenPayload;

    request.account_id =account_id

    return next();
  } catch {
    throw new AppError('JWT token invalido', 401);
  }
}
