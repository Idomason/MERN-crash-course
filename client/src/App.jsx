import Home from "./pages/Home";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import CreateProduct from "./pages/CreateProduct";
import { Route, Routes } from "react-router-dom";
// import { useColorModeValue } from "@chakra-ui/react";

function App() {
  // bg={useColorModeValue("gray.100", "gray.900")}
  return (
    <Box
      minH={"100vh"}
      bgGradient={"to-bl"}
      gradientFrom={"bg.info"}
      gradientTo={"bg.warning"}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Box>
  );
}

export default App;
