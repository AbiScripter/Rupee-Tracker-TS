import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import IncomeForm from "../Forms/IncomeForm";
import { RootState } from "../../redux/store";

const Income = () => {
  const user = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);

  function handleModalOpenClose(modalState: boolean) {
    setOpenModal(modalState);
  }

  const showModal = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <h3>Income</h3>
      <h1>₹{user.totalIncome}</h1>
      <Button onClick={showModal}>Add Income</Button>
      <Modal
        open={openModal}
        title="Income"
        onCancel={handleCancel}
        footer={null}
      >
        <IncomeForm onModalOpenClose={handleModalOpenClose} />
      </Modal>
    </>
  );
};

export default Income;
