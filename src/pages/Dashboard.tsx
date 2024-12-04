import { useSelector } from "react-redux";
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
import LogOut from "../components/LogOut";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  let today = new Date().toDateString();

  return (
    <div className="app-container">
      <SideBar />
      <div className="content-container">
        <div className="content-header">
          <div>
            <h2>{`Hey, ${user.name.slice(0, 1).toUpperCase()}${user.name.slice(
              1
            )}`}</h2>
            <p>{today}</p>
          </div>
          <LogOut />
        </div>
        <div className="content-body">
          {activeTab === "status board" && <StatusBoard user={user} />}
          {activeTab === "reports" && <Reports user={user} />}
          {activeTab === "transactions" && <TransactionsTable />}
        </div>
      </div>
    </div>
  );
};

const StatusBoard = ({ user }: { user: UserState }) => {
  return (
    <div className="status-board">
      <div className="card card-balance">
        <h3>Available Balance</h3>
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

const Reports = ({ user }: { user: UserState }) => {
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
