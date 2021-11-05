import {PrismaClient, Transactions } from '@prisma/client'

interface updateTotalOnAccountPersistMiddlewareDTO{
  prisma: PrismaClient
  action: 'create'
  when: 'before' | 'after'
}
export const updateTotalOnAccountPersistMiddleware = ({ prisma, action, when }: updateTotalOnAccountPersistMiddlewareDTO)=>{
  prisma.$use(async (params, next) => {
    let result

    if(when === 'after'){
      result = await next(params)
    }

    if(params.action === action){
      const transactions = await prisma.transactions.findMany({
        where:{
          account_id: params.args.data.account_id
        }
      })

      const total = transactions.reduce((acc, transaction)=>{
        return transaction.type === 'credit' ? acc + transaction.value : acc - transaction.value
     }, 0)

     await prisma.accounts.update({
       where:{
         id: params.args.data.account_id
       },
       data: {
        total
      },
     })
    }

    if(when === 'before'){
      result = await next(params)
    }

    return result

  })
}
