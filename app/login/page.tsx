"use client";
import { Formik, Form, Field } from "formik";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-toastify";
import { logIn } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

interface typeValue {
  username: string;
  password: string;
}

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [show, setShow] = useState(false);
  const initialValues: typeValue = {
    username: "",
    password: "",
  };

  const handleSubmit = (value: any) => {
    try {
      fetch(`${process.env.url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message === "Wrong password." ||
            data.message === "User not Found"
          ) {
            toast.error("نام کاربری یا رمز عبور اشتباه است");
          } else {
            dispatch(logIn(data));
            router.push("/");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="border border-transparent w-full sm:w-2/6 h-72 mx-auto mt-28">
            <Field
              type="text"
              name="username"
              required
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="نام کاربری"
            />
            <div className="relative border border-transparent">
              <Field
                type={show ? "text" : "password"}
                name="password"
                required
                className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                placeholder="رمز عبور"
              />
              <div onClick={() => setShow(!show)}>
                {show ? (
                  <HiEye className="absolute left-20 sm:left-24 top-8 w-7 h-7 text-gray-500 cursor-pointer" />
                ) : (
                  <HiEyeOff className="absolute left-20 sm:left-24 top-8 w-7 h-7 text-gray-500 cursor-pointer" />
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
