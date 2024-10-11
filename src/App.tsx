import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initiateUser, UserState } from "./redux/userSlice";
// import PrivateRoutes from "./components/PrivateRoutes";
import Loader from "./components/Loader";
import SignupPage from "./pages/SignupPage";

// import Dashboard from "./pages/Dashboard";
//!code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const dispatch = useDispatch();

  //!initiate user data
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      //onSnapshot is the method for real time data collection
      const docRef = doc(db, "users", user.uid);
      const unsubscribeSnapshot = onSnapshot(
        docRef,
        (userDoc) => {
          if (!userDoc.exists()) return;
          //initiate the userdata with uid ,if its alrady singed initiate those data[cart,wishlist etc]
          let data = userDoc.data();
          const userData: UserState = {
            name: data.name || "", // fallback in case of missing fields
            email: data.email || "",
            currBalance: data.currBalance || 0,
            incomes: data.incomes || [],
            expenses: data.expenses || [],
            totalIncome: data.totalIncome || 0,
            totalExpense: data.totalExpense || 0,
            graphData: data.graphData || [],
            uid: data.uid || "",
          };

          // Dispatch with the correct type
          dispatch(initiateUser(userData));
        },
        (error) => console.error("Error fetching user data:", error)
      );

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
      />

      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SignupPage />} />
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* </Route> */}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export const genRandomKey = () => {
  return Math.floor(Math.random() * 100000);
};

export default App;
