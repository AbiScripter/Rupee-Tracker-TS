import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Button, Modal } from "antd";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/userSlice";
import { toast } from "react-toastify";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  //!if the user not signed out, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  async function handleSignOut() {
    try {
      await signOut(auth);
      dispatch(reset());
      // Sign-out successful.
      navigate("/");
      toast.success("signed out");
    } catch (error) {
      // An error happened.
      const errorMessage = (error as Error).message;
      console.error(errorMessage);
    }
  }

  return <ConfirmLogout handleSignOut={handleSignOut} />;
};

type ConfirmLogoutProps = {
  handleSignOut: () => void;
};

const ConfirmLogout = ({ handleSignOut }: ConfirmLogoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleSignOut();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className="sign-out-btn" onClick={showModal}>
        <span className="log-out-text">SignOut</span>
      </Button>
      <Modal
        className="confirm-logout-modal"
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" danger onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>Are you sure to log out</p>
      </Modal>
    </>
  );
};

export default Header;
export {};
