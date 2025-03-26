import { Request, Response } from "express";
import prisma from "../prisma";

interface AuthRequest extends Request {
  user?: { id: string; role?: string };
}

export const createOrder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { productId } = req.body;

  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const order = await prisma.order.create({
      data: { userId: parseInt(req.user.id, 10), productId },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const orders =
      req.user.role === "ADMIN"
        ? await prisma.order.findMany()
        : await prisma.order.findMany({
            where: { userId: parseInt(req.user.id, 10) },
          });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
