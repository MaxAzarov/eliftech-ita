import { gql } from "@apollo/client";

const query = gql`
  query {
    getAllBanks {
      _id
      name
      rate
      loan
      downPayment
      term
    }
  }
`;
export default query;
