"use client";
import { useAppSelector } from "@/redux/store";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface typeValue {
  aboutText: string;
  facebook: string;
  twitter: string;
  telegram: string;
  instagram: string;
}

const EditAboutUs = () => {
  const auth = useAppSelector((state) => state.authReducer.auth);
  const [files, setFiles] = useState<any>("");

  const initialValues: typeValue = {
    aboutText: files !== "" ? files?.aboutText : "",
    facebook: files !== "" ? files?.facebook : "",
    twitter: files !== "" ? files?.twitter : "",
    telegram: files !== "" ? files?.telegram : "",
    instagram: files !== "" ? files?.instagram : "",
  };

  useEffect(() => {
    fetch(`${process.env.url}/users/${auth.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      });
  }, []);

  const handleSubmit = (value: any) => {
    try {
      fetch(`${process.env.url}/users/${auth.id}`, {
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
          } else {
            toast.error("خطا در ارسال اطلاعات");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {files !== "" && (
        <div className="w-3/6 mx-auto mt-20">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className=" w-11/12 mx-auto my-5">
                <div className="mb-3">
                  <Field
                    as="textarea"
                    rows="8"
                    name="aboutText"
                    className="border border-transparent block w-full mt-6 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                    placeholder="متن خود را وارد کنید"
                  />
                </div>
                <div className="grid grid-cols-2  gap-4">
                  <div>
                    <Field
                      type="text"
                      name="facebook"
                      className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                      placeholder="لینک فیس بوک"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="twitter"
                      className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                      placeholder="لینک توییتر"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="telegram"
                      className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                      placeholder="لینک تلگرام"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="instagram"
                      className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                      placeholder="لینک اینستاگرام"
                    />
                  </div>
                </div>
                <div className="flex justify-end w-full mt-3">
                  <Link
                    href="/about-us"
                    className="bg-white fontcolor1 border border-gray-400 cursor-pointer ml-2 font-medium text-base py-2 px-10 mt-1 rounded-full"
                  >
                    نمایش
                  </Link>
                  <button
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-base py-2 px-12 mt-1 rounded-full"
                  >
                    ثبت
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default EditAboutUs;
