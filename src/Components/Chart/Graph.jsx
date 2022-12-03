import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Button,
  FormLabel,
  Box,
  Input,
  useDisclosure,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";
import Dialog from "../Dialog/Dialog";
import DateTableDay from "../Datatable/tableDay";
import axios from "axios";
import { api } from "../../lib/api";
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;

export default function Graph() {

  //* Declaração de váriaveis *//
    const defaultValues = () => {
      api
      .get("/main")
      .then((res) => {
        const dados = res.data.map(({ quantidade, data }) => ({
          quantidade,
          data: new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" }),
        }));
        setDefaultValues(dados);  
        setIsLoaded(true);  
      });      
    }

    function setDefaultValues(defaultValues) {
      defaultValues.map((dates) => {
        Data.push(dates.data);
      });
      console.log(Data);
      defaultValues.map((dates) => {
        arrayQtd.push(dates.quantidade);
      });
    }

    let arrayQtd = [];
    let Data = [];

    let chartRef = useRef(null);

    const [filterDates, setFilterDates] = useState(Data);
    const [filterQtd, setFilterQtd] = useState(arrayQtd);

    const [DataInit, setDataInit] = useState(new Date());
    const [DataEnd, setDataEnd] = useState(new Date());

    const [IDataInit, setIDataInit] = useState(-1);
    const [IDataEnd, setIDataEnd] = useState(-1);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isLoaded, setIsLoaded] = React.useState(false);

    const toast = useToast();

    let counter = 0;

  //* Declaração de váriaveis *//


  /*  Handlers  */

    function DataInitHandler(event) {
      const dateStart = event.target.value;
      setDataInit(
        new Date(dateStart).toLocaleDateString("pt-br", { timeZone: "UTC" })
      );
    }

    function DataEndHandler(event) {
      const dateEnd = event.target.value;
      setDataEnd(
        new Date(dateEnd).toLocaleDateString("pt-br", { timeZone: "UTC" })
      );
    }

  /*  Handlers  */

  /*  Definição do gráfico  */
    const chartData = {
      labels: filterDates,
      datasets: [
        {
          label: "Índice Pluviométrico",
          data: filterQtd,
          backgroundColor: ["#0088fb"],
          borderColor: ["#000"],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chart = () => {
      const ctx = document.getElementById("myChart");
      chartRef = new Chartjs(ctx, config);
    };
  /*  Definição do gráfico  */

  /*  Funções do gráfico  */
    // Atualiza váriaveis --onclick do filtrar
    const update = () => {
      const dti = Data.indexOf(DataInit);
      const dte = Data.indexOf(DataEnd);
  
      if (dti !== -1 && dte !== -1) {
        updateFilter(dti, dte);
        setIDataInit(dti);
        setIDataEnd(dte);
      } else {
        toast({
          title: "Selecione uma data inicial e/ou final que tenha registro no sistema",
          position: "bottom-right",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    };
  
    const updateFilter = (indexStart, indexEnd) => {
      if (
        indexStart !== undefined &&
        indexStart !== null &&
        indexStart !== -1 &&
        indexEnd !== undefined &&
        indexEnd !== null &&
        indexEnd !== -1
      ) {
        const filteredDates = Data.slice(indexStart, indexEnd + 1);
        const filteredQtd = arrayQtd.slice(indexStart, indexEnd + 1);
        setFilterDates(filteredDates);
        setFilterQtd(filteredQtd);
      } else {
        console.log("Data inválida");
        console.log(indexStart, indexEnd);
      }
    };

    // Mexe diretamente no gráfico
    function resetData() {
      if (Data.length > filterDates.length && arrayQtd.length > filterQtd.length ) 
      {
        addData(Data, arrayQtd); //reseta o gráfico para o padrão;
        setFilterDates(Data); //seta filterDates com o valor padrão;
        setFilterQtd(arrayQtd); //seta filterQtd com o valor padrão;
      } else {
        toast({
          title: "Selecione PADRÃO após filtrar os dados e querer que eles voltem ao normal",
          position: "bottom-right",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    }

    function addData(labels, data) {
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      chartRef.current.data.datasets.forEach((dataset) => {
        dataset.data = data;
      });
      chartRef.current.update();
    }
  /*  Funções do gráfico  */

  /* useEffects */

    useEffect(() => {
      defaultValues()
    })

    useEffect(() => {
      if (
        IDataInit !== undefined &&
        IDataInit !== null &&
        IDataInit !== -1 &&
        IDataEnd !== undefined &&
        IDataEnd !== null &&
        IDataEnd !== -1
      ) {
        chartRef.current.data.labels = filterDates;
        chartRef.current.data.datasets.forEach((dataset) => {
          dataset.data = filterQtd;
        });
        chartRef.current.update("active");
      } else {
        console.log("Data inválida");
      }
    }, [filterDates, filterQtd]);
  /* UseEffects*/

  return (
    <Box w={['sm', 'md', 'lg', 'xl', '2xl']} bgColor={"#fff"} borderRadius={10} m={'5px auto'}>      
      <Skeleton height="300px" isLoaded={isLoaded}>
        <Bar
          onLoad={chart}
          ref={chartRef}
          id={"myChart"}
          w={['sm', 'md', 'lg', 'xl', '2xl']}
          height={300}
          data={chartData}
          options={{
            maintainAspectRatio: false,
          }}
          updateMode={"active"}
        />
      </Skeleton>
      <hr />
      <Box w={"100%"}>        
        <Flex
          justifyContent={"space-evenly"}
          alignItems={{sm:"center", md: 'flex-end'}}  
          padding={"5px"}   
          flexFlow={{sm:'column wrap', md:'row wrap', lg:'row wrap', xl: 'row wrap'}}
        >
          <Flex flexFlow={'row wrap'} justify={"center"} align={{sm: 'flex-end', md:"center"}}>
            <Box m={"5px"}>
              <FormLabel htmlFor="dateStart">Data inicial</FormLabel>
              <Input
                id="dateStart"
                name="dateStart"
                type="date"
                size="md"
                onChange={DataInitHandler}
                value={DataInit.date}
              />
            </Box>          

            <Box m={"5px"}>
              <FormLabel htmlFor="dateEnd">Data final</FormLabel>
              <Input
                id="dateEnd"
                name="dateEnd"
                onChange={DataEndHandler}
                size="md"
                type="date"
                value={DataEnd.date}
                />
            </Box>
          </Flex>

          <Dialog open={isOpen} close={onClose} />

          <Flex flexFlow={'row wrap'} justify={"center"} align={{base:'flex-end', sm: 'flex-end', md:"center"}}>
            <Box m={"5px"}>
              <Button color={"#fff"} colorScheme={"blue"} onClick={update}>
                Filtrar
              </Button>
            </Box>

            <Box m={"5px"}>
              <Button color={"#fff"} colorScheme={"blue"} onClick={resetData}>
                Padrão
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
