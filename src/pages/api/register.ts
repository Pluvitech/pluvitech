import { compare } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // usuário não existe
      return res.status(401).json({ message: "Usuário não existe" });
    } else {
      const passwordMatches = await compare(senha, user.senha);
      if (!passwordMatches) {
        return res.status(501).json({ message: "Senha incorreta" });
      } else {
        return res.status(200).json({ message: "Logado com sucesso" });
      }
    }
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({});
}
