import { QuoteDoc } from "@/types/QuoteDoc"
import { calculateQuoteTotal } from "./calculateQuoteTotal"

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function escapeHtml(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

export function buildQuoteHtml(quote: QuoteDoc): string {
    const discountPct = quote.discountPct ?? 0
    const { subtotal, discountValue, total } = calculateQuoteTotal(quote.items, discountPct)

    const rows = quote.items
        .map(
            (item) => `
            <tr>
                <td>
                    <strong>${escapeHtml(item.title)}</strong><br/>
                    <span class="desc">${escapeHtml(item.description)}</span>
                </td>
                <td class="center">${item.qty}</td>
                <td class="right">${formatCurrency(item.price)}</td>
                <td class="right">${formatCurrency(item.price * item.qty)}</td>
            </tr>`
        )
        .join("")

    const discountRows =
        discountPct > 0
            ? `
            <p class="right">Subtotal: ${formatCurrency(subtotal)}</p>
            <p class="right">Desconto (${discountPct}%): -${formatCurrency(discountValue)}</p>`
            : ""

    return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Helvetica, Arial, sans-serif; padding: 32px; color: #222; }
          h1 { margin: 0 0 4px; font-size: 24px; }
          .meta { color: #666; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; }
          th { text-align: left; border-bottom: 2px solid #6A46EB; padding: 8px 4px; }
          td { border-bottom: 1px solid #eee; padding: 8px 4px; vertical-align: top; }
          .desc { color: #666; font-size: 12px; }
          .center { text-align: center; }
          .right { text-align: right; }
          .total { font-size: 20px; font-weight: bold; margin-top: 16px; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(quote.title)}</h1>
        <div class="meta">
          Cliente: ${escapeHtml(quote.client)}<br/>
          ${quote.contato ? `Contato: ${escapeHtml(quote.contato)}<br/>` : ""}
          Data: ${new Date(quote.createdAt).toLocaleDateString("pt-BR")}
        </div>

        <table>
          <thead>
            <tr>
              <th>Serviço</th>
              <th class="center">Qtd</th>
              <th class="right">Valor un.</th>
              <th class="right">Subtotal</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        ${discountRows}
        <p class="right total">Total: ${formatCurrency(total)}</p>
      </body>
    </html>`
}