import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
    // handleSetTransactions: (transactions: ITransactions[]) => void;
}

interface ITransactionsContextProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as ITransactionsContext);

export function TransactionsContextProvider({ children }: ITransactionsContextProviderProps) {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(false);

    // function handleSetTransactions(transactions: ITransactions[]) {
    //     setTransactions(transactions);
    //     // setTransactions(state => [...state, data]);
    // }

    async function loadTransactions(query?: string) {
        setIsLoadingTransactions(true);

        const response = await api.get('/transactions', {
            params: {
                q: query
            }
        });

        setTransactions(response.data);

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
            // handleSetTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}