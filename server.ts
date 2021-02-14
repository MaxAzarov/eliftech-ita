import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import resolvers from "./graphql/resolvers/index";
import typeDefs from "./graphql/typeDefs/index";

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers, playground: true });
const app: Application = express();
const path = "/graphql";

server.applyMiddleware({ app, path });

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

const { MONGODB_URL = "" } = process.env;

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(PORT, () => {
      console.log("Server running! Port: " + PORT);
    });
  })
  .catch((e) => console.log(e));
