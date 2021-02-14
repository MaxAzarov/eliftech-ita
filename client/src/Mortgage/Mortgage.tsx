import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import getBank from "../Common/graphql/getBank";
import Table from "./Table/Table";
import "./Mortgage.scss";

const Mortgage = () => {
  const [loan, setLoan] = useState<number>();
  const [downPayment, setDownPayment] = useState<number>();
  const [currentBank, setCurrentBank] = useState<string>();
  const [error, setError] = useState<string>("");

  const getAllBanksName = gql`
    query {
      getAllBanks {
        name
        _id
      }
    }
  `;

  const [getRequstedBank, { data: RequestedBank }] = useLazyQuery(getBank);

  const { data } = useQuery<{ getAllBanks: [{ name: string; _id: string }] }>(
    getAllBanksName
  );

  useEffect(() => {
    if (data && data.getAllBanks[0]?.name) {
      setCurrentBank(data.getAllBanks[0]._id);
    }
  }, [data]);

  return (
    <div className="mortgage">
      {data && data.getAllBanks.length > 0 ? (
        <div className="mortgage__wrapper">
          <input
            type="number"
            defaultValue={loan}
            placeholder="Enter loan"
            onChange={(e) => setLoan(+e.target.value)}
          />
          <input
            type="number"
            placeholder="Down payment"
            defaultValue={downPayment}
            onChange={(e) => setDownPayment(+e.target.value)}
          />

          <select
            name=""
            id=""
            onChange={(e) => setCurrentBank(e.target.value)}
          >
            {data &&
              data.getAllBanks.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <button
            className="mortgage__btn"
            onClick={() => {
              if (loan && loan > 0 && downPayment && downPayment > 0) {
                getRequstedBank({ variables: { id: currentBank } });
              } else {
                setError("Invalid data");
              }
            }}
          >
            Calculate
          </button>

          {error && (
            <p style={{ textAlign: "center", color: "red", marginTop: "10px" }}>
              {error}
            </p>
          )}
          {downPayment && loan && (
            <Table
              RequestedBank={RequestedBank}
              loan={loan}
              downPayment={downPayment}
            />
          )}
        </div>
      ) : (
        <p>Create new bank!</p>
      )}
    </div>
  );
};
export default Mortgage;
