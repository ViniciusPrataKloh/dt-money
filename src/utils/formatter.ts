
const dateFormatter = new Intl.DateTimeFormat('pt-BR');
const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});


export function formatDateToString(dateToFormat: Date): string {
    return dateFormatter.format(dateToFormat);
}
export function formatNumberToPrice(priceToFormat: number): string {
    return priceFormatter.format(priceToFormat)
}