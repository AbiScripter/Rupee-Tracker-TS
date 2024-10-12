import { useSelector } from "react-redux";
import Header from "../components/Header";
import Expense from "../components/Expense";
import Income from "../components/Income";
import DataTable from "../components/Tables";
import LineGraph from "../components/Charts/LineGraph";
import PieChart from "../components/Charts/PieChart";
import NoTransactions from "../components/NoTransactions";
import "./Dashboard.css";
import { RootState } from "../redux/store";

import { type UserState } from "../redux/userSlice";
import SideBar from "../components/Sidebar";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);

  return (
    <div className="app-container">
      <Header />
      <SideBar />
      <div className="content-container">
        {activeTab === "dashboard" && <BalanceContainer user={user} />}
        {activeTab === "reports" && <DataVisualization user={user} />}
        {activeTab === "transactions" && <TransactionsTable />}
      </div>
    </div>
  );
};

const BalanceContainer = ({ user }: { user: UserState }) => {
  return (
    <div className="balance-container">
      <div className="card card-balance">
        <h3>Balance</h3>
        <h1>₹{user.currBalance}</h1>
      </div>
      <div className="card">
        <Income />
      </div>
      <div className="card">
        <Expense />
      </div>
    </div>
  );
};

const DataVisualization = ({ user }: { user: UserState }) => {
  return (
    <div>
      {user.expenses.length === 0 && user.incomes.length === 0 ? (
        <NoTransactions />
      ) : (
        <div className="main-section">
          <div className="charts-container">
            <div className="chart line-graph-container">
              <LineGraph />
            </div>
            <div className="chart pie-chart-container">
              <PieChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransactionsTable = () => {
  return (
    <div>
      <DataTable />
    </div>
  );
};

export default Dashboard;
