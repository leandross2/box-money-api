import {inject, injectable} from 'tsyringe'
import { Accounts } from ".prisma/client";
import {sign} from 'jsonwebtoken'

import { IAccountRepository } from '../IRepositories/IAccountRepository';
import AppError from '@modules/Shared/errors/AppErro';
import authConfig from '@config/authConfig';

interface IResponseDTO{
  token: string,
  account:{
    name: string
    username: string
    total: number
  }
}

@injectable()
export class CreateSessionAccountService{
  constructor(
    @inject('AccountRepository') private AccountRepository: IAccountRepository
  ){}

  async execute(username: string): Promise<IResponseDTO>{

    const usernameExist = await this.AccountRepository.findAccountByUsername(username)

    if(!usernameExist){
      throw new AppError('username invalid')
    }
    const token = sign(
      { name: usernameExist.name,username: usernameExist.username, account_id: usernameExist.id },
      authConfig.jwt.secret,
      { subject: usernameExist.id, expiresIn: authConfig.jwt.expiresIn }
    );

    return  {
      account:{
        name: usernameExist.name,
        username: usernameExist.username,
        total: usernameExist.total
      },
      token
    }
  }
}
