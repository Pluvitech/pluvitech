import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Quant } = req.body;

  const InsertDados = await prisma.dados.create({
    data: {
      quantidade: Quant,
    },
  });
  if (InsertDados) {
    return res.status(200).json({ message: "Foi" });
  }
}
