import { Flex } from "@chakra-ui/react";
import LoginPage from "../Components/Login/LoginPage";

export default function Login() {
  return (
    <Flex
      bg={
        "linear-gradient(90deg, rgba(0,136,255,1) 0%, rgba(0,70,131,1) 100%);"
      }
      boxShadow={"base"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
    >
      <LoginPage />
    </Flex>
  );
}
