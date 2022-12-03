import { Box } from "@chakra-ui/react";
import TabbarPage from "../Components/Tabbar/TabbarPage";
import MainPage from "../Components/Main/MainPage";

export default function Main() {
  return (
    <Box bgColor="#0088ff" minH="100vh" height={"max-content"}>
      <TabbarPage />
      <MainPage />
    </Box>
  );
}
