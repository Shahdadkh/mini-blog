import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";

interface typeValue {
  title: string;
  text: string;
}

const EditPostModal = ({ showEditModal, setShowEditModal, showPosts }: any) => {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (showEditModal === true) {
      setOpen(true);
    }
    if (open === false) {
      setShowEditModal(false);
    }
  }, [open, showEditModal, setShowEditModal, showPosts]);

  const initialValues: typeValue = {
    title: showPosts !== null ? showPosts.title : "",
    text: showPosts !== null ? showPosts.text : "",
  };

  const handleSubmit = (value: any) => {
    console.log(value, showPosts);
  };

  return (
    <div>
      {showPosts !== null && (
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
                          <div>
                            <Field
                              type="text"
                              name="title"
                              className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                              placeholder="عنوان پست"
                            />
                          </div>
                          <div className="mt-2">
                            <Field
                              as="textarea"
                              rows="6"
                              name="text"
                              className="border border-transparent block w-full mt-2 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                              placeholder="متن خود را وارد کنید"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <button
                        type="button"
                        onClick={() => setToggle(!toggle)}
                        className={`${
                          toggle ? "bg-gray-600" : "bg-gray-300"
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0`}
                        role="switch"
                        aria-checked="false"
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            toggle ? "-translate-x-5" : "translate-x-0"
                          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        ></span>
                      </button>
                      <div className="bg-gray-50 py-3">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-8 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-2 sm:w-auto sm:text-sm"
                        >
                          انصراف
                        </button>
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-8 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-0 sm:w-auto sm:text-sm"
                        >
                          ویرایش
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default EditPostModal;
