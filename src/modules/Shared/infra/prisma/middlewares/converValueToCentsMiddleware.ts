import {PrismaClient ,Transactions } from "@prisma/client"
interface IConverValueToCentsMiddlewareDto{
  prisma: PrismaClient
  action?: 'findMany'
}

export const converValueToCentsMiddleware = ({prisma, action = "findMany"}: IConverValueToCentsMiddlewareDto) => {
  prisma.$use(async (params, next)=>{
    if(params.action === action){
      const result = await next(params)

      return result.map((transaction: Transactions) =>({
        ...transaction,
        value: transaction.value / 100
      }))
    }
    const result = await next(params)
    return result
  })
}
