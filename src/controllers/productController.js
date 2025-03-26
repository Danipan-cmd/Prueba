const prisma = require("../prisma");

const createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
        const product = await prisma.product.create({ data: { name, price } });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createProduct };