import React, { useState, useEffect } from "react";
import {
  Flex,
  Spacer,
  FormControl,
  Container,
  Select,
  FormErrorMessage,
  Button,
  FormLabel,
  Box,
  Image,
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
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { ChatIcon, EmailIcon } from "@chakra-ui/icons";
import axios from "axios";
import { api } from "../../lib/api";

export default function RecuperaPerguntaPage() {
  const navigate = useNavigate();

  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  let [perguntaError, SetPerguntaError] = useState(false);
  let [respostaError, SetRespostaError] = useState(false);

  const [email, setEmail] = useState("");
  let [errorMail, setErrorMail] = useState(false);

  const [userState, setUserState] = useState(0);

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const perguntaHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pergunta = event.target.value;
    setPergunta(pergunta);
    console.log(pergunta);
  };

  const respostaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resposta = event.target.value;
    setResposta(resposta);
    console.log(resposta);
  };

  const validationMail = () => {
    if (email == "") {
      setErrorMail(true);
    } else {
      setErrorMail(false);
    }
  };

  const validationQuestion = () => {
    if (pergunta.trim() == "") {
      console.log("pergunta vazia");
      SetPerguntaError(true);
    } else {
      console.log("pergunta está preenchida" + pergunta.trim());
      SetPerguntaError(false);
    }
  };

  const validationAnwser = () => {
    if (resposta.trim() == "") {
      SetRespostaError(true);
    } else {
      SetRespostaError(false);
    }
  };

  const handleSendMail = async (values: any) => {
    validation();

    if (respostaError == false) {
      const response = await api.post("/recupera", {
        email,
        pergunta,
        resposta,
      });

      localStorage.setItem("Pluvitech-email", email);
      setUserState(response.status);
      console.log(response.status);

      onOpen();
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/recupera-senha");
        }, 3000);
      } else {
        console.log("Resposta Incorreta");
      }
    }
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const setStatus = () => {
    if (userState == 400 || userState == 500) {
      return "error";
    } else if (userState == 200) {
      return "success";
    }
  };

  const setTitle = () => {
    if (userState == 400) {
      return "Pergunta de segurança não compatível";
    } else if (userState == 500) {
      return "Resposta de segurança não compatível";
    } else if (userState == 200) {
      return "Pergunta e Resposta de segurança comparada com sucesso";
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
    validationAnwser();
    validationQuestion();
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

        <Heading color="#0088ff" size="md" m={4} textAlign="center">
          Confirmação da Resposta de Segurança{" "}
        </Heading>

        <Box mx={10}>
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
                Selecione o e-mail cadastrado
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email é requerido.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={perguntaError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="usuario">
              Pergunta de Segurança
            </FormLabel>
            <Select
              id="select"
              value={pergunta}
              onChange={perguntaHandler}
              isInvalid={perguntaError}
              placeholder=" "
              variant="filled"
              borderWidth="2px"
              borderColor={"#0088ff"}
            >
              <option value="0">Qual o nome do seu primeiro pet ?</option>
              <option value="1">
                Qual foi a primeira escola que você estudou ?
              </option>
              <option value="2">Qual é sua comida favorita ?</option>
            </Select>
            {!perguntaError ? (
              <FormHelperText display="none"></FormHelperText>
            ) : (
              <FormErrorMessage>
                Selecione uma resposta de segurança válida
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={respostaError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="resposta">
              Resposta
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="resposta"
                name="resposta"
                value={resposta}
                onChange={respostaHandler}
                variant="filled"
                bg={"#fff"}
                color="#0088ff"
                borderWidth="2px"
                borderColor={"#0088ff"}
              />
              <InputRightElement>
                <ChatIcon color="#0088ff" />
              </InputRightElement>
            </InputGroup>
            {!respostaError ? (
              <FormHelperText display="none"></FormHelperText>
            ) : (
              <FormErrorMessage>
                Selecione uma resposta válida.
              </FormErrorMessage>
            )}
          </FormControl>

          <Flex m={2} my={6} flexDirection="column" justify="center">
            <Button
              size={"lg"}
              type="submit"
              bg="#0088ff"
              color="#fff"
              onClick={handleSendMail}
            >
              Comparar Respostas
            </Button>
            <FormHelperText textAlign={"center"}>
              <Link as={ReactLink} to="/">
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
