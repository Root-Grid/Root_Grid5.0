"use client";

import { useState } from "react";
import axios from "axios";

// export const metadata = {
//   title: "Add Product - RootKart!",
// };

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/add-product", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <button
          className="btn btn-primary btn-block"
          type="submit"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
