
import 'reflect-metadata'
import { FakeAccountRepository } from "@modules/Account/IRepositories/fakes/FakeAccountRepository";
import { CreateAccountService } from "@modules/Account/service/CreateAccountService";
import AppError from "@modules/Shared/errors/AppErro";
import { FakeTransactionRepository } from '../IRepositories/fakes/FakeTransactionRepository';
import { CreateTransactionService } from "./CreateTransactionService";
import { ListTransactionService } from "./ListTransactionService";

let fakeTransactionRepository: FakeTransactionRepository;
let fakeAccountRepository: FakeAccountRepository;

let createTransactionService: CreateTransactionService
let createAccountService: CreateAccountService
let listTransactionService: ListTransactionService

describe('ListTransactions', () => {
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

    listTransactionService = new ListTransactionService(
      fakeTransactionRepository,
      fakeAccountRepository
    );
  });

  it('Deve poder Listar todas as transações', async () => {

    const account = await createAccountService.execute({
      name: 'leandro',
      username: 'leandross'
    })

     await createTransactionService.execute({
      account_id: account.id,
      description: 'salario',
      type: 'credit',
      value: 2000
    });

     await createTransactionService.execute({
      account_id: account.id,
      description: 'freela',
      type: 'credit',
      value: 1000
    });


    const {transactions} = await listTransactionService.execute(account.id)

    expect(transactions.length).toEqual(2)
  });

  it('Não deve poder listar as transações de uma account_id invalido', async () => {
    await expect(
      listTransactionService.execute('invalid-id')
      ).rejects.toBeInstanceOf(AppError)
  });



});
