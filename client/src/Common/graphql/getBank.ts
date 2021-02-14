import { gql } from "@apollo/client";

const getBank = gql`
  query getBank($id: String!) {
    getBank(id: $id) {
      _id
      name
      rate
      loan
      downPayment
      term
    }
  }
`;
export default getBank;
