import { Form, DatePicker, Input, InputNumber, Select, Button } from "antd";
import { genRandomKey } from "../../App";
import { useDispatch } from "react-redux";
import { Moment } from "moment";
import { addGraph, addIncome } from "../../redux/userSlice";

type IncomeFormProps = {
  onModalOpenClose: (modalState: boolean) => void;
};

type IncomeDataType = {
  amount: number;
  createdAt: Moment;
  key: number;
  source: string;
  tag: string;
  type: string;
};

const IncomeForm = ({ onModalOpenClose }: IncomeFormProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleAddIncome = (data: IncomeDataType) => {
    const incomeData = {
      amount: Number(data.amount),
      source: data.source,
      tag: data.tag,
      createdAt: data.createdAt.toString(), //!this may cause error
      type: "income",
      key: genRandomKey(),
    };

    dispatch(addIncome(incomeData));

    dispatch(
      addGraph({
        amount: data.amount,
        createdAt: data.createdAt.toISOString(), //!this may cause error
      })
    );

    onModalOpenClose(false);
    form.resetFields();
  };
  return (
    <Form
      onFinish={handleAddIncome}
      form={form}
      variant="filled"
      // style={{ maxWidth: 400, backgroundColor: "red" }}
    >
      <Form.Item
        label="source"
        name="source"
        rules={[
          { required: true, message: "Please input your source of income!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="amount"
        name="amount"
        rules={[{ required: true, message: "Please input amount!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="createdAt"
        name="createdAt"
        rules={[{ required: true, message: "Please enter date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="tag"
        name="tag"
        rules={[{ required: true, message: "Please enter tag!" }]}
      >
        <Select>
          <Select.Option value="salary">Salary</Select.Option>
          <Select.Option value="investment">Investment</Select.Option>
          <Select.Option value="freelance">Freelance</Select.Option>
          <Select.Option value="business">Business</Select.Option>
          <Select.Option value="rental">Rental</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Add Income
      </Button>
    </Form>
  );
};

export default IncomeForm;
