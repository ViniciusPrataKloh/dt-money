import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
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
  removeTransaction: (id: string) => Promise<void>
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

  const loadTransactions = useCallback(async (query?: string) => {
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
  }, [])

  const createNewTransaction = useCallback(
    async (data: createNewTransactionProps) => {
      const { description, category, price, type } = data

      const response = await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [...state, response.data])
    },
    [],
  )

  const removeTransaction = useCallback(
    async (id: string) => {
      await api.delete(`/transactions/${id}`)
      await loadTransactions()
    },
    [loadTransactions],
  )

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoadingTransactions,
        loadTransactions,
        createNewTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
