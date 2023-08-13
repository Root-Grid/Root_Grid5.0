const mongoose = require("mongoose");
// const colors = require("colors");

// const connectDB1 = () => {
//     console.log('into the module');
// };

const uri = `mongodb+srv://sarthpatel1411:RootFlipkart@cluster0.ezgvcxq.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
connectDB();
module.exports = connectDB;