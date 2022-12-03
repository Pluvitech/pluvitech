import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, senha, users, pergunta, resposta } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const passwordHash = await hash(senha, 8);
      await prisma.usuario.create({
        data: {
          nome_usuario: users,
          email,
          senha: passwordHash,
          pergunta: { connect: { id: Number(pergunta) } },
          resposta: resposta,
        },
      });
      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso" });
    }
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({});
}
