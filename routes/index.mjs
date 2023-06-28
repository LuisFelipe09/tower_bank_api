import { Router } from "express";
import {binanceGetSymbolOrderBookTicker, binanceOpenOrder} from "../controllers/binance/index.mjs"
import {match, createOrders, fullFlowProcess} from "../controllers/flow/index.mjs"

const router = Router({mergeParams: true});

router.get("/api/binance/pricing/:symbol", binanceGetSymbolOrderBookTicker);
router.post("/api/binance/order/:symbol/new/:quote", binanceOpenOrder);
router.get("/api/flow/match", match);
router.post("/api/flow/createorder", createOrders);
router.post("/api/flow/full", fullFlowProcess);

export default router;