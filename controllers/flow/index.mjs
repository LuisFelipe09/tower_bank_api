import { matchSupplierBalance, newOrder, fullFlow, quotePrice} from "../../services/workFlow/index.mjs"

export const match = async (req, res) => {
    let ejemplo1 = await matchSupplierBalance(100, [{provider: 'binance', balance: 100}, {provider: 'kraken', balance: 100}],'ETHUSDT');
    let ejemplo2 = await matchSupplierBalance(100, [{provider: 'binance', balance: 50}, {provider: 'kraken', balance: 50}],'ETHUSDT');
    let ejemplo3 = await matchSupplierBalance(100, [{provider: 'binance', balance: 0}, {provider: 'kraken', balance: 100}], 'ETHUSDT');
    let ejemplo4 = await matchSupplierBalance(100, [{provider: 'binancese', balance: 100000}, {provider: 'kraken', balance: 50}], 'ETHUSDT');

    console.log(ejemplo1);
    console.log(ejemplo2);
    console.log(ejemplo3);
    console.log(ejemplo4);

}

export const createOrders = async (req, res) => {
    const payload = [ { provider: 'binance', purchase: 100, bid_price: '1890.95000000' } ];

    const orders = await newOrder(payload,'ETHUSDT');
    console.log(orders);

}

export const fullFlowProcess = async(req, res) => { 
    const {symbol, amount} = req.body;

    const result = await fullFlow(amount, [{provider: 'binance', balance: 100}, {provider: 'kraken', balance: 100}], symbol);
    return res.status(200).json(result);
}

export const quote = async(req, res) =>{
    const symbol = req.params.symbol;
    const result = await quotePrice(symbol);
    return res.status(200).json(result);
}
