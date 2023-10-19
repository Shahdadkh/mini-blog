"use client";
import { Formik, Form, Field } from "formik";
import Link from "next/link";

interface typeValue {
  text: string;
  fb: string;
  tw: string;
  tel: string;
  ig: string;
}

const EditAboutUs = () => {
  const initialValues: typeValue = {
    text: "",
    fb: "",
    tw: "",
    tel: "",
    ig: "",
  };

  const handleSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <div className="w-3/6 mx-auto mt-20">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className=" w-11/12 mx-auto my-5">
            <div className="mb-3">
              <Field
                as="textarea"
                rows="8"
                name="text"
                className="border border-transparent block w-full mt-6 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                placeholder="متن خود را وارد کنید"
              />
            </div>
            <div className="grid grid-cols-2  gap-4">
              <div>
                <Field
                  type="text"
                  name="fb"
                  className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                  placeholder="لینک فیس بوک"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="tw"
                  className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                  placeholder="لینک توییتر"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="tel"
                  className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                  placeholder="لینک تلگرام"
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="ig"
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
  );
};

export default EditAboutUs;
