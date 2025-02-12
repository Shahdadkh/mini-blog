"use client";
import { useAppSelector } from "@/redux/store";
import { Formik, Form, Field } from "formik";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

interface typeValue {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface typeValue2 {
  displayName: string;
  aboutMe: string;
  facebook: string;
  twitter: string;
  telegram: string;
  instagram: string;
}

const ProfileSetting = () => {
  const auth = useAppSelector((state) => state.authReducer.auth);
  const [dataUser, setDataUser] = useState<any>(false);

  useEffect(() => {
    fetch(`${process.env.url}/users/${auth.uuid}`)
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data);
      });
  }, []);

  if (auth.access_token === "") {
    redirect("/");
  }

  const initialValues2: typeValue2 = {
    displayName: dataUser ? dataUser.displayName : "",
    aboutMe: dataUser ? dataUser.aboutMe : "",
    facebook: dataUser ? dataUser.facebook : "",
    twitter: dataUser ? dataUser.twitter : "",
    telegram: dataUser ? dataUser.telegram : "",
    instagram: dataUser ? dataUser.instagram : "",
  };

  const handleSubmitChangeDetails = (value: any) => {
    try {
      fetch(`${process.env.url}/users/${auth.uuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.access_token}`,
        },
        body: JSON.stringify(value),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message);
          } else if (data.message === "Unauthorized") {
            toast.error("شما دسترسی به این قسمت ندارید.");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues: typeValue = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleSubmitPassword = (value: any) => {
    const data = {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    };

    if (value.newPassword.length < 5) {
      toast.error("پسورد جدید باید بیشتر از 5 حرف باشد.");
    } else if (value.newPassword === value.repeatNewPassword) {
      try {
        fetch(`${process.env.url}/users/password/${auth.uuid}`, {
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
    <div className="border border-transparent md:flex block mx-auto w-11/12 h-screen">
      <div className="border border-transparent w-full md:w-6/12 h-screen">
        {dataUser && (
          <Formik
            initialValues={initialValues2}
            onSubmit={handleSubmitChangeDetails}
          >
            <Form>
              <div className="w-full h-72 mx-auto mt-8">
                <Field
                  as="textarea"
                  rows="4"
                  name="aboutMe"
                  className="w-5/6 lg:w-4/6 py-4 rounded-xl shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                  placeholder="درباره من"
                />
                <Field
                  type="text"
                  name="displayName"
                  className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                  placeholder="نام نمایشی"
                />
                <Field
                  type="text"
                  name="facebook"
                  className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                  placeholder="فیس بوک"
                />
                <Field
                  type="text"
                  name="twitter"
                  className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                  placeholder="توییتر"
                />
                <Field
                  type="text"
                  name="telegram"
                  className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                  placeholder="تلگرام"
                />
                <Field
                  type="text"
                  name="instagram"
                  className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                  placeholder="اینستاگرام"
                />
                <button
                  type="submit"
                  className="w-5/6 lg:w-4/6 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none mx-auto mt-4"
                >
                  ویرایش اطلاعات
                </button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
      <div className="w-full md:w-6/12 h-screen">
        <Formik initialValues={initialValues} onSubmit={handleSubmitPassword}>
          <Form>
            <div className="border border-transparent w-full h-72 mx-auto md:mt-32 mt-60">
              <Field
                type="password"
                name="oldPassword"
                required
                className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                placeholder="رمز عبور فعلی"
              />
              <Field
                type="password"
                name="newPassword"
                required
                className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                placeholder="رمز عبور جدید"
              />
              <Field
                type="password"
                name="repeatNewPassword"
                required
                className="w-5/6 lg:w-4/6 py-4 rounded-full shadow-custom-shadow font-medium mx-auto mt-4 pr-6 outline-none fontcolor1 block"
                placeholder="تکرار رمز جدید"
              />

              <button
                type="submit"
                className="w-5/6 lg:w-4/6 flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none mx-auto mt-4"
              >
                تغییر رمز
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ProfileSetting;
