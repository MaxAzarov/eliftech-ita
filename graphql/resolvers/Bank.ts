import { Bank, IBank } from "../../models/Bank";

const resolvers = {
  Query: {
    getAllBanks: async function (): Promise<IBank[] | undefined> {
      try {
        const banks = await Bank.find({});
        return banks;
      } catch (e) {
        throw new Error("Can't get banks");
      }
    },
    getBank: async function (
      _: any,
      { id }: { id: string }
    ): Promise<IBank | null> {
      try {
        const bank = await Bank.findOne({ _id: id });
        return bank;
      } catch (e) {
        throw new Error("Can't get bank with this id!");
      }
    },
  },
  Mutation: {
    addNewBank: async function (
      _: any,
      { name, rate, loan, downPayment, term }: IBank
    ) {
      try {
        const candidateBank = await Bank.findOne({ name });
        if (!candidateBank) {
          const bank = new Bank({ name, rate, loan, downPayment, term });
          await bank.save();
          return {
            _id: bank._id,
            name,
            rate,
            loan,
            downPayment,
            term,
          };
        } else {
          throw new Error("Create bank with another name ");
        }
      } catch (e) {
        console.log(e);
        throw new Error(e.message);
      }
    },
    deleteBank: async function (_: any, { id }: { id: string }) {
      try {
        const bank = await Bank.findByIdAndDelete(id);
        return {
          status: "ok",
        };
      } catch (e) {
        throw new Error("Can't delete room");
      }
    },
    updateBank: async function (
      _: any,
      { name, rate, loan, downPayment, term, id }: IBank & { id: string }
    ) {
      try {
        let bank = await Bank.findOne({ _id: id });

        if (bank) {
          bank.name = name || bank.name;
          bank.rate = rate || bank.rate;
          bank.loan = loan || bank.loan;
          bank.downPayment = downPayment || bank.downPayment;
          bank.term = term || bank.term;
          await bank.save();
          return bank;
        } else {
          throw new Error("Can't change this room");
        }
      } catch (e) {
        throw new Error("Can't change this room");
      }
    },
  },
};

export default resolvers;
