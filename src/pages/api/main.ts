import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dados = await prisma.dados.findMany({
    select: {
      quantidade: true,
      data: true,
    },
  });
  return res.status(200).json(dados);
}
