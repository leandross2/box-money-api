import AppError from "@modules/Shared/errors/AppErro";
import "reflect-metadata"
import { FakeAccountRepository } from '../IRepositories/fakes/FakeAccountRepository';

import { CreateAccountService } from "./CreateAccountService";
import { CreateSessionAccountService } from "./CreateSessionAccountService";

let fakeAccountsRepository: FakeAccountRepository;
let createAccountService: CreateAccountService
let createSessionAccountService: CreateSessionAccountService

describe('CreateSession', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountRepository();

    createAccountService = new CreateAccountService(
      fakeAccountsRepository
    );

    createSessionAccountService = new CreateSessionAccountService(
      fakeAccountsRepository
    );
  });

  it('Deve poder criar uma nova sessão com username', async () => {
    const account = await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    });

    const session = await createSessionAccountService.execute(account.username);

    expect(session).toHaveProperty('token');
  });

  it('Não deve poder criar uma nova sessão com username invalido', async () => {
    await expect(
      createSessionAccountService.execute('user-invalid')
    ).rejects.toBeInstanceOf(AppError)
  });

});
