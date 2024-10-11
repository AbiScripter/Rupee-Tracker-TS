import { Button } from "antd";
import { useState } from "react";
import googleSignIn from "../../utils/googleSignIn";
import { useSelector } from "react-redux";
import createDoc from "../../utils/createDocUtils";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const GoogleLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  function setLoading(loadState: boolean) {
    setIsLoading(loadState);
  }

  async function handleGoogleSignIn() {
    const googleDataFromFirebase = await googleSignIn({ setLoading });

    //if the received data is not null
    if (googleDataFromFirebase) {
      const googleData = {
        name: googleDataFromFirebase.user?.displayName || "",
        email: googleDataFromFirebase.user?.email || "",
        uid: googleDataFromFirebase.user?.uid || "",
      };

      console.log(googleData);
      createDoc(googleData, userData);
      navigate("/dashboard");
    }
  }
  return (
    <Button
      type="primary"
      block
      onClick={handleGoogleSignIn}
      loading={isLoading}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLoginForm;
