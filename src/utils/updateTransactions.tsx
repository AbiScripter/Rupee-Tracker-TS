import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserState } from "../redux/userSlice";

const updateTransactions = async (updatedUserState: UserState) => {
  console.log(updatedUserState.uid);
  console.log(updatedUserState.name);
  try {
    const docRef = doc(db, "users", updatedUserState.uid);
    await updateDoc(docRef, updatedUserState);
  } catch (error) {
    console.error("Error updating transactions:", error);
  }
};

export default updateTransactions;
