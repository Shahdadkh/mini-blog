"use client";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface typeValue {
  username: string;
  password: string;
  password2: string;
}

const login = () => {
  const router = useRouter();

  const initialValues: typeValue = {
    username: "",
    password: "",
    password2: "",
  };

  const handleSubmit = (value: any) => {
    if (value.password === value.password2) {
      const newValue = { username: value.username, password: value.password };
      try {
        fetch(`${process.env.url}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValue),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "username already exist.") {
              toast.error("این نام کاربری قبلا ساخته شده است.");
            } else if (data.message === "User successfully created.") {
              toast.success("کاربر با موفقیت ساخته شد.");
              router.push("/login");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("پسوردهای وارد شده با هم همخوانی ندارد.");
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
            <Field
              type="password"
              name="password"
              required
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="رمز عبور"
            />
            <Field
              type="password"
              name="password2"
              required
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="تکرار رمز عبور"
            />
            <button
              type="submit"
              className="w-4/6 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none mx-auto mt-4"
            >
              ثبت‌نام
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default login;
