import * as React from "react";
import { ChakraProvider, Skeleton, Box } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import axios from "axios";
import { api } from "../../lib/api";

type rainProps = {
  quantidade: number;
  data: string;
};

let dataTable2: rainProps[] = [];

const columnHelper = createColumnHelper<rainProps>();

const columns = [
  columnHelper.accessor("data", {
    cell: (info) => info.getValue(),
    header: "Data",
  }),
  columnHelper.accessor("quantidade", {
    cell: (info) => info.getValue(),
    header: "Quantidade",
  }),
];

export default function DateTableDay() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    api
      .get("/main")
      .then((res) => {
        const dados = res.data.map(
          ({ quantidade, data }: { quantidade: number; data: Date }) => ({
            quantidade: quantidade + "mm",
            data: new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" }),
          })
        );

        dataTable2 = [...dados];
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box w={['sm', 'md', 'lg', 'xl', '2xl']} m="0 auto">
      <Skeleton h={'100%'} isLoaded={isLoaded}>
        <DataTable columns={columns} data={dataTable2} />
      </Skeleton>
    </Box>
  );
}
