import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/productStore";
import { toaster } from "../components/ui/toaster";
import { useColorModeValue } from "../components/ui/color-mode";

export default function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  async function handleAddProduct() {
    const { success } = await createProduct(newProduct);

    if (!success) {
      toaster.create({
        title: "Error",
        description: "Failed to create product",
        status: "error",
        isClosable: true,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product created successfully",
        status: "success",
        isClosable: true,
        type: "success",
      });
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"lg"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
            />

            <Input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct({ ...newProduct, price: event.target.value })
              }
            />

            <Input
              name="image"
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={(event) =>
                setNewProduct({ ...newProduct, image: event.target.value })
              }
            />
            <Button w={"full"} onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
