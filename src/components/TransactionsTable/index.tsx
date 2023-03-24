import { SearchForm } from "./SearchForm";
import { PriceHighlight, Table, TransactionContainer } from "./styles";

export function TransactionsTable() {
    return (
        <TransactionContainer>
            <SearchForm />

            <Table>
                <tbody>

                    <tr>
                        <td width="50%">Desenvolvimento de Software</td>
                        <td>
                            <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
                        </td>
                        <td>Venda</td>
                        <td>13/04/2022</td>
                    </tr>

                    <tr>
                        <td width="50%">Pizza</td>
                        <td>
                            <PriceHighlight variant="outcome">- R$ 60,00</PriceHighlight>
                        </td>
                        <td>Alimentação</td>
                        <td>14/04/2022</td>
                    </tr>

                </tbody>
            </Table>
        </TransactionContainer>
    )
}