import { profileStorage } from "@/storage/profile-storage"
import { QuoteDoc } from "@/types/QuoteDoc"
import { calculateQuoteTotal } from "./calculateQuoteTotal"
import { getDefaultAppLogoBase64 } from "./getDefaultLogo"
 
function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function escapeHtml(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

export async function buildQuoteHtml(quote: QuoteDoc): Promise<string> {
    // 1. Carrega os dados da empresa/profissional salvos
    const profile = await profileStorage.get()

    // Se o usuário tiver cadastrado logo, usa a dele; senão, busca o ícone padrão do app
    const logoSource = profile?.logoUri || (await getDefaultAppLogoBase64())

    const logoHtml = logoSource
        ? `<img src="${logoSource}" class="company-logo" />`
        : ''

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

    
    // Monta o cabeçalho da empresa (ou dados do app/autônomo)
    const companyHeader = `
      <div class="company-header">
          ${logoHtml}
          <div class="company-info">
              <h2 class="company-name">${escapeHtml(profile?.name || 'Meu Orçamento')}</h2>
              ${profile?.email ? `<span>${escapeHtml(profile.email)}</span><br/>` : ''}
              ${profile?.phone ? `<span>${escapeHtml(profile.phone)}</span>` : ''}
          </div>
      </div>
    `;

    return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Helvetica, Arial, sans-serif; padding: 32px; color: #222; }
          
          /* Cabeçalho da Empresa */
          .company-header {
            display: flex;
            align-items: center;
            gap: 16px;
            border-bottom: 2px solid #6A46EB;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .company-logo {
            width: 70px;
            height: 70px;
            border-radius: 8px;
            object-fit: contain;
          }
          .company-info { flex: 1; }
          .company-name { margin: 0 0 4px; font-size: 18px; color: #111; }
          .company-info span { font-size: 12px; color: #555; }

          /* Dados do Orçamento */
          h1 { margin: 0 0 4px; font-size: 22px; color: #6A46EB; }
          .meta { color: #555; margin-bottom: 24px; font-size: 14px; line-height: 1.5; }
          
          /* Tabela */
          table { width: 100%; border-collapse: collapse; }
          th { text-align: left; border-bottom: 2px solid #6A46EB; padding: 8px 4px; font-size: 13px; text-transform: uppercase; }
          td { border-bottom: 1px solid #eee; padding: 8px 4px; vertical-align: top; }
          .desc { color: #666; font-size: 12px; }
          .center { text-align: center; }
          .right { text-align: right; }
          .total { font-size: 20px; font-weight: bold; margin-top: 16px; color: #111; }
        </style>
      </head>
      <body>
        ${companyHeader}

        <h1>${escapeHtml(quote.title)}</h1>
        <div class="meta">
          <strong>Cliente:</strong> ${escapeHtml(quote.client)}<br/>
          ${quote.contato ? `<strong>Contato:</strong> ${escapeHtml(quote.contato)}<br/>` : ""}
          <strong>Data:</strong> ${new Date(quote.createdAt).toLocaleDateString("pt-BR")}
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