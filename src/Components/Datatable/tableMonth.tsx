import * as React from "react";
import { ChakraProvider, Skeleton, Box } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../../lib/api";

type rainProps = {
  quantidade: number;
  data: string;
};

type consumoProps = {
  mes: number;
  consumo: number;
  gastos: number;
};

type economyProps = {
  volume: number;
  economiaMetros: number;
  //economiaReais: number;
}

let dataChuva: rainProps[] = [];
let dataConsumido: consumoProps[] = [];
let dataDefault: (any)[] = [];

const columnHelper = createColumnHelper<rainProps | consumoProps | economyProps>();

const columns = [
  columnHelper.accessor("data", {
    cell: (info) => info.getValue(),
    header: "Data",
  }),
  columnHelper.accessor("quantidade", {
    cell: (info) => info.getValue(),
    header: "Coletado",
  }),
  columnHelper.accessor("volume", {
    cell: (info) => info.getValue(),
    header: "Volume de água coletada",
  }),
  columnHelper.accessor("consumo", {
    cell: (info) => info.getValue(),
    header: "Consumo",
  }),
  columnHelper.accessor("gastos", {
    cell: (info) => info.getValue(),
    header: "Gastos",
  }),
  columnHelper.accessor("economiaMetros", {
    cell: (info) => info.getValue(),
    header: "Economia (m³)",
  }),
  // columnHelper.accessor("economiaReais", {
  //   cell: (info) => info.getValue(),
  //   header: "Economia (R$)",
  // }),
];

export default function DateTableMonth() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    api
      .get("/mainMonth")
      .then((res) => {
        const dados = res.data.map(
          ({ amount, month }: { amount: number; month: number }) => ({
            quantidade: amount,
            data: new Date(new Date().setMonth(month - 1)).toLocaleString(
              "pt-BR",
              {
                month: "long",
              }
            ),
          })
        );

        dataChuva = [...dados];
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    api
      .get("/consultaConsumo")
      .then((res) => {
        const dataConsumo = res.data.map(
          ({
            mes,
            gastos,
            consumo,
          }: {
            mes: number;
            gastos: number;
            consumo: number;
          }) => ({
            data: new Date(new Date().setMonth(mes - 1)).toLocaleString(
              "pt-BR",
              {
                month: "long",
              }
            ),
            consumo: consumo,
            gastos: "R$" + Number(gastos)
          })
        );

        dataConsumido = [...dataConsumo];
        dataDefault = dataChuva.map((data, index) => ({          
          data: dataChuva[index].data,
          quantidade: dataChuva[index].quantidade + "mm",
          volume: (((dataChuva[index]?.quantidade) * 40) / 1000) + "(m³)", //quantidade coletada pelo arduino em milímetros * a área do telhado
          consumo: dataConsumido[index]?.consumo + "(m³)",
          gastos: dataConsumido[index]?.gastos,
          economiaMetros: ((dataConsumido[index]?.consumo) - (((dataChuva[index]?.quantidade) * 40) / 1000)) + "(m³)",
          //economiaReais: (((dataConsumido[index]?.consumo) - (((dataChuva[index]?.quantidade) * 40) / 1000)) * 21.75)
        }));
        console.log(dataDefault);
        setIsLoaded(true);
        // console.log(dataConsumido);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Box w={['sm', 'md', 'lg', 'xl', '2xl']} m="0 auto">
      <Skeleton h={'100%'} isLoaded={isLoaded} overflowX={'auto'}>
        <DataTable columns={columns} data={dataDefault} />
      </Skeleton>
    </Box>
  );
}
