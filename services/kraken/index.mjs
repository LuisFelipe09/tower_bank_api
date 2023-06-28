

export const getSymbolOrderBookTicker = async (symbol) => {
    return {
        symbol: "ETHUSDT",
        bidPrice: "1899.64000000",
        bidQty: "0.36361000",
        askPrice: "1897.67000000",
        askQty: "0.43211000"
    }
}

export const postNewOrder = async (symbol, quote) => {
    return {
        "symbol": "ETHUSDT",
        "orderId": 8574467,
        "orderListId": -1,
        "clientOrderId": "MbXU9WtBN3zTqFhspgFf4g",
        "transactTime": 1687894782644,
        "price": "0.00000000",
        "origQty": "0.05271000",
        "executedQty": "0.05271000",
        "cummulativeQuoteQty": "99.98718030",
        "status": "FILLED",
        "timeInForce": "GTC",
        "type": "MARKET",
        "side": "BUY",
        "workingTime": 1687894782644,
        "fills": [
            {
                "price": "1896.93000000",
                "qty": "0.05271000",
                "commission": "0.00000000",
                "commissionAsset": "ETH",
                "tradeId": 1171448
            }
        ],
        "selfTradePreventionMode": "NONE"
    }
}