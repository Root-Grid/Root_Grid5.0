// pages/api/add-product.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { productName, productDescription, productImage, productPrice, seller } = req.body;

      // Process the data received from the form
      const responseData = {
        message: "Product added successfully",
        data: {
          productName,
          productDescription,
          productImage,
          productPrice,
          seller,
        },
      };

      // Here, you can handle the data, save it to a database, etc.

      // Respond with the processed data
      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "An error occurred." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
