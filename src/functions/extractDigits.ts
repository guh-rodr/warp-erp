export const extractDigitsFromCurrency = (value: string) => +value.replace(/\D/g, '') / 100;
