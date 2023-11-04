import mongoose from "mongoose";

export function dataBaseConnection() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
     mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, params);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
  }
}

// import { MongoClient } from "mongodb";
// import Obj from "mongodb";
// import dotenv from "dotenv";

// dotenv.config()
// const mongoConnectString = process.env.MONGO_URL 

// export async function dataBaseConnection(){
//     const client = new MongoClient(mongoConnectString);
//     await client.connect();
//     console.log("Mongo DB connected successfully");
//     return client;
// }

// export var ObjectId = Obj.ObjectId;
// export const client = await dataBaseConnection();