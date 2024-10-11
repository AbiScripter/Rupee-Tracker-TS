import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import ExpenseForm from "../Forms/ExpenseForm";
import { RootState } from "../../redux/store";

const Expense = () => {
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
      <h3>Expenses</h3>
      <h1>₹{user.totalExpense}</h1>
      <Button onClick={showModal}>Add Expense</Button>
      <Modal
        open={openModal}
        title="Expense"
        onCancel={handleCancel}
        footer={null}
      >
        <ExpenseForm onModalOpenClose={handleModalOpenClose} />
      </Modal>
    </>
  );
};

export default Expense;
