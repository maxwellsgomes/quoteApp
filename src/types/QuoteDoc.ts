import { Item } from "./Item"
import { QuoteStatus } from "./QuoteStatus"

export type QuoteDoc = {
    id: string
    client: string
    title: string
    contato: string
    items: Item[]
    discountPct?: number
    status: QuoteStatus
    createdAt: string
    updatedAt: string
}