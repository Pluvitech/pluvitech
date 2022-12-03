import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
import Graph from "../Chart/Graph";
import GraphMonth from "../Chart/GraphMonth";
import DateTableDay from "../Datatable/tableDay";
import DateTableMonth from "../Datatable/tableMonth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;

export default function MainPage() {
  const [option, setOption] = useState(0);

  const setChart = () => {
    if (option == 0) {
      return (
        <Box m={"0 auto"}>
          <Graph />
          <DateTableDay />
        </Box>
      );
    } else if (option == 1) {
      return (
        <Box m={"0 auto"}>
          <GraphMonth />
          <DateTableMonth />
        </Box>
      );
    }
  };

  const handleClick1 = () => {
    setOption(0);
  };

  const handleClick2 = () => {
    setOption(1);
  };

  return (
    <Box>
      <Box m={"5px"} textAlign={"center"}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Opções
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleClick1}>Ver gráfico diário</MenuItem>
            <MenuItem onClick={handleClick2}>Ver gráfico mensal</MenuItem>
          </MenuList>
        </Menu>
        {setChart()}
      </Box>
    </Box>
  );
}
