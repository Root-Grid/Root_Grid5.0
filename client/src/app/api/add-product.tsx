import axios from "axios";

export default async function handler(
  req: {
    method: string;
    body: { name: any; description: any; imageUrl: any; price: any };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: string }): void; new (): any };
    };
  },
) {
  if (req.method === "POST") {
    try {
      const { name, description, imageUrl, price } = req.body;

      // Send the data to your Express.js server
      const response = await axios.post("http://localhost:400/add-product", {
        name,
        description,
        imageUrl,
        price,
      });

      // Handle the response from the server
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "An error occurred." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
