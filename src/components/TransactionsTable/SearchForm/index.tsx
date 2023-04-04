import { MagnifyingGlass } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { SearchFormContainer } from "./styles";

export function SearchForm() {
    const [inputFilter, setInputFilter] = useState<string>("");

    function onSubmitTransactionFilter(event: FormEvent) {
        event.preventDefault();
        // handleSetFilter(inputFilter);
    }

    function handleInputFilterChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setInputFilter(event.target.value);
    }

    return (
        <SearchFormContainer onSubmit={onSubmitTransactionFilter}>
            <input
                type="text"
                placeholder="Busque por transações"
                // value={filter}
                onChange={handleInputFilterChange}
            />

            <button type="submit">
                <MagnifyingGlass size={20} />
                <span>Buscar</span>
            </button>
        </SearchFormContainer>
    )
}