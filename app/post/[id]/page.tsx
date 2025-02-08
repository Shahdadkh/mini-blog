"use client";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { exportDate, exportDateAndTime } from "@/components/utils/utils.utils";
import PostSkeleton from "@/components/common/skeleton/PostSkeleton";
import { motion, AnimatePresence } from "framer-motion";

interface typeValue {
  name: string;
  text: string;
}

const pageId = ({ params }: any) => {
  const router = useRouter();
  const [files, setFiles] = useState<any>(null);

  const getData = () => {
    fetch(`${process.env.url}/posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "post not found.") {
          setFiles(data);
        } else {
          router.push("/not-found");
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const initialValues: typeValue = {
    name: "",
    text: "",
  };

  const handleSubmit = (value: any, { resetForm }: any) => {
    const data = {
      postId: params.id,
      ...value,
    };

    try {
      fetch(`${process.env.url}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    <div>
      {files !== null && files.verify === true ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div>
              <div className="border border-transparent bg-white w-10/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow">
                <div className="text-base font-bold mt-10 mx-6 text-center">
                  {files.title}
                </div>
                <div className="text-sm font-normal mt-1 text-center fontcolor1">
                  {exportDate(files.date)}
                </div>
                <div className="text-sm font-light text-justify mt-5 mb-10 mx-6 fontcolor1">
                  {files.text}
                </div>
              </div>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ resetForm }) => (
                <Form>
                  <div className="w-10/12 sm:w-7/12 lg:w-5/12 mx-auto my-8">
                    <div>
                      <Field
                        type="text"
                        name="name"
                        required
                        className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                        placeholder="نام شما"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        as="textarea"
                        rows="5"
                        name="text"
                        required
                        className="border border-transparent block w-full mt-3 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                        placeholder="پیام بگذارید"
                      />
                    </div>
                    <div className="flex justify-end w-full">
                      <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-base py-1.5 px-8 rounded-full"
                      >
                        ارسال
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="my-4">
              <div className="text-lg text-center font-bold">بازخورد شما</div>
              {files.comments.filter((file: any) => file.verify !== false)
                .length !== 0 ? (
                <div className="w-10/12 sm:w-9/12 mx-auto bg-white rounded-xl">
                  {files.comments
                    .sort((a: any, b: any) => a.id - b.id)
                    .filter((file: any) => file.verify !== false)
                    .map((msg: any) => (
                      <div
                        key={msg.id}
                        className=" h-fit mt-5 rounded-xl shadow-custom-shadow py-1"
                      >
                        <div className="flex justify-between mx-3 mt-3">
                          <div className="text-sm font-bold">{`${msg.name} نوشته:`}</div>
                          <div className="text-xs">
                            {exportDateAndTime(msg.date)}
                          </div>
                        </div>
                        <div className="fontcolor1 text-sm mx-3 mb-3 mt-1">
                          {msg.text}
                        </div>
                        {msg.answer && (
                          <div className="flex justify-end w-full mt-3">
                            <div className="bg-gray-200 w-[95%] h-fit rounded-xl mb-2 mx-3 sm:ml-3">
                              <div className="text-sm font-bold mx-3 mt-3">
                                پاسخ:
                              </div>
                              <div className="fontcolor1 text-sm mx-3 mb-3 mt-1">
                                {msg.answer}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-gray-200 rounded-xl w-4/6 sm:w-2/6 h-fit py-3 mx-auto text-center my-8">
                  بازخوردی ثبت نشده است
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <PostSkeleton />
      )}
    </div>
  );
};

export default pageId;
