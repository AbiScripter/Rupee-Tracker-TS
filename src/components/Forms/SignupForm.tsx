import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Input, Card } from "antd";
import signUpUser from "../../utils/signupUtils";
import createDoc from "../../utils/createDocUtils";
import GoogleLoginForm from "./GoogleLoginForm";
import { RootState } from "../../redux/store";
import FormImg from "../FormImg";

type signupFormProps = {
  toggleTab: () => void;
};

export type signupFormSubmitProps = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

const SignUpForm = ({ toggleTab }: signupFormProps) => {
  const userData = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function setLoading(loadState: boolean) {
    setIsLoading(loadState);
  }

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleFormSubmit(data: signupFormSubmitProps) {
    const signupDataFromFirebase = await signUpUser({ data, setLoading });

    //if signin succes it return userdata
    //if signin fails it returns null
    if (signupDataFromFirebase !== null) {
      const signupData = {
        name: signupDataFromFirebase?.displayName || data.username || "",
        email: signupDataFromFirebase?.email || "",
        uid: signupDataFromFirebase?.uid || "",
      };

      createDoc(signupData, userData);
      navigate("/dashboard");
    }

    // form.resetFields(); //reset the form
  }

  return (
    <>
      <FormImg />
      <Card className="signup-form-container">
        <h2>Create an account</h2>

        <Form
          layout="vertical"
          className="signup-form"
          onFinish={handleFormSubmit}
          form={form}
          // variant="filled"
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter Your Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter Your Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Your Password" />
          </Form.Item>

          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Sign Up
          </Button>

          <p>
            Already have an account ?&nbsp;
            <span className="form-link" onClick={toggleTab}>
              Login
            </span>
          </p>
          <h1 className="form-tag-text">Take charge of your money today!</h1>
          <GoogleLoginForm />
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
