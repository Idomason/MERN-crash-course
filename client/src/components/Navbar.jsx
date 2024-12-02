import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";

import { LuPlusSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoMoonSharp, IoSunny } from "react-icons/io5";
import { useColorMode } from "./ui/color-mode";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        height={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bg="blue.500"
          fontSize={{ base: "lg", sm: "2xl" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear-gradient({colors.cyan.200}, {colors.blue.500})"
          bgClip={"text"}
        >
          <Link to={"/"}>Elistical Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button colorPalette={"blue"}>
              <LuPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} variant={"subtle"}>
            {colorMode === "light" ? <IoMoonSharp /> : <IoSunny size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
