import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import getAllBanks from "./../../Common/graphql/GetAllBanks";
import "./BankCreation.scss";

const BankCreation = () => {
  const [bankName, setBankName] = useState<string>();
  const [rate, setRate] = useState<number>();
  const [loan, setLoan] = useState<number>();
  const [downPayment, setDownPayment] = useState<number>();
  const [term, setTerm] = useState<number>();
  const [error, setError] = useState<string>();
  const history = useHistory();

  const AddBank = gql`
    mutation addBank(
      $name: String!
      $rate: Float!
      $loan: Float!
      $downPayment: Float!
      $term: Int!
    ) {
      addNewBank(
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

  const [addBank] = useMutation(AddBank, {
    update: (cache, { data: createdBank }) => {
      const banks = cache.readQuery<{ getAllBanks: IBank[] }>({
        query: getAllBanks,
      });

      if (banks && banks?.getAllBanks.length > 0) {
        cache.writeQuery({
          query: getAllBanks,
          data: {
            getAllBanks: [...(banks.getAllBanks as any), createdBank],
          },
        });
      } else {
        cache.writeQuery({
          query: getAllBanks,
          data: {
            getAllBanks: [createdBank],
          },
        });
      }

      history.push("/banks");
    },
  });
  return (
    <div className="bank">
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
            if (
              bankName &&
              bankName?.length > 0 &&
              rate &&
              rate > 0 &&
              rate < 50 &&
              loan &&
              loan > 0 &&
              downPayment &&
              downPayment > 0 &&
              downPayment < 100 &&
              term &&
              term >= 1
            ) {
              addBank({
                variables: {
                  name: bankName,
                  rate,
                  loan,
                  downPayment,
                  term,
                },
              }).catch((err) => setError(err.message));
            } else {
              setError("Invalid data");
            }
          }}
        >
          Add bank
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
export default BankCreation;
