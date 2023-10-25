"use client";
import { Formik, Form, Field } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";

interface typeValue {
  username: string;
  password: string;
}

const login = () => {
  const [show, setShow] = useState(false);
  const initialValues: typeValue = {
    username: "",
    password: "",
  };

  const handleSubmit = (value: any) => {
    try {
      fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
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
            <div className="relative border border-transparent">
              <Field
                type={show ? "text" : "password"}
                name="password"
                className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                placeholder="رمز عبور"
              />
              <div onClick={() => setShow(!show)}>
                {show ? (
                  <HiEye className="absolute left-24 top-8 w-7 h-7 text-gray-500 cursor-pointer" />
                ) : (
                  <HiEyeOff className="absolute left-24 top-8 w-7 h-7 text-gray-500 cursor-pointer" />
                )}
              </div>
            </div>
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
