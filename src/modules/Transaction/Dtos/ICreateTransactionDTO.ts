export interface ICreateTransactionDTO{
  account_id: string
  value: number
  type: 'credit' | 'debit'
}
