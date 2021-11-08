import AppError from "@modules/Shared/errors/AppErro";
import "reflect-metadata"
import { FakeAccountRepository } from '../IRepositories/fakes/FakeAccountRepository';
import { CreateAccountService } from "./CreateAccountService";
import { ShowAccountService } from "./ShowAccountService";

let fakeAccountsRepository: FakeAccountRepository;
let createAccountService: CreateAccountService
let showAccountService: ShowAccountService

describe('ShowAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountRepository();

    createAccountService = new CreateAccountService(
      fakeAccountsRepository
    );
    showAccountService = new ShowAccountService(
      fakeAccountsRepository
    );

  });

  it('Deve poder exibir os detalhes de uma conta', async () => {
    const account = await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    });

    const accountExist = await showAccountService.execute(account.id)

    expect(accountExist.id).toEqual(account.id)
  });

  it('Não deve poder exibir os detalhes de uma conta inexistente', async () => {
    await expect(
        showAccountService.execute('invalid-account')
    ).rejects.toBeInstanceOf(AppError)
  });

});
