
import 'reflect-metadata'
import { FakeAccountRepository } from "@modules/Account/IRepositories/fakes/FakeAccountRepository";
import { CreateAccountService } from "@modules/Account/service/CreateAccountService";
import AppError from "@modules/Shared/errors/AppErro";
import { FakeTransactionRepository } from '../IRepositories/fakes/FakeTransactionRepository';
import { CreateTransactionService } from "./CreateTransactionService";

let fakeTransactionRepository: FakeTransactionRepository;
let fakeAccountRepository: FakeAccountRepository;

let createTransactionService: CreateTransactionService
let createAccountService: CreateAccountService

describe('CreateTransaction', () => {
  beforeEach(() => {
    fakeTransactionRepository = new FakeTransactionRepository();
    fakeAccountRepository = new FakeAccountRepository();

    createTransactionService = new CreateTransactionService(
      fakeTransactionRepository,
      fakeAccountRepository
    );
    createAccountService = new CreateAccountService(
      fakeAccountRepository
    );
  });

  it('Deve poder criar uma transação', async () => {

    const account = await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    })

    const transaction = await createTransactionService.execute({
      account_id: account.id,
      description: 'salario',
      type: 'credit',
      value: 2000
    });

    expect(transaction).toHaveProperty('id')
  });

  it('Não deve poder criar uma transação de debito com saldo insuficiente', async () => {
    const account = await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    })

    await expect(
      createTransactionService.execute({
        account_id: account.id,
        description: 'aluguel',
        type: 'debit',
        value: 2000
      })
    ).rejects.toBeInstanceOf(AppError)
  });
  it('Não deve poder criar uma transação com account_id invalido', async () => {

    await expect(
      createTransactionService.execute({
        account_id: 'invalid-id',
        description: 'salario',
        type: 'credit',
        value: 2000
      })
    ).rejects.toBeInstanceOf(AppError)
  });


});
