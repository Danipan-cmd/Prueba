"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const prisma = require("../prisma");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    try {
        const order = yield prisma.order.create({
            data: { userId: req.user.id, productId },
        });
        res.status(201).json(order);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = req.user.role === "ADMIN" ?
            yield prisma.order.findMany() :
            yield prisma.order.findMany({ where: { userId: req.user.id } });
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = { createOrder, getOrders };
