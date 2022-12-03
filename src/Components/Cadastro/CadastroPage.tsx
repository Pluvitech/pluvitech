import React, { useState, useEffect } from "react";
import {
  Flex,
  Spacer,
  FormControl,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormLabel,
  Box,
  Image,
  Heading,
  FormErrorMessage,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FormHelperText, Link } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { api } from "../../lib/api";

export default function CadastroPage() {
  const navigate = useNavigate();

  const [users, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmesenha, setSenha2] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  const [visible, setVisible] = React.useState(false);
  const [visibleConfirme, setVisible2] = React.useState(false);

  const [userState, setUserState] = useState(0);

  const handleClick = () => setVisible(!visible);
  const handleClick2 = () => setVisible2(!visibleConfirme);

  let [userError, setUserError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [senhaError, setSenhaError] = useState(false);
  let [confirmesenhaError, setSenha2Error] = useState(false);
  let [perguntaError, SetPerguntaError] = useState(false);
  let [respostaError, SetRespostaError] = useState(false);

  const userHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = event.target.value;
    setUser(newUser);
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const passHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = event.target.value;
    setSenha(newPass);
  };

  const confirmeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = event.target.value;
    setSenha2(newPass);
  };

  const perguntaHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pergunta = event.target.value;
    setPergunta(pergunta);
  };

  const respostaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resposta = event.target.value;
    setResposta(resposta);
  };

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    validation();
    if (
      userError == false &&
      emailError == false &&
      senhaError == false &&
      confirmesenhaError == false &&
      perguntaError == false &&
      respostaError == false
    ) {
      handleRegister;
    }
  };

  const validationUser = () => {
    if (users == "") {
      setUserError(true);
    } else {
      setUserError(false);
    }
  };

  const validationMail = () => {
    if (email == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validationPass = () => {
    if (senha == "") {
      setSenhaError(true);
    } else {
      setSenhaError(false);
    }
  };

  const validationDoublePass = () => {
    if (confirmesenha == "" || confirmesenha !== senha) {
      setSenha2Error(true);
    } else {
      setSenha2Error(false);
    }
  };

  const validationQuestion = () => {
    if (pergunta == "") {
      SetPerguntaError(true);
    } else {
      SetPerguntaError(false);
    }
  };

  const validationAnwser = () => {
    if (resposta == "") {
      SetRespostaError(true);
    } else {
      SetRespostaError(false);
    }
  };

  const validation = () => {
    validationUser();
    validationMail();
    validationPass();
    validationDoublePass();
    validationAnwser();
    validationQuestion();
  };

  const handleRegister = async (values: any) => {
    const response = await api.post("/register", {
      users,
      email,
      senha,
      pergunta,
      resposta,
    });

    onOpen();
    setUserState(response.status);

    if (response.status === 201) {
      limpar();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const setStatus = () => {
    if (userState == 200 || userState == 201) {
      return "success";
    } else {
      return "error";
    }
  };

  const setTitle = () => {
    if (userState == 200 || userState == 201) {
      return "Usuário cadastrado com sucesso";
    } else {
      return "Houve um erro ao inserir o registro";
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

  const limpar = () => {
    setUser("");
    setEmail("");
    setSenha("");
    setSenha2("");
    setPergunta("");
    setResposta("");
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
          Cadastro
        </Heading>

        <Box mx={10}>
          <FormControl isInvalid={userError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="usuario">
              Usuário
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="user"
                name="user"
                value={users}
                onChange={userHandler}
                variant="filled"
                bg={"#fff"}
                color="#0088ff"
                borderWidth="2px"
                borderColor={"#0088ff"}
              />
              <InputRightElement>
                <FaUserAlt color="#0088ff" size={16} />
              </InputRightElement>
            </InputGroup>
            {!userError ? (
              <FormHelperText display="none"></FormHelperText>
            ) : (
              <FormErrorMessage>
                Selecione um nome de usuário válido.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={emailError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="usuario">
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
            {!emailError ? (
              <FormHelperText textAlign={"center"} display="none">
                Selecione seu melhor e-mail
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
              id="pergunta"
              value={pergunta}
              name="pergunta"
              onChange={perguntaHandler}
              isInvalid={perguntaError}
              placeholder=" "
              variant="filled"
              borderWidth="2px"
              borderColor={"#0088ff"}
            >
              <option value="0">Qual o nome do seu primeiro pet?</option>
              <option value="1">
                Qual foi a primeira escola que voce estudou?
              </option>
              <option value="2">Qual é sua comida favorita?</option>
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
            <FormLabel fontSize="18" color="#0088ff" htmlFor="usuario">
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

          <FormControl isInvalid={senhaError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="pass">
              Senha
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="pass"
                name="password"
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
            {!senhaError && senha == confirmesenha ? (
              <FormHelperText
                textAlign={"center"}
                display="none"
              ></FormHelperText>
            ) : (
              <FormErrorMessage>Preencha uma senha válida</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={confirmesenhaError} m={2}>
            <FormLabel fontSize="18" color="#0088ff" htmlFor="pass">
              Confirme a senha
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="pass2"
                value={confirmesenha}
                onChange={confirmeHandler}
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
            {!confirmesenhaError ? (
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
              onClick={handleRegister}
            >
              Nova conta
            </Button>
            <FormHelperText textAlign={"center"}>
              Já tem conta ?{" "}
              <Link as={ReactLink} to="/">
                Clique aqui
              </Link>{" "}
            </FormHelperText>
          </Flex>
        </Box>
      </FormControl>
      {alerts()}
    </Container>
  );
}
