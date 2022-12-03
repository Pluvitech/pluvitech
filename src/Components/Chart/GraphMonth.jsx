import React, { useState, useEffect, useRef } from "react";
import { Flex, Button, Box, useDisclosure, Skeleton } from "@chakra-ui/react";
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
import DateTableMonth from "../Datatable/tableMonth";
import { api } from "../../lib/api";
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;

export default function Graph() {
  let Data = [];
  let qtdChuva = [];

  let arrayQtd = [];

  let ArrayMes = [];
  let ArrayGastos = [];
  let ArrayConsumo = [];

  let chartRef = useRef(null);
  const [filterDates, setFilterDates] = useState([]);

  const [DataInit, setDataInit] = useState({ id: null, date: "" });
  const [DataEnd, setDataEnd] = useState({ id: null, date: "" });

  const [IDataInit, setIDataInit] = useState(-1);
  const [IDataEnd, setIDataEnd] = useState(-1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoaded, setIsLoaded] = React.useState(false);

  const chartData = {
    labels: Data,
    datasets: [
      {
        label: "Indíce Pluviométrico",
        data: qtdChuva,
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

  function addData(labels, data) {
    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chartRef.current.data.datasets.forEach((dataset) => {
      dataset.data = data;
    });
    chartRef.current.update("active");
  }

  useEffect(() => {
    api
      .get("/mainMonth")
      .then((res) => {
        const data = res.data.map(({ amount, month }) => ({
          quantidade: amount,
          data: new Date(new Date().setMonth(month - 1)).toLocaleString(
            "pt-BR",
            {
              month: "long",
            }
          ),
        }));

        data.map((dates) => {
          Data.push(dates.data);
        });

        data.map((dates) => {
          arrayQtd.push(dates.quantidade);
        });

        //console.log(data);

        addData(Data, arrayQtd);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    api
      .get("/consultaConsumo")
      .then((res) => {
        const dataConsumo = res.data.map(({ mes, gastos, consumo }) => ({
          mes,
          consumo,
          gastos,
        }));

        dataConsumo.map((dates) => {
          ArrayMes.push(dates.mes);
        });

        dataConsumo.map((dates) => {
          ArrayGastos.push(dates.gastos);
        });

        dataConsumo.map((dates) => {
          ArrayConsumo.push(dates.consumo);
        });

        // addData(ArrayConsumo, ArrayMes, ArrayGastos);
        // setIsLoaded(true);
        // console.log(ArrayMes, ArrayConsumo, ArrayGastos);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Box w={['sm', 'md', 'lg', 'xl', '2xl']} bgColor={"#fff"} borderRadius={10} m="5px auto">    
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
      <Box w={'100%'}>
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Dialog open={isOpen} close={onClose} />

          <Box m={"5px"}>
            <Button onClick={onOpen} colorScheme={"blue"} color={"#fff"}>
              Registrar Consumo
            </Button>
          </Box>

          
        </Flex>            
      </Box>
    </Box>
  );
}
