import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
    const { getTotal, getTotalByType, formatPrice } = useContext(TransactionsContext);

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00B37E" />
                </header>

                <strong>
                    {formatPrice(getTotalByType('income'))}
                </strong>

            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>

                <strong>
                    {formatPrice(getTotalByType('outcome'))}
                </strong>

            </SummaryCard>

            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>

                <strong>
                    {formatPrice(getTotal())}
                </strong>

            </SummaryCard>
        </SummaryContainer>
    )
}