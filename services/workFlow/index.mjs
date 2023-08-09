import {
    getSymbolOrderBookTicker as binancePrice,
    postNewOrder as binanceNewOrder
} from "../binance/index.mjs"
import {
    getSymbolOrderBookTicker as krakenPrice,
    postNewOrder as krakenNewOrder
} from "../kraken/index.mjs"

import {
    transferDummy,
    tranferDummyETH
} from "../account/index.mjs"

const orderProviders = {
    'binance': binanceNewOrder,
    'kraken': krakenNewOrder
}

export const bestPrice = async (symbol) => {
    const priceBinance = await binancePrice(symbol);
    const priceKraken = await krakenPrice(symbol);

    let pricesProvider = [];
    pricesProvider.push({provider: 'binance', price: priceBinance.bidPrice});
    pricesProvider.push({provider: 'kraken', price: priceKraken.bidPrice});

    return pricesProvider.sort((a, b) => a.price - b.price);
}

export const matchSupplierBalance = async(total_purchase, supplier_provider, symbol) => {
    let _total_purchase = total_purchase;
    let prices = await bestPrice(symbol);
    let purchasesProvider = [];
    for (let i = 0; i < supplier_provider.length; i++){
        let amount_purchase = 0;
        let providerSupplier = prices.find((a)=> a.provider == supplier_provider[i].provider);

        if (!!!providerSupplier || supplier_provider[i].balance <= 0) continue;

        let diferencia =   _total_purchase - supplier_provider[i].balance;

        if(diferencia <= 0){
            amount_purchase =  parseFloat(_total_purchase);
        }else{
            amount_purchase = diferencia;
        }
        
        _total_purchase = diferencia < 0 ? 0 : diferencia;
        purchasesProvider.push({provider: supplier_provider[i].provider,purchase: amount_purchase, balance_provider: supplier_provider[i].balance, bid_price: providerSupplier.price});
        if (_total_purchase == 0) break; 
    }

    return purchasesProvider;
}

export const newOrder = async (orders, symbol) => {
    let ordersCreated =  await Promise.all( orders.map( async (order) => {
        let fn_createOrder = orderProviders[order.provider] ;
        return await fn_createOrder(symbol, order.purchase);
    }));
    
    return ordersCreated;
}

export const withDraw = async(coins, symbol, index) =>{
    return await Promise.all(coins.map(async(coin)=>{
        return await tranferDummyETH(coin.origQty, symbol, index);
    }));
}

export const fullFlow = async (amount, supplier_provider, symbol = 'ETHUSDT', index) => {
    const orders = await matchSupplierBalance(amount, supplier_provider, symbol);
    const ordersCreated = await newOrder(orders, symbol);
    const transactions = await withDraw(ordersCreated, symbol, index);
    const urls = transactions.map((txn)=>{
        return { url: txn.hash}
    })    

    return urls;
}

export const quotePrice = async(symbol) => {
    const priceBinance = await binancePrice(symbol);
    const priceKraken = await krakenPrice(symbol);

    return [
        {
            provider: 'binance',
            price: priceBinance.bidPrice
        },
        {
            provider: 'kraken',
            price: priceKraken.bidPrice
        }
    ]
}
