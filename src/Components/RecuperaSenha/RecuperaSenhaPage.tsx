import { useState } from "react";
import {
  Flex,
  FormControl,
  Container,
  FormErrorMessage,
  Button,
  FormLabel,
  Box,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FormHelperText, Link } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { api } from "../../lib/api";
import { useRouter } from "next/router";
import NextLink from "next/link";

export default function RecuperaSenhaPage() {
  const router = useRouter();

  const [pass, setPass] = useState("");
  const [doublePass, setDoublePass] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleConfirme, setVisible2] = useState(false);

  const [userState, setUserState] = useState(0);

  const handleClick = () => setVisible(!visible);
  const handleClick2 = () => setVisible2(!visibleConfirme);

  let [passError, SetPassError] = useState(false);
  let [passDoubleError, SetPassDoubleError] = useState(false);

  const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = event.target.value;
    setPass(newPass);
  };

  const passDoubleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDoublePass = event.target.value;
    setDoublePass(newDoublePass);
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const validationPass = () => {
    if (pass.trim() == "") {
      SetPassError(true);
    } else {
      SetPassError(false);
    }
  };

  const validationDoublePass = () => {
    if (doublePass == "" || doublePass !== pass) {
      SetPassDoubleError(true);
    } else {
      SetPassDoubleError(false);
    }
  };

  const handleSendPass = async (values: any) => {
    validation();

    const email = localStorage.getItem("Pluvitech-email");

    if (passError == false) {
      const response = await api.post("/recupera-senha", {
        pass,
        email,
      });

      setUserState(response.status);
      console.log(response.status);

      onOpen();
      if (response.status === 200) {
        setTimeout(() => {
          router.push("/");
          localStorage.removeItem("Pluvitech-email");
        }, 3000);
      } else {
        console.log("Resposta Incorreta");
      }
    }
  };

  const setStatus = () => {
    if (userState == 400 || userState == 500) {
      return "error";
    } else if (userState == 200) {
      return "success";
    }
  };

  const setTitle = () => {
    if (userState == 200 || userState == 201) {
      return "Senha nova cadastrada com sucesso";
    } else {
      return "Houve um erro ao alterar a senha";
    }
  };

  const alerts = () => {
    return isVisible ? (
      <Alert status={setStatus()} justifyContent={"space-evenly"}>
        <AlertIcon />
        <Box>
          <AlertTitle>{setTitle()}</AlertTitle>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    ) : (
      <Box></Box>
    );
  };

  const validation = () => {
    validationPass();
    validationDoublePass();
  };

  return (
    <Container borderWidth="0">
      <FormControl bg="#fff" boxShadow={"dark-lg"} p={30}>
        <Flex
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          color="#0088ff"
        >
          <Heading>Pluvitech</Heading>
        </Flex>

        <Heading color="#0088ff" size="md" m={4} textAlign="center">
          Criar nova senha
        </Heading>

        <Box mx={10}>
          <FormControl isInvalid={passError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="pass">
              Senha
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="pass"
                value={pass}
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
                  <ViewIcon
                    cursor="pointer"
                    color="#0088ff"
                    onClick={handleClick}
                  />
                ) : (
                  <ViewOffIcon
                    cursor="pointer"
                    color="#0088ff"
                    onClick={handleClick}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            {!passError ? (
              <FormHelperText
                textAlign={"center"}
                display="none"
              ></FormHelperText>
            ) : (
              <FormErrorMessage>Preencha uma senha válida</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={passDoubleError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="doublePass">
              Confirme a senha
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="doublePass"
                value={doublePass}
                onChange={passDoubleHandler}
                type={visibleConfirme ? "text" : "password"}
                variant="filled"
                bg={"#fff"}
                color="#0088ff"
                borderWidth="2px"
                borderColor={"#0088ff"}
              />
              <InputRightElement>
                {visibleConfirme ? (
                  <ViewIcon
                    cursor="pointer"
                    color="#0088ff"
                    onClick={handleClick2}
                  />
                ) : (
                  <ViewOffIcon
                    cursor="pointer"
                    color="#0088ff"
                    onClick={handleClick2}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            {!passDoubleError ? (
              <FormHelperText
                textAlign={"center"}
                display="none"
              ></FormHelperText>
            ) : (
              <FormErrorMessage>
                Digite a senha colocada anteriormente
              </FormErrorMessage>
            )}
          </FormControl>

          <Flex m={2} my={6} flexDirection="column" justify="center">
            <Button
              size={"lg"}
              type="submit"
              bg="#0088ff"
              color="#fff"
              onClick={handleSendPass}
            >
              Recupere sua senha
            </Button>
            <FormHelperText textAlign={"center"}>
              <Link as={NextLink} href="/">
                Voltar
              </Link>{" "}
            </FormHelperText>
          </Flex>
        </Box>
      </FormControl>
      {alerts()}
    </Container>
  );
}
