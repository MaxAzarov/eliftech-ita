import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import resolvers from "./graphql/resolvers/index";
import typeDefs from "./graphql/typeDefs/index";

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({ typeDefs, resolvers, playground: true });
const app: Application = express();

server.applyMiddleware({ app });

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());

const { MONGODB_URL = "" } = process.env;
const root = path.join(__dirname, "client", "build");

app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(PORT, () => {
      console.log("Server running! Port: " + PORT);
    });
  })
  .catch((e) => console.log(e));
