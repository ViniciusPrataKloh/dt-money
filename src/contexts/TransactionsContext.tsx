import { format, parseISO } from "date-fns";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface ITransactions {
    id: string;
    description: string;
    price: number;
    type: 'income' | 'outcome';
    category: string;
    createdAt: any;
}

interface ITransactionsContext {
    transactions: ITransactions[];
    isLoadingTransactions: boolean;
    handleSetTransactions: (transactions: ITransactions[]) => void;
    getTotal: () => string;
    getTotalByType: (type: 'income' | 'outcome') => string;
    formatDateToString: (dateToFormat: Date) => string;
    formatPrice(priceToFormat: string): string
}

interface ITransactionsContextProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionsContext);

export function TransactionsContextProvider({ children }: ITransactionsContextProviderProps) {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");

    function handleSetTransactions(transactions: ITransactions[]) {
        setTransactions(transactions);
        // setTransactions(state => [...state, data]);
    }

    function getTotal(): string {
        const totalIncomeTransaction = getTotalByType('income');
        const totalOutcomeTransaction = getTotalByType('outcome');

        const total = (Number(totalIncomeTransaction) - Number(totalOutcomeTransaction));

        return total.toString();
    }

    function getTotalByType(type: 'income' | 'outcome'): string {
        let total = 0;
        const transactionsType = transactions.filter((transaction) => transaction.type === type);

        transactionsType.forEach((transaction) => {
            total += Number(transaction.price);
        });

        return total.toString();
    }

    function formatDateToString(dateToFormat: Date): string {
        const parsedDate = parseISO(dateToFormat.toString());
        const formatDate = format(parsedDate, "dd/MM/yyyy");

        return formatDate;
    }

    function formatPrice(priceToFormat: string): string {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(Number(priceToFormat));
    }

    async function loadTransactions() {
        setIsLoadingTransactions(true);

        if (filter === "") {
            const response = await fetch('http://localhost:3000/transactions');
            const data = await response.json();
            handleSetTransactions(data);
        }

        setIsLoadingTransactions(false);
    }

    useEffect(() => {
        if (transactions.length === 0) {
            loadTransactions();
        }
    }, []);

    return (
        <TransactionsContext.Provider value={{
            transactions,
            isLoadingTransactions,
            handleSetTransactions,
            getTotal,
            getTotalByType,
            formatDateToString,
            formatPrice
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}