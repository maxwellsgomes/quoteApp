import { Item } from "@/types/Item"

export function calculateQuoteTotal(items: Item[], discountPct?: number) {
     
    const subtotal = items.reduce((acumulador, item) => {
    return acumulador + (item.qty * item.price)
}, 0)

    const discountValue = discountPct ? (subtotal * discountPct / 100) : 0

    const total = subtotal - discountValue
return {
    subtotal,
    total,
    discountValue
}
}

