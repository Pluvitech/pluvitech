import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pergunta, resposta, email } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(500).json({ message: "Usuario Não Encontrado" });
    }

    if (user.idpergunta !== Number(pergunta)) {
      return res
        .status(500)
        .json({ message: "Pergunta errada meu caro amigo" });
    }

    if (user.resposta !== resposta) {
      return res
        .status(500)
        .json({ message: "Resposta errada my dear friend" });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Ocorreu um erro inesperado" });
  }
}
