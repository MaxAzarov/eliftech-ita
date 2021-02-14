import React from "react";
import "./Table.scss";

interface Props {
  RequestedBank: any;
  downPayment: number;
  loan: number;
}
const Table = ({ RequestedBank, downPayment, loan }: Props) => {
  if (RequestedBank) {
    if (loan > RequestedBank.getBank.loan) {
      return <p>The loan exceeds the bank loan</p>;
    }

    if (loan < downPayment) {
      return <p>Invalid data</p>;
    }

    if (downPayment <= (loan * RequestedBank.getBank.downPayment) / 100) {
      return <p>Down Payment less than requested down payment</p>;
    }
    const normalizedData: any[] = [];
    for (let i = 0; i < RequestedBank.getBank.term; i++) {
      normalizedData.push({
        month: i,
        total: 0,
        interest: 0,
        loan: 0,
        equity: 0,
      });
    }
    const montlyRate = RequestedBank.getBank.rate / 100 / 12;
    const totalRate = (1 + montlyRate) ** RequestedBank.getBank.term;
    const monthlyPayment = (loan * montlyRate * totalRate) / (totalRate - 1);

    for (let i = 0; i < normalizedData.length; i++) {
      normalizedData[i].total = monthlyPayment;
    }

    let totalSum = loan;
    for (let i = 0; i < normalizedData.length; i++) {
      normalizedData[i].interest = totalSum * montlyRate;
      totalSum = totalSum - monthlyPayment;
    }

    const mainPart = [];
    for (let i = 0; i < normalizedData.length; i++) {
      mainPart.push(monthlyPayment - normalizedData[i].interest);
    }
    let totalSum2 = loan;

    for (let i = 0; i < mainPart.length; i++) {
      normalizedData[i].loan = totalSum2 - mainPart[i];
      totalSum2 = totalSum2 - mainPart[i];
    }

    let equity = downPayment as number;
    for (let i = 0; i < mainPart.length; i++) {
      equity += mainPart[i];
      normalizedData[i].equity = equity;
    }

    return (
      <>
        <table style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total payment</th>
              <th>Interest payment</th>
              <th>Loan balance</th>
              <th>Equity</th>
            </tr>
          </thead>
          <tbody>
            {normalizedData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.month + 1}</td>
                  <td>{item.total.toFixed(2)}</td>
                  <td>{item.interest.toFixed(2)}</td>
                  <td>{item.loan.toFixed(2)}</td>
                  <td>{item.equity.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bank-info">
          <span>Bank name: {RequestedBank.getBank.name}</span>
          <span>Loan Term: {RequestedBank.getBank.term} months </span>
          <span>Interest rate:{RequestedBank.getBank.rate}%</span>
        </div>
      </>
    );
  }

  return <div></div>;
};
export default Table;
