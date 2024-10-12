import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import updateTransactions from "../utils/updateTransactions";

export type Income = {
  amount: number;
  createdAt: string;
  key: number;
  source: string;
  tag: string;
  type: string;
};

export type Expense = {
  amount: number;
  createdAt: string;
  key: number;
  source: string;
  tag: string;
  type: string;
};

export type Graph = {
  amount: number;
  createdAt: string;
};

export type UserState = {
  name: string;
  email: string;
  currBalance: number;
  incomes: Income[];
  expenses: Expense[];
  totalIncome: number;
  totalExpense: number;
  graphData: Graph[];
  uid: string;
};

const initialState: UserState = {
  name: "",
  email: "",
  currBalance: 0,
  incomes: [],
  expenses: [],
  totalIncome: 0,
  totalExpense: 0,
  graphData: [],
  uid: "",
};

const calcTotalIncome = (incomes: Income[]) => {
  return incomes.reduce((acc, curr) => acc + curr.amount, 0);
};

const calcTotalExpense = (expenses: Expense[]) => {
  return expenses.reduce((acc, curr) => acc + curr.amount, 0);
};

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     initiateUser: (state, action: PayloadAction<UserState>) => {
//       console.log(action.payload);
//       state = action.payload;
//       console.log(state.uid);
//     },

//     clearUser: (state) => {
//       state = initialState;
//     },

//     reset: (state) => {
//       state = initialState;
//     },

//     addIncome: (state, action: PayloadAction<Income>) => {
//       console.log(action.payload);
//       console.log(state.currBalance, state.uid);
//       state.incomes = [...state.incomes, action.payload];
//       state.totalIncome = calcTotalIncome(state.incomes);
//       state.currBalance = state.totalIncome - state.totalExpense;
//       updateTransactions(state);
//     },

//     addExpense(state, action: PayloadAction<Expense>) {
//       state.expenses = [...state.expenses, action.payload];
//       state.totalExpense = calcTotalExpense(state.expenses);
//       state.currBalance = state.totalIncome - state.totalExpense;
//       updateTransactions(state);
//     },

//     addGraph(state, action: PayloadAction<Graph>) {
//       state.graphData = [
//         ...state.graphData,
//         {
//           amount: action.payload.amount,
//           createdAt: action.payload.createdAt,
//         },
//       ];
//       updateTransactions(state);
//     },
//   },
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initiateUser: (state, action: PayloadAction<UserState>) => {
      // Update the properties of the state, instead of reassigning state
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.currBalance = action.payload.currBalance;
      state.incomes = action.payload.incomes;
      state.expenses = action.payload.expenses;
      state.totalIncome = action.payload.totalIncome;
      state.totalExpense = action.payload.totalExpense;
      state.graphData = action.payload.graphData;
      state.uid = action.payload.uid;
    },

    clearUser: (state) => {
      return initialState;
    },

    reset: (state) => {
      return initialState;
    },

    addIncome: (state, action: PayloadAction<Income>) => {
      state.incomes = [...state.incomes, action.payload];
      state.totalIncome = calcTotalIncome(state.incomes);
      state.currBalance = state.totalIncome - state.totalExpense;
      updateTransactions(state); // This will now have the correct state data
    },

    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses = [...state.expenses, action.payload];
      state.totalExpense = calcTotalExpense(state.expenses);
      state.currBalance = state.totalIncome - state.totalExpense;
      updateTransactions(state); // This will now have the correct state data
    },

    addGraph(state, action: PayloadAction<Graph>) {
      state.graphData = [
        ...state.graphData,
        {
          amount: action.payload.amount,
          createdAt: action.payload.createdAt,
        },
      ];
      updateTransactions(state);
    },
  },
});

export const {
  initiateUser,
  clearUser,
  addIncome,
  addExpense,
  addGraph,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
