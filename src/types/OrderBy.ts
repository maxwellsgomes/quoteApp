export enum OrderBy {
    LATEST = "latest",
    OLDEST = "oldest",
    HIGHERPRICE = "higherprice",
    LOWERPRICE = "lowerprice"
}

export const OrderByLabel: Record<OrderBy, string> = {
    [OrderBy.LATEST]: "Mais recente",
    [OrderBy.OLDEST]: "Mais antigo",
    [OrderBy.HIGHERPRICE]: "Maior valor",
    [OrderBy.LOWERPRICE]: "Menor valor",
}
