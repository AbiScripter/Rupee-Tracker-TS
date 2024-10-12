import { useDispatch, useSelector } from "react-redux";
import { changeActiveTab } from "../../redux/tabSlice";
import { RootState } from "../../redux/store";

const SideBar = () => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  const dispatch = useDispatch();
  console.log(activeTab);
  function handleClick(tab: string) {
    dispatch(changeActiveTab(tab));
  }

  return (
    <div>
      <h2 onClick={() => handleClick("dashboard")}>DashBoard</h2>
      <h2 onClick={() => handleClick("transactions")}>Transactions</h2>
      <h2 onClick={() => handleClick("reports")}> Reports/Analytics</h2>
    </div>
  );
};

export default SideBar;
export {};
