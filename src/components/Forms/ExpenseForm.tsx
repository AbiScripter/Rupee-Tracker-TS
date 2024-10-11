import { Form, DatePicker, Input, InputNumber, Select, Button } from "antd";
import { genRandomKey } from "../../App";
import { useDispatch } from "react-redux";
import { addExpense, addGraph } from "../../redux/userSlice";
import { Moment } from "moment";

type ExpenseFormProps = {
  onModalOpenClose: (modalState: boolean) => void;
};

type ExpenseDataType = {
  amount: number;
  createdAt: Moment;
  key: number;
  source: string;
  tag: string;
  type: string;
};

const ExpenseForm = ({ onModalOpenClose }: ExpenseFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleAddExpense = async (data: ExpenseDataType) => {
    // console.log(data);
    const expenseData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: data.createdAt.toString(),
      type: "expense",
      key: genRandomKey(),
    };

    dispatch(addExpense(expenseData));

    dispatch(
      addGraph({
        amount: -data.amount,
        createdAt: data.createdAt.toISOString(),
      })
    );

    onModalOpenClose(false);
    form.resetFields();
  };
  return (
    <Form onFinish={handleAddExpense} form={form} variant="filled">
      <Form.Item
        label="source"
        name="source"
        rules={[
          { required: true, message: "Please input your source of expense!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="amount"
        name="amount"
        rules={[{ required: true, message: "Please input amount!" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="created"
        name="created"
        rules={[{ required: true, message: "Please enter date!" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="tag"
        name="tag"
        rules={[{ required: true, message: "Please enter tag!" }]}
      >
        <Select>
          <Select.Option value="housing">Housing</Select.Option>
          <Select.Option value="groceries">Groceries/Food</Select.Option>
          <Select.Option value="healthcare">Healthcare</Select.Option>
          <Select.Option value="debt">Debt Payments</Select.Option>
          <Select.Option value="entertainment">Entertainmet</Select.Option>
          <Select.Option value="education">Education</Select.Option>
          <Select.Option value="personal">Personal/Clothing</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Add Expense
      </Button>
    </Form>
  );
};

export default ExpenseForm;
