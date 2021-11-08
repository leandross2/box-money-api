import {Request, Response} from 'express'
import {container} from 'tsyringe'

import { CreateAccountService } from '@modules/Account/service/CreateAccountService'
import { ShowAccountService } from '@modules/Account/service/ShowAccountService'

export class AccountController{
  async create(request: Request, response: Response){
    const {name, username} = request.body

    const createAccount = container.resolve(CreateAccountService)
    const account = await createAccount.execute({name, username})

    return response.json(account)
  }

  async show(request: Request, response: Response){
    const showAccount = container.resolve(ShowAccountService)

    const account = await showAccount.execute(request.account_id)

    return response.json(account)
  }
}
