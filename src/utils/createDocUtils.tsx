import { getDoc } from "firebase/firestore";
import { db, doc, setDoc } from "../firebase";
import { toast } from "react-toastify";
import { type UserState } from "../redux/userSlice";

type signUpDataProps = {
  name: string;
  email: string;
  uid: string;
};

type userAccountDataProps = UserState;

async function createDoc(
  signupData: signUpDataProps,
  userAccountData: userAccountDataProps
) {
  console.log(signupData);
  console.log(userAccountData);
  //getting userdata
  const userRef = doc(db, "users", signupData.uid);
  //if user signing up there wont be any userData
  const userData = await getDoc(userRef);
  //only create doc if userdata don't already exists in database
  //else dont create doc
  //!signUP
  if (!userData.exists()) {
    console.log("first time  signing up........");
    try {
      await setDoc(doc(db, "users", signupData.uid), {
        ...userAccountData,
        name: signupData.name,
        email: signupData.email,
        uid: signupData.uid,
      });

      // const subcollectionRef = collection(userRef, "transactions");
      // // console.log(userRef);
      // await addDoc(subcollectionRef, {
      //   ...userAccountData,
      // });

      toast.success("Account sucessfully created");
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  } else {
    //!google sign in
    console.log("Account Aleardy exists.....");
    toast.success("Logged In Successfully");
  }
}

export default createDoc;
