"use client";
import { useAppSelector } from "@/redux/store";
import { Formik, Form, Field } from "formik";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

interface typeValue {
  title: string;
  text: string;
}

const NewPost = () => {
  const auth = useAppSelector((state) => state.authReducer.auth);

  if (auth.access_token === "") {
    redirect("/");
  }

  const initialValues: typeValue = {
    title: "",
    text: "",
  };

  const handleSubmit = (value: any, { resetForm }: any) => {
    const data = {
      userId: auth.id.toString(),
      ...value,
    };

    try {
      fetch(`${process.env.url}/posts`, {
        method: "POST",
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
            resetForm();
          } else {
            toast.error("خطا در ارسال اطلاعات");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-5/6 sm:w-4/6 lg:w-3/6 mx-auto mt-20">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ resetForm }) => (
          <Form>
            <div className=" w-11/12 mx-auto my-5">
              <div>
                <Field
                  type="text"
                  name="title"
                  required
                  className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                  placeholder="عنوان پست"
                />
              </div>
              <div className="mb-3">
                <Field
                  as="textarea"
                  rows="8"
                  name="text"
                  required
                  className="border border-transparent block w-full mt-4 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                  placeholder="متن خود را وارد کنید"
                />
              </div>
              <div className="flex justify-end w-full">
                <button
                  type="submit"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-base py-2 px-12 mt-1 rounded-full"
                >
                  ثبت
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPost;
