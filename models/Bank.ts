import mongoose, { Document } from "mongoose";

export interface IBank extends Document {
  name: string;
  rate: number;
  loan: number;
  downPayment: number;
  term: number;
}

const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  loan: {
    type: Number,
    required: true,
    validate: {
      validator: function (loan: number) {
        return loan > 0;
      },
      message: (props) => `Loan can't be less than 0!`,
    },
  },
  // percent of loan
  downPayment: {
    type: Number,
    required: true,
    validate: {
      validator: function (downPayment: number) {
        return downPayment > 0;
      },
      message: (props) => `Down payment can't be less than 0!`,
    },
  },
  // amount of month
  term: {
    type: Number,
    required: true,
    validate: {
      validator: function (downPayment: number) {
        return downPayment > 0;
      },
      message: (props) => `Term can't be less than 0!`,
    },
  },
});

export const Bank = mongoose.model<IBank>("Bank", BankSchema);
