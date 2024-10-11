import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { signupFormProps } from "../components/Forms/SignupForm";

type singupUserProps = {
  data: signupFormProps;
  setLoading: (loadState: boolean) => void;
};

async function signUpUser({ data, setLoading }: singupUserProps) {
  setLoading(true);
  try {
    const user = await signUp(data.email, data.password);
    toast.success("Signed up successfully");
    return user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    toast.error(errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
}

async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Successfully signed up
    return userCredential.user;
  } catch (error) {
    // Handle errors
    const errorMessage = (error as Error).message;
    throw new Error(errorMessage);
  }
}

export default signUpUser;

// const createUser=(auth,email,password)=>{
//     createUserWithEmailAndPassword(auth, data.email, data.password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       console.log(user);
//       messageApi.open({
//         type: "success",
//         content: "User Created",
//       });
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       messageApi.open({
//         type: "error",
//         content: errorMessage,
//       });
//       setIsLoading(false);
//     });
// }
