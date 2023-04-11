import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { SearchFormContainer } from "./styles";

const newSearchFormSchema = zod.object({
    query: zod.string()
});

type newSearchFormSchemaType = zod.infer<typeof newSearchFormSchema>;

export function SearchForm() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<newSearchFormSchemaType>({
        resolver: zodResolver(newSearchFormSchema)
    });

    const { loadTransactions } = useContext(TransactionsContext);

    async function handleNewSearchFormSubmit({ query }: newSearchFormSchemaType) {
        await new Promise(resolve => { setTimeout(resolve, 1000) });
        loadTransactions(query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleNewSearchFormSubmit)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register("query")}
            />

            <button
                type="submit"
                disabled={isSubmitting}
            >
                <MagnifyingGlass size={20} />
                <span>Buscar</span>
            </button>
        </SearchFormContainer>
    )
}