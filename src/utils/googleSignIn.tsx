import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";

type googleSignInProps = {
  setLoading: (loadingState: boolean) => void;
};
const googleSignIn = async ({ setLoading }: googleSignInProps) => {
  // Set loading to true when starting the sign-in process
  setLoading(true);

  try {
    const result = await signInWithPopup(auth, provider);
    // Set loading to false once the sign-in is complete
    setLoading(false);

    // The signed-in user info.
    const user = result.user;

    // Return the user data
    return { user };
  } catch (error) {
    // Set loading to false if there's an error
    setLoading(false);

    const errorMessage = (error as Error).message;
    // const errorCode = (error as Error).code;
    // Handle errors
    // const errorCode = error.code;
    // const errorMessage = error.message;
    toast.error(errorMessage);
    // const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(`Error during sign-in: ${errorMessage} (Code:)`);
    // Return just null so that in googleLoginForm we can use if block truthy values to skip errors
    return null;
  }
};

export default googleSignIn;

//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
