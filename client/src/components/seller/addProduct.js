import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
// import { useHistory } from "react-router-dom";

const addProduct = () => {
  const toast = useToast();
  // const history = useHistory();
  // useState - React hook use to set the variable
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [sellerId, setSellerId] = useState();
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(false);

  // for handling the submit operation
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !price || !coins || !sellerId) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { name, description, image, price, sellerId, coins },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      {/* name */}
      <FormControl id="name" isRequired>
        <FormLabel>Product Name</FormLabel>
        <Input
          type="text"
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* description */}
      <FormControl id="description" isRequired>
        <FormLabel>Product description</FormLabel>
        <Input
          type="text"
          value={description}
          placeholder="Product description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      {/* image */}
      <FormControl id="image" isRequired>
        <FormLabel>Product Image</FormLabel>
        <Input
          type="text"
          value={image}
          placeholder="Product Image"
          onChange={(e) => setImage(e.target.value)}
        />
      </FormControl>

      {/* price */}
      <FormControl id="price" isRequired>
        <FormLabel>Product Price</FormLabel>
        <Input
          type="text"
          value={price}
          placeholder="Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormControl>

      {/* seller */}
      <FormControl id="sellerId" isRequired>
        <FormLabel>Product SellerId</FormLabel>
        <Input
          type="text"
          value={sellerId}
          placeholder="Product SellerId"
          onChange={(e) => setSellerId(e.target.value)}
        />
      </FormControl>

      {/* coins */}
      <FormControl id="coins" isRequired>
        <FormLabel>Product Coins</FormLabel>
        <Input
          type="text"
          value={coins}
          placeholder="Product Coins"
          onChange={(e) => setCoins(e.target.value)}
        />
      </FormControl>

      {/* Submit Button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Add Product
      </Button>
    </VStack>
  );
};

export default addProduct;
