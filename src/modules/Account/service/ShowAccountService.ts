import { Accounts } from ".prisma/client";
import AppError from "@modules/Shared/errors/AppErro";
import { inject, injectable } from "tsyringe";
import { IAccountRepository } from "../IRepositories/IAccountRepository";

@injectable()
export class ShowAccountService{
  constructor(
    @inject('AccountRepository') private accountRepository: IAccountRepository
  ){}

  async execute(account_id: string): Promise<Accounts>{
    const accountExist = await this.accountRepository.findAccountById(account_id)

    if(!accountExist){
      throw new AppError('Account not found')
    }

    return accountExist
  }
}
