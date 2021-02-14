import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import "./BankItem.scss";

const BankItem = ({
  _id,
  name,
  rate,
  loan,
  downPayment,
  term,
  refetch,
}: IBank & { refetch: any }) => {
  const query = gql`
    mutation deleteBank($id: String!) {
      deleteBank(id: $id) {
        status
      }
    }
  `;
  const [removeBank] = useMutation(query, {
    onCompleted() {
      refetch();
    },
  });
  return (
    <div className="bank-item">
      <p className="bank-item__name">Bank name: {name}</p>
      <p className="bank-item__rate">Interest rate: {rate}%</p>
      <p className="bank-item__loan">Maximum loan: {loan}</p>
      <div
        className="bank-item__delete"
        onClick={() => removeBank({ variables: { id: _id } })}
      >
        &times;
      </div>

      <Link to={`/bank/${_id}`}>Edit</Link>
    </div>
  );
};
export default BankItem;
