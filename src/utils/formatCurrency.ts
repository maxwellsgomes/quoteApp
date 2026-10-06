export function parseCurrencyInput(value: string): number {
  if (!value) return 0;

  // 1. Remove qualquer caractere que não seja dígito, vírgula ou ponto
  const cleanValue = value.replace(/[^\d.,]/g, "");

  // 2. Se tiver pontos de milhar (ex: 1.500,50), remove os pontos e troca a vírgula final por ponto
  const normalizedValue = cleanValue.includes(",")
    ? cleanValue.replace(/\./g, "").replace(",", ".")
    : cleanValue;

  const result = parseFloat(normalizedValue);
  return isNaN(result) ? 0 : result;
}