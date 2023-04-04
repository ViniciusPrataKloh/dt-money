import { ReactNode, createContext, useEffect, useState } from "react";

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
}

interface ITransactionsContextProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionsContext);

export function TransactionsContextProvider({ children }: ITransactionsContextProviderProps) {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(false);

    function handleSetTransactions(transactions: ITransactions[]) {
        setTransactions(transactions);
        // setTransactions(state => [...state, data]);
    }

    async function loadTransactions() {
        setIsLoadingTransactions(true);

        // if (filter === "") {
        const response = await fetch('http://localhost:3000/transactions');
        const data = await response.json();
        handleSetTransactions(data);
        // }

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
            handleSetTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}