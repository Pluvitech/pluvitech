import { Flex } from "@chakra-ui/react";
import RecuperaSenhaPage from "../Components/RecuperaSenha/RecuperaSenhaPage";

export default function RecuperaSenha() {
  return (
    <Flex
      bg={"#0088ff"}
      boxShadow={"base"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
    >
      <RecuperaSenhaPage />
    </Flex>
  );
}
