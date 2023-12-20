export function numberToCurrency(
    amount: number,
    currency = 'BRL',
    countryCode = 'pt-BR',
  ) {
    return new Intl.NumberFormat(countryCode, {
      style: 'currency',
      currency,
    }).format(amount);
  }
  