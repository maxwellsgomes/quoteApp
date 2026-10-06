import { colors } from "@/styles/colors"

export enum QuoteStatus {
    DRAFT = "draft",
    SENT = "sent",
    APPROVED = "approved",
    REJECTED = "rejected",
}

export const QuoteStatusLabel: Record<QuoteStatus, string> = {
    [QuoteStatus.DRAFT]: "Rascunho",
    [QuoteStatus.SENT]: "Enviado",
    [QuoteStatus.APPROVED]: "Aprovado",
    [QuoteStatus.REJECTED]: "Recusado",
}

export const QuoteStatusColor: Record<QuoteStatus, string> = {
    [QuoteStatus.DRAFT]: colors.gray[600],
    [QuoteStatus.SENT]: colors.blue[500],
    [QuoteStatus.APPROVED]: colors.green[500],
    [QuoteStatus.REJECTED]: colors.red[500],
}
export const QuoteBgColor: Record<QuoteStatus, string> = {
    [QuoteStatus.DRAFT]: colors.gray[300],
    [QuoteStatus.SENT]: colors.blue[200],
    [QuoteStatus.APPROVED]: colors.green[300],
    [QuoteStatus.REJECTED]: colors.red[200],
}