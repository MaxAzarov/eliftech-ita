import React from "react";
import { useQuery } from "@apollo/client";

import query from "../Common/graphql/GetAllBanks";
import Spinner from "../Common/Spinner/Spinner";
import BankItem from "./BankItem/BankItem";
import "./Banks.scss";

const Banks = () => {
  const { data, loading, refetch, error } = useQuery<{ getAllBanks: IBank[] }>(
    query
  );

  return (
    <div className="banks">
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {loading ? (
        <Spinner />
      ) : data?.getAllBanks.length === 0 ? (
        <p>There isn't any banks</p>
      ) : (
        <div className="banks__items">
          {data &&
            data.getAllBanks.map((item, index) => {
              return <BankItem key={index} {...item} refetch={refetch} />;
            })}
        </div>
      )}
    </div>
  );
};
export default Banks;
