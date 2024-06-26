export default function formatMoney (amount: number) {
    const formattedAmount = new Intl.NumberFormat('vn-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);

    return formattedAmount;
}