import { useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ showModal, setShowModal, showPosts, getFiles }: any) => {
  const auth = useAppSelector((state) => state.authReducer.auth);
  const [open, setOpen] = useState(false);
  const [showPost, setShowPost] = useState([]);

  useEffect(() => {
    if (showModal === true) {
      setOpen(true);
      setShowPost(showPosts);
    }
    if (open === false) {
      setShowModal(false);
    }
  }, [open, showModal, setShowModal, showPosts]);

  const handleSubmit = () => {
    try {
      fetch(`${process.env.url}/posts/${showPost}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(data.message);
            getFiles();
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

        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <div className="mt-2">
                <p className="text-base text-gray-500 font-semibold">
                  آیا از حذف این پست اطمینان دارید؟
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-0 sm:col-start-2 sm:text-sm"
            >
              حذف پست
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
