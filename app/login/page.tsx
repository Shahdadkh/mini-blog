"use client";
import { Formik, Form, Field } from "formik";

interface typeValue {
  username: string;
  password: string;
}

const login = () => {
  const initialValues: typeValue = {
    username: "",
    password: "",
  };

  const handleSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="border border-transparent w-2/6 h-72 mx-auto mt-28">
            <Field
              type="text"
              name="username"
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="نام کاربری"
            />
            <Field
              type="password"
              name="password"
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="رمز عبور"
            />
            <button
              type="submit"
              className="w-4/6 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none mx-auto mt-4"
            >
              ورود
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default login;