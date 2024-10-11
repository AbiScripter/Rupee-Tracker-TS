import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { signinFormProps } from "../components/Forms/SigninForm";

type signinUserProps = {
  data: signinFormProps;
  setLoading: (loadState: boolean) => void;
};

async function signInUser({ data, setLoading }: signinUserProps) {
  setLoading(true);
  try {
    const user = await signin(data.email, data.password);
    toast.success("Signed In Sucessfully");
    return user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    toast.error(errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
}

async function signin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Successfully signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle errors
    const errorMessage = (error as Error).message;
    throw new Error(errorMessage);
  }
}

export default signInUser;

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
