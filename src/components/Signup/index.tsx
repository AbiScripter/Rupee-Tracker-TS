import { useState } from "react";
import "./style.css";
import SignUpForm from "../Forms/SignupForm";
import SignInForm from "../Forms/SigninForm";
// import Header from "../Header";

const SignUpSignIn = () => {
  const [isSignInTab, setIsSignInTab] = useState(false);

  function toggleTab() {
    setIsSignInTab((prev) => !prev);
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="form-containers">
        {!isSignInTab ? (
          <SignUpForm toggleTab={toggleTab} />
        ) : (
          <SignInForm toggleTab={toggleTab} />
        )}
      </div>
    </div>
  );
};

export default SignUpSignIn;
export {};
