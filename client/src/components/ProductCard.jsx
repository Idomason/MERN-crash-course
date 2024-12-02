import {
  Box,
  Button,
  DialogActionTrigger,
  DialogBackdrop,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "/src/components/ui/dialog";
import { useProductStore } from "../store/productStore";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";

export default function ProductCard({ product }) {
  const textColor = useColorModeValue("#ff004f", "#ff004f");
  const bg = useColorModeValue("white", "gray.800");
  const { updateProduct, deleteProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  async function handleDeleteProduct(productId) {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        type: "success",
      });
    }
  }

  async function handleUpdateProduct(productId, newlyUpdatedProduct) {
    const { success, message } = await updateProduct(
      productId,
      newlyUpdatedProduct
    );

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        type: "success",
      });
    }
  }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product?.image}
        alt={product?.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product?.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}>
          &#8358;{product?.price}
        </Text>
      </Box>
      <DialogRoot size="md">
        <DialogBackdrop />
        <HStack marginX={4} mb={4} spaceX={2}>
          <DialogTrigger>
            <IconButton aria-label="Edit product" colorPalette={"blue"}>
              <FiEdit />
            </IconButton>
          </DialogTrigger>
          <IconButton
            aria-label="Delete product"
            colorPalette={"red"}
            onClick={() => handleDeleteProduct(product?._id)}
          >
            <RiDeleteBin6Line />
          </IconButton>
        </HStack>

        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>Update Product</DialogHeader>
          <DialogBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct?.name}
                onChange={(event) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: event.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={updatedProduct?.price}
                onChange={(event) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: event.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Image URL"
                name="image"
                value={updatedProduct?.image}
                onChange={(event) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: event.target.value,
                  })
                }
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger>
              <Button
                colorScheme={"blue"}
                mr={3}
                onClick={() =>
                  handleUpdateProduct(product?._id, updatedProduct)
                }
              >
                Update
              </Button>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
