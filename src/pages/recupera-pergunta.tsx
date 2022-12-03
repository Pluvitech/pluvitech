import React from "react";
import { Flex } from "@chakra-ui/react";
import RecuperaPerguntaPage from "../Components/RecuperaPergunta/RecuperaPergunta";

export default function RecuperaPergunta() {
  return (
    <Flex
      bg={"#0088ff"}
      boxShadow={"base"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
    >
      <RecuperaPerguntaPage />
    </Flex>
  );
}
