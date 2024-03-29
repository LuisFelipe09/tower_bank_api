import KrakenClient from 'kraken-api';
import 'dotenv/config'

const key          = process.env.API_KEY_KRAKEN;
const secret       = process.env.API_SECRECT_KRAKEN;
const kraken       = new KrakenClient(key, secret);

const CONVERT_SYMBOL = {
    'ETHUSDT' : 'XETHZUSD',
    'BTCUSDT': 'XXBTZUSD',
    'LTCUSDT': 'XLTCZUSD'
}

export const getSymbolOrderBookTicker = async (symbol) => {
    symbol = CONVERT_SYMBOL[symbol] || symbol;

    let response = await kraken.api('Ticker', { symbol });
    const tickerData = response.result[symbol];
    const bidPrice = tickerData ? tickerData.c[0] : Number.MAX_SAFE_INTEGER;

    return {
        symbol: symbol,
        bidPrice: bidPrice,
        bidQty: "0.36361000",
        askPrice: "1897.67000000",
        askQty: "0.43211000"
    }
}

export const postNewOrder = async (symbol, quote) => {
    const ticker = await getSymbolOrderBookTicker(symbol);
    const origQty = quote / ticker.bidPrice;
    return {
        "symbol": "ETHUSDT",
        "orderId": 8574467,
        "orderListId": -1,
        "clientOrderId": "MbXU9WtBN3zTqFhspgFf4g",
        "transactTime": 1687894782644,
        "price": "0.00000000",
        "origQty": origQty,
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