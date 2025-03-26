import { Request, Response } from "express";
import prisma from "../prisma";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price } = req.body;

  try {
    const product = await prisma.product.create({
      data: { name, price },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
