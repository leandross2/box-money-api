import { CreateSessionAccountService } from '@modules/Account/service/CreateSessionAccountService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class SessionController{
  async create(request: Request, response: Response): Promise<Response>{
    const {username} = request.body

    const createSession = container.resolve(CreateSessionAccountService)

    const session = await createSession.execute(username)

    return response.json(session)
  }
}
