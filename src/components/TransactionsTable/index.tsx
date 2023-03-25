import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, Table, TransactionContainer } from "./styles";

interface ITransactions {
    id: string;
    description: string;
    price: number;
    type: 'income' | 'outcome';
    category: string;
    createdAt: Date;
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [isLoadingTransactions, setIsloadingTransactions] = useState<boolean>(false);

    console.log(isLoadingTransactions);

    function formatDateToString(dateToFormat: Date): string {
        const parsedDate = parseISO(dateToFormat.toString());
        const formatDate = format(parsedDate, "dd/MM/yyyy");

        return formatDate;
    }

    function formatPrice(priceToFormat: number): string {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(priceToFormat);
    }

    async function loadTransactions() {
        setIsloadingTransactions(true);

        if (filter === "") {
            const response = await fetch('http://localhost:3000/transactions');
            const data = await response.json();
            console.log(data);
            setTransactions(data);
        }

        setIsloadingTransactions(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);


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
                                        <PriceHighlight variant={transaction.type}>{formatPrice(transaction.price)}</PriceHighlight>
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