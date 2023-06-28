import {getSymbolOrderBookTicker, postNewOrder} from "../../services/binance/index.mjs"

export const binanceGetSymbolOrderBookTicker = async (req, res) => {
    const symbol = req.params.symbol;
    const body = await getSymbolOrderBookTicker(symbol);
    return res.status(200).json(body);
}

export const binanceOpenOrder = async (req, res) => {
    const {symbol, quote} = req.params;
    const body = await postNewOrder(symbol, quote);
    return res.status(200).json(body);
}