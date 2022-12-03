import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.tableConsumo.findMany({
    select: {
      mes: true,
      consumo: true,
      gastos: true,
    },
  });

  return res.status(200).json(data);
}
