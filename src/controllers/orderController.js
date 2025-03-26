const prisma = require("../prisma");
const createOrder = async (req, res) => {
    const { productId } = req.body;
    try {
        const order = await prisma.order.create({
            data: { userId: req.user.id, productId },
        });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = req.user.role === "ADMIN" ? 
            await prisma.order.findMany() : 
            await prisma.order.findMany({ where: { userId: req.user.id } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createOrder, getOrders };
