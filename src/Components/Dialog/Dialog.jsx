import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Box,
  Flex,
  Icon,
  Select,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { BsBarChartFill } from "react-icons/bs";
import axios from "axios";
import { api } from "../../lib/api";

export default function Dialog(props) {
  const [Month, setMonth] = useState(0);
  const [consumoReais, setConsumoReais] = useState("");
  const [consumoQuantidade, setConsumoQuantidade] = useState("");

  let [errorMonth, setErrorMonth] = useState(false);
  const [errorConsumoReais, setErrorConsumoReais] = useState(false);
  const [errorConsumoQuantidade, setErrorConsumoQuantidade] = useState(false);

  const toast = useToast();

  const MonthHandler = (event) => {
    const val = event.target.value;
    setMonth(val);
    // new Intl.NumberFormat("pt-Br").format(val);
  };

  const consumoReaisHandler = (event) => {
    const val = event.target.value;
    setConsumoReais(val);
  };

  const consumoQuantidadeHandler = (event) => {
    const val = event.target.value;
    setConsumoQuantidade(val);
  };

  const validationMonth = () => {
    if (Month == 0) {
      setErrorMonth(true);
    } else {
      setErrorMonth(false);
    }
  };

  const validationConsumoReais = () => {
    if (consumoReais == "") {
      setErrorConsumoReais(true);
    } else {
      setErrorConsumoReais(false);
    }
  };

  const validationConsumoQuantidade = () => {
    if (consumoReais == "") {
      setErrorConsumoQuantidade(true);
    } else {
      setErrorConsumoQuantidade(false);
    }
  };

  const validation = () => {
    validationMonth();
    validationConsumoReais();
    validationConsumoQuantidade();
  };

  const handleConsumo = async (values) => {
    validation();

    if (
      errorMonth == false &&
      errorConsumoReais == false &&
      errorConsumoQuantidade == false
    ) {
      const response = await api.post("/consumo", {
        Month,
        consumoQuantidade,
        consumoReais,
      });
      if (response.status === 200) {
        toast({
          title: "Consumo registrado com sucesso",
          description: "Consumo registrado com sucesso",
          position: "bottom-right",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Modal isOpen={props.open} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0088ff" textAlign={"center"}>
            Pluvitech
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isInvalid={errorMonth} m={2}>
              <FormLabel fontSize="18" color="#0088ff" htmlFor="Month">
                Mês
              </FormLabel>
              <Select
                id="Month"
                value={Month}
                name="Month"
                onChange={MonthHandler}
                isInvalid={errorMonth}
                variant="filled"
                borderWidth="2px"
                borderColor={"#0088ff"}
                color="#0088ff"
              >
                <option value={1}>Janeiro</option>
                <option value={2}>Fevereiro</option>
                <option value={3}>Março</option>
                <option value={4}>Abril</option>
                <option value={5}>Maio</option>
                <option value={6}>Junho</option>
                <option value={7}>Julho</option>
                <option value={8}>Agosto</option>
                <option value={9}>Setembro</option>
                <option value={10}>Outubro</option>
                <option value={11}>Novembro</option>
                <option value={12}>Dezembro</option>
              </Select>
              {!errorMonth ? (
                <Box></Box>
              ) : (
                <FormErrorMessage>Month é requerido.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errorConsumoReais} m={2}>
              <FormLabel fontSize="18" color="#0088ff" htmlFor="Month">
                Valor:
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  children="R$: "
                  color="#0088ff"
                  fontWeight={"bold"}
                  pointerEvents="none"
                />
                <Input
                  id="consumoReais"
                  name="consumoReais"
                  type="text"
                  value={consumoReais}
                  onChange={consumoReaisHandler}
                  variant="filled"
                  bg={"#fff"}
                  color="#0088ff"
                  borderWidth="2px"
                  borderColor={"#0088ff"}
                  isRequired={true}
                />
              </InputGroup>
              {!errorMonth ? (
                <Box></Box>
              ) : (
                <FormErrorMessage>
                  Valor do consumo é requerido.
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errorConsumoQuantidade} m={2}>
              <FormLabel fontSize="18" color="#0088ff" htmlFor="Month">
                Quantidade:
              </FormLabel>
              <InputGroup size="md">
                <InputLeftElement color="#0088ff">
                  <Icon as={BsBarChartFill} />
                </InputLeftElement>
                <Input
                  id="consumoQuantidade"
                  name="consumoQuantidade"
                  type="text"
                  value={consumoQuantidade}
                  onChange={consumoQuantidadeHandler}
                  variant="filled"
                  bg={"#fff"}
                  color="#0088ff"
                  borderWidth="2px"
                  borderColor={"#0088ff"}
                  isRequired={true}
                />
              </InputGroup>
              {!errorMonth ? (
                <Box></Box>
              ) : (
                <FormErrorMessage>
                  Quantidade consumida é requerida.
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"space-evenly"}>
            <Button onClick={props.close}>Cancelar</Button>
            <Button colorScheme="blue" mr={3} onClick={handleConsumo}>
              Registrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
