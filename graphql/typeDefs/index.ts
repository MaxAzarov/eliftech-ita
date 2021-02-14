import { gql } from "apollo-server-express";
import bank from "./Bank";

const root = gql`
  type Response {
    status: String
    errors: [String]
  }
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;

export default [root, bank];
