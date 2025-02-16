import { useDispatch, useSelector } from "react-redux";
import { changeActiveTab } from "../../redux/tabSlice";
import { RootState } from "../../redux/store";
import "./sidebar.css";
import { useState } from "react";
import burgerMenu from "../../assets/burger-menu-svgrepo-com.svg";

const SideBar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  function handleClick(tab: string) {
    dispatch(changeActiveTab(tab));
    // Close sidebar after clicking on mobile
    setIsMobileSidebarOpen(false);
  }

  function toggleSidebar() {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  }

  return (
    <div>
      {/* Burger Menu Button */}
      <button className="side-bar-burger-menu" onClick={toggleSidebar}>
        <img src={burgerMenu} alt="burger" style={{ width: "2rem" }} />
      </button>

      {/* <div className="side-bar">
        <div className="side-bar-header">
          <h2>{`${user.name.slice(0, 1).toUpperCase()}${user.name.slice(
            1
          )}`}</h2>
          <p>{user.email}</p>
        </div>
        <div className="sidebar-content">
          <CustomTab tabValue="dashboard" handleClick={handleClick} />
          <CustomTab tabValue="transactions" handleClick={handleClick} />
          <CustomTab tabValue="reports" handleClick={handleClick} />
        </div>
      </div> */}
      {/* Sidebar */}

      <div className={`side-bar ${isMobileSidebarOpen ? "open" : ""}`}>
        <div className="side-bar-header">
          <h2>
            {`${user.name.slice(0, 1).toUpperCase()}${user.name.slice(1)}`}
          </h2>
          <p>{user.email}</p>
        </div>
        <div className="sidebar-content">
          <CustomTab tabValue="status board" handleClick={handleClick} />
          <CustomTab tabValue="transactions" handleClick={handleClick} />
          <CustomTab tabValue="reports" handleClick={handleClick} />
        </div>
      </div>

      {/* Dark overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

type CustomTabProps = {
  tabValue: string;
  handleClick: (tabValue: string) => void;
};

const CustomTab = ({ tabValue, handleClick }: CustomTabProps) => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  return (
    <h2
      className={`tab ${activeTab === tabValue ? "active" : ""}`}
      onClick={() => handleClick(tabValue)}
    >
      {tabValue
        .split(" ")
        .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1) + " ")}
    </h2>
  );
};
export default SideBar;
export {};
