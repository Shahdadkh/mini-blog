"use client";
import { useAppSelector } from "@/redux/store";
import { Formik, Form, Field } from "formik";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

interface typeValue {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const ChangePassword = () => {
  const auth = useAppSelector((state) => state.authReducer.auth);

  if (auth.access_token === "") {
    redirect("/");
  }

  const initialValues: typeValue = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleSubmit = (value: any) => {
    const data = {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    };

    if (value.newPassword.length < 5) {
      toast.error("پسورد جدید باید بیشتر از 5 حرف باشد.");
    } else if (value.newPassword === value.repeatNewPassword) {
      try {
        fetch(`${process.env.url}/users/password/${auth.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              toast.success(data.message);
            } else if (data.message === "Wrong password.") {
              toast.error("پسورد فعلی وارد شده اشتباه است.");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("پسوردهای جدید وارد شده مطابقت ندارند.");
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="border border-transparent w-2/6 h-72 mx-auto mt-28">
            <Field
              type="password"
              name="oldPassword"
              required
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="رمز عبور فعلی"
            />
            <Field
              type="password"
              name="newPassword"
              required
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="رمز عبور جدید"
            />
            <Field
              type="password"
              name="repeatNewPassword"
              required
              className="w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
              placeholder="تکرار رمز جدید"
            />

            <button
              type="submit"
              className="w-4/6 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none mx-auto mt-4"
            >
              ارسال
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
