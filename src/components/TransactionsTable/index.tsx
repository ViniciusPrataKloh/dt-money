import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { formatDateToString, formatNumberToPrice } from "../../utils/format";
import { Loading } from "../Loading";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, Table, TransactionContainer } from "./styles";

export function TransactionsTable() {
    const { transactions, isLoadingTransactions } = useContext(TransactionsContext);

    return (
        <TransactionContainer>
            <SearchForm />

            {isLoadingTransactions
                ? <Loading />
                : <Table>
                    <tbody>

                        {transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {formatNumberToPrice(transaction.price)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{formatDateToString(transaction.createdAt)}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            }
        </TransactionContainer>
    )
}