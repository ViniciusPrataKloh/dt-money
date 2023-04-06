import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { SearchFormContainer } from "./styles";

const newSearchFormSchema = zod.object({
    query: zod.string()
});

type newSearchFormSchemaType = zod.infer<typeof newSearchFormSchema>;

export function SearchForm() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<newSearchFormSchemaType>({
        resolver: zodResolver(newSearchFormSchema)
    });

    async function handleNewSearchFormSubmit(inputs: newSearchFormSchemaType) {
        await new Promise(resolve => { setTimeout(resolve, 1000) });
        console.log(inputs);
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