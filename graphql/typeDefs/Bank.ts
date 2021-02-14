import { gql } from "apollo-server-express";

const schema = gql`
  type Bank {
    _id: ID
    name: String
    rate: Float
    loan: Float
    downPayment: Float
    term: Int
  }

  extend type Query {
    getAllBanks: [Bank!]!
    getBank(id: String): Bank!
  }

  type Result {
    status: String!
  }

  extend type Mutation {
    addNewBank(
      name: String!
      rate: Float!
      loan: Float!
      downPayment: Float!
      term: Int!
    ): Bank!

    updateBank(
      id: String!
      name: String!
      rate: Float!
      loan: Float!
      downPayment: Float!
      term: Int!
    ): Bank!

    deleteBank(id: String!): Result!
  }
`;

export default schema;
