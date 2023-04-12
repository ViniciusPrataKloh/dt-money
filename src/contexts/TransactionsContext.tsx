import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

export interface ITransactions {
  id: string
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
  createdAt: any
}

interface createNewTransactionProps {
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
}

interface ITransactionsContext {
  transactions: ITransactions[]
  isLoadingTransactions: boolean
  loadTransactions: (query: string) => Promise<void>
  createNewTransaction: (data: createNewTransactionProps) => Promise<void>
  removerTransaction: (id: string) => Promise<void>
}

interface ITransactionsContextProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionsContext)

export function TransactionsContextProvider({
  children,
}: ITransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] =
    useState<boolean>(false)

  async function createNewTransaction(data: createNewTransactionProps) {
    const { description, category, price, type } = data

    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [...state, response.data])
  }

  async function removerTransaction(id: string) {
    await api.delete(`/transactions/${id}`)
    loadTransactions()
  }

  async function loadTransactions(query?: string) {
    setIsLoadingTransactions(true)

    const response = await api.get(
      '/transactions/?_sort=createdAt&_order=desc',
      {
        params: {
          q: query,
        },
      },
    )

    setTransactions(response.data)
    setIsLoadingTransactions(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoadingTransactions,
        loadTransactions,
        createNewTransaction,
        removerTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
