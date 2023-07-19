import {getSymbolOrderBookTicker, postNewOrder} from "../../services/kraken/index.mjs"

export const krakenGetSymbolOrderBookTicker = async (req, res) => {
    const symbol = req.params.symbol;
    const body = await getSymbolOrderBookTicker(symbol);
    return res.status(200).json(body);
}

export const krakenOpenOrder = async (req, res) => {
    const {symbol, quote} = req.params;
    const body = await postNewOrder(symbol, quote);
    return res.status(200).json(body);
}
