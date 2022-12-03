import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pass, email } = req.body;
  const passwordHash = await hash(pass, 8);

  const ChangePass = await prisma.usuario.update({
    where: {
      email,
    },
    data: {
      senha: passwordHash,
    },
  });
  if (ChangePass) {
    return res.status(200).json({ message: "Atualizado" });
  }
}
