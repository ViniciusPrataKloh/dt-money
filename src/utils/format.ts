import { format, parseISO } from "date-fns";

export function formatDateToString(dateToFormat: Date): string {
    const parsedDate = parseISO(dateToFormat.toString());
    const formatDate = format(parsedDate, "dd/MM/yyyy");

    return formatDate;
}

export function formatNumberToPrice(priceToFormat: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return formatter.format(priceToFormat);
}