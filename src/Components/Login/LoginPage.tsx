import { useState } from "react";
import {
  Flex,
  FormControl,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormLabel,
  Box,
  Heading,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { FormHelperText, Link } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon } from "@chakra-ui/icons";
import { api } from "../../lib/api";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  let [errorMail, setErrorMail] = useState(false);
  let [errorPass, setErrorPass] = useState(false);

  const [visible, setVisible] = useState(false);
  const handleClick = () => setVisible(!visible);

  const toast = useToast();

  const [isLoading, setisLoading] = useState(false);

  const [userState, setUserState] = useState(0);

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = event.target.value;
    setSenha(newPass);
  };

  const validationMail = () => {
    if (email == "") {
      setErrorMail(true);
    } else {
      setErrorMail(false);
    }
  };

  const validationPass = () => {
    if (senha == "") {
      setErrorPass(true);
    } else {
      setErrorPass(false);
    }
  };

  const validation = () => {
    validationMail();
    validationPass();
  };

  const handleLogin = async (values: any) => {
    //setisLoading(true);

    validation();

    if (errorMail == false && errorPass == false) {
      const response = await api.post("/login", {
        email,
        senha,
      });
      if (response.status == 200) {
        setisLoading(false);
        toast({
          title: "Usuário logado com sucesso",
          position: "bottom-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/main");
        }, 250);
      } else if (response.status === 401) {
        setisLoading(false);
        toast({
          title: "Erro ao fazer login",
          description: "Usuário não encontrado",
          position: "bottom-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.status === 501) {
        setisLoading(false);
        toast({
          title: "Erro ao fazer login",
          description: "Senha incorreta",
          position: "bottom-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container borderWidth="0">
      <FormControl bg="#fff" boxShadow={"dark-lg"} p={30} isRequired>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          color="#0088ff"
        >
          <Heading>Pluvitech</Heading>
        </Flex>
        <Heading m={4} color="#0088ff" size="md" textAlign="center">
          Login
        </Heading>
        <Box m={4} mx={10}>
          <FormControl isInvalid={errorMail} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="email">
              E-mail
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={emailHandler}
                variant="filled"
                bg={"#fff"}
                color="#0088ff"
                borderWidth="2px"
                borderColor={"#0088ff"}
                isRequired={true}
              />
              <InputRightElement>
                <EmailIcon color="#0088ff" />
              </InputRightElement>
            </InputGroup>
            {!errorMail ? (
              <FormHelperText textAlign={"center"}>
                Selecione seu melhor e-mail
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email é requerido.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errorPass} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="pass">
              Senha
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="pass"
                name="senha"
                value={senha}
                onChange={passHandler}
                type={visible ? "text" : "password"}
                variant="filled"
                bg={"#fff"}
                color="#0088ff"
                borderWidth="2px"
                borderColor={"#0088ff"}
              />
              <InputRightElement>
                {visible ? (
                  <ViewIcon color="#0088ff" onClick={handleClick} />
                ) : (
                  <ViewOffIcon color="#0088ff" onClick={handleClick} />
                )}
              </InputRightElement>
            </InputGroup>
            {!errorPass ? (
              <FormHelperText textAlign={"center"}>
                <Link as={NextLink} href="/recupera-pergunta">
                  Esqueceu sua senha ?
                </Link>{" "}
              </FormHelperText>
            ) : (
              <FormErrorMessage>Senha é requirida.</FormErrorMessage>
            )}
          </FormControl>
          <Flex m={2} mt={5} flexDirection="column" justify="center">
            <Button
              isLoading={isLoading}
              size={"lg"}
              type="submit"
              bg="#0088ff"
              color="#fff"
              onClick={handleLogin}
            >
              Log-in
            </Button>
            <FormHelperText textAlign={"center"}>
              Não tem conta ainda ?{" "}
              <Link as={NextLink} href="/register">
                Cadastre-se aqui
              </Link>{" "}
            </FormHelperText>
          </Flex>
        </Box>
      </FormControl>
    </Container>
  );
}
