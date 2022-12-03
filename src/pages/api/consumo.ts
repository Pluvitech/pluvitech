import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Month, consumoQuantidade, consumoReais } = req.body;

  const InsertConsumo = await prisma.tableConsumo.create({
    data: {
      mes: Number(Month),
      consumo: consumoQuantidade,
      gastos: consumoReais,
    },
  });
  if (InsertConsumo) {
    return res.status(200).json({ message: "Foi" });
  }
}
