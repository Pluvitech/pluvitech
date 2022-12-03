import { Flex } from "@chakra-ui/react";
import CadastroPage from "../Components/Cadastro/CadastroPage";

export default function Cadastro() {
  return (
    <Flex
      bg={"#0088ff"}
      boxShadow={"base"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
    >
      <CadastroPage />
    </Flex>
  );
}
