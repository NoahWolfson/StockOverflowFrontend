/**
 * this type represents what a stock recommendation is when a user enteres in characters to the search bar on the stock searcher page
 */
export type StockRecommendation = {
    name: string,
    region: string,
    securityType: string,
    shortBio: string,
    symbol: string
}