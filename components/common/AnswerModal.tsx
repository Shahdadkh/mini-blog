import { useAppSelector } from "@/redux/store";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface typeValue {
  answer: string;
}

const AnswerModal = ({
  showAnswerModal,
  setShowAnswerModal,
  showAnswerPosts,
}: any) => {
  const auth = useAppSelector((state) => state.authReducer.auth);
  const [open, setOpen] = useState(false);
  const [showPost, setShowPost] = useState<any>("");

  useEffect(() => {
    if (showAnswerModal === true) {
      setOpen(true);
      setShowPost(showAnswerPosts);
    }
    if (open === false) {
      setShowAnswerModal(false);
    }
  }, [open, showAnswerModal, setShowAnswerModal, showAnswerPosts]);

  const initialValues: typeValue = {
    answer: "",
  };

  const handleSubmit = (value: any) => {
    try {
      fetch(`${process.env.url}/comments/${showPost.id}`, {
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
            setOpen(false);
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div
            className={`fixed z-10 inset-0 overflow-y-auto ${
              !open ? "hidden" : null
            }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-1 sm:p-4 sm:pb-1">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <Field
                          as="textarea"
                          rows="6"
                          name="answer"
                          className="border border-transparent block w-full mt-2 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                          placeholder="پاسخ به پیام"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-8 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    ارسال
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-2 sm:w-auto sm:text-sm"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AnswerModal;
