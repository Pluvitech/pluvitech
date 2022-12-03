import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.$queryRaw(Prisma.sql`
    SELECT SUM(quantidade) as amount, Month(data) as month
    FROM dados
    GROUP BY Month(data)
    ;`);

  return res.status(200).json(data);
}
