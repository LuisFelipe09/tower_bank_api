import { Spot } from '@binance/connector'
import 'dotenv/config'

const apiKey =  process.env.API_KEY_BINANCE;
const apiSecret = process.env.API_SECRECT_BINANCE;
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'});

export const getSymbolOrderBookTicker = async (symbol) => {
    let response = await client.bookTicker(symbol);
    return response.data;
}

export const postNewOrder = async (symbol, quote) => {
    let response = await client.newOrder(symbol, 'BUY', 'MARKET', {
        quoteOrderQty: quote
      });

    return response.data;
}

export const withDraw = async () => {
    let response  = await client.withdraw(coin, address, amount, {netwrok: 'eth', transactionFeeFlag: true});
    return response.data;
}
