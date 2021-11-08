import AppError from "@modules/Shared/errors/AppErro";
import "reflect-metadata"
import { FakeAccountRepository } from '../IRepositories/fakes/FakeAccountRepository';

import {CreateAccountService} from './CreateAccountService';

let fakeAccountsRepository: FakeAccountRepository;
let createAccountService: CreateAccountService

describe('CreateAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountRepository();

    createAccountService = new CreateAccountService(
      fakeAccountsRepository
    );
  });

  it('Deve poder criar uma nova conta', async () => {
    const account = await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    });

    expect(account).toHaveProperty('id');
  });

  it('Não deve poder criar uma nova conta com username já cadastrado', async () => {
    await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    });


    await expect(
      createAccountService.execute({
        name: 'leandro',
        username: 'leandross'
      })
    ).rejects.toBeInstanceOf(AppError)
  });

});
