import { Trash } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { formatDateToString, formatNumberToPrice } from '../../utils/formatter'
import { Loading } from '../Loading'
import { SearchForm } from './SearchForm'
import { PriceHighlight, Table, TransactionContainer } from './styles'

export function TransactionsTable() {
  const { transactions, isLoadingTransactions, removeTransaction } =
    useContextSelector(TransactionsContext, (context) => {
      return {
        transactions: context.transactions,
        isLoadingTransactions: context.isLoadingTransactions,
        removeTransaction: context.removeTransaction,
      }
    })

  async function handleRemoveTransaction(id: string) {
    await removeTransaction(id)
  }

  return (
    <TransactionContainer>
      <SearchForm />

      {isLoadingTransactions ? (
        <Loading />
      ) : (
        <Table>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {formatNumberToPrice(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formatDateToString(new Date(transaction.createdAt))}</td>
                  <td>
                    <button
                      type="button"
                      title="Remover transação"
                      onClick={() => handleRemoveTransaction(transaction.id)}
                      value={transaction.id}
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </TransactionContainer>
  )
}
