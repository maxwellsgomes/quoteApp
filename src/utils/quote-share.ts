import { QuoteDoc } from "@/types/QuoteDoc"

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function buildQuoteText(quote: QuoteDoc): string {
    const subtotal = quote.items.reduce((acc, item) => acc + item.price * item.qty, 0)
    const discountPct = quote.discountPct ?? 0
    const discount = subtotal * (discountPct / 100)
    const total = subtotal - discount

    const lines = [
        `*${quote.title}*`,
        `Cliente: ${quote.client}`,
        "",
        "Serviços:",
        ...quote.items.map(
            (item) => `• ${item.title} (${item.qty}x): ${formatCurrency(item.price * item.qty)}`
        ),
        "",
    ]

    if (discountPct > 0) {
        lines.push(`Subtotal: ${formatCurrency(subtotal)}`)
        lines.push(`Desconto (${discountPct}%): -${formatCurrency(discount)}`)
    }

    lines.push(`*Total: ${formatCurrency(total)}*`)

    return lines.join("\n")
}