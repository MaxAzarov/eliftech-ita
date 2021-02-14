import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import getBank from "../../Common/graphql/getBank";

import Spinner from "../../Common/Spinner/Spinner";
import query from "./../../Common/graphql/GetAllBanks";
import "./BankEdit.scss";

interface Props {
  id: string;
}

const BankEdit = ({ match }: RouteComponentProps<Props>) => {
  const [bankName, setBankName] = useState<string>();
  const [rate, setRate] = useState<number>();
  const [loan, setLoan] = useState<number>();
  const [downPayment, setDownPayment] = useState<number>();
  const [term, setTerm] = useState<number>();
  const history = useHistory();

  const { data, loading } = useQuery<{ getBank: IBank }>(getBank, {
    variables: { id: match.params.id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setBankName(data.getBank.name);
      setRate(data.getBank.rate);
      setLoan(data.getBank.loan);
      setDownPayment(data.getBank.downPayment);
      setTerm(data.getBank.term);
    }
  }, [data]);

  const updateBank = gql`
    mutation updateBank(
      $id: String!
      $name: String!
      $rate: Float!
      $loan: Float!
      $downPayment: Float!
      $term: Int!
    ) {
      updateBank(
        id: $id
        name: $name
        rate: $rate
        loan: $loan
        downPayment: $downPayment
        term: $term
      ) {
        _id
        name
        rate
        loan
        downPayment
        term
      }
    }
  `;

  const [UpdateBank] = useMutation(updateBank, {
    update: (cache, { data: updatedBank }) => {
      const banks = cache.readQuery<{ getAllBanks: IBank[] }>({ query });

      if (banks) {
        const othersBank = banks!.getAllBanks.filter(
          (item) => item._id !== match.params.id
        );
        cache.writeQuery({
          query,
          data: {
            getAllBanks: [...othersBank, updatedBank.updateBank],
          },
        });
      } else {
        cache.writeQuery({
          query,
          data: {
            getAllBanks: [updatedBank.updateBank],
          },
        });
      }

      history.push("/banks");
    },
  });

  return (
    <div className="bank">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bank__creation">
          <input
            type="text"
            placeholder="Enter bank name"
            defaultValue={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter interest rate"
            defaultValue={rate}
            min="0"
            onChange={(e) => setRate(+e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter maximum loan"
            defaultValue={loan}
            min="0"
            onChange={(e) => setLoan(+e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter minimum down payment(percent)"
            min="0"
            max="100"
            defaultValue={downPayment}
            onChange={(e) => setDownPayment(+e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Enter loan term(amount of month)"
            defaultValue={term}
            onChange={(e) => setTerm(+e.target.value)}
          />
          <button
            className="bank-creation__btn"
            onClick={() => {
              UpdateBank({
                variables: {
                  id: match.params.id,
                  name: bankName,
                  rate,
                  loan,
                  downPayment,
                  term,
                },
              });
            }}
          >
            Update Bank
          </button>
        </div>
      )}
    </div>
  );
};
export default withRouter(BankEdit);
