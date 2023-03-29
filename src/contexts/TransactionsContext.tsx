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
    getTotal: () => number;
    getTotalIncome: () => number;
    getTotalOutcome: () => number;
    formatDateToString: (dateToFormat: Date) => string;
    formatPrice(priceToFormat: number): string
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

    function getTotal(): number {
        let total = 0;
        transactions.forEach((transaction) => {
            total += transaction.price;
        });

        return total;
    }

    function getTotalIncome(): number {
        let total = 0;
        const incomeTransactions = transactions.filter((transaction) => transaction.category === 'income');

        incomeTransactions.forEach((transaction) => {
            total += transaction.price;
        });

        return total;
    }

    function getTotalOutcome(): number {
        let total = 0;
        const outcomeTransactions = transactions.filter((transaction) => transaction.category === 'outcome');

        outcomeTransactions.forEach((transaction) => {
            total += transaction.price;
        });

        return total;
    }

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
        setIsLoadingTransactions(true);

        if (filter === "") {
            const response = await fetch('http://localhost:3000/transactions');
            const data = await response.json();
            console.log(data);
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
            getTotalIncome,
            getTotalOutcome,
            formatDateToString,
            formatPrice
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}