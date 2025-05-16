import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Faisal:cse470project@cluster0.7yxvkzg.mongodb.net/cse470", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

export default mongoose;
