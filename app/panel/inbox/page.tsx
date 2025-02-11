"use client";
import AnswerModal from "@/components/common/AnswerModal";
import DeactiveModal from "@/components/common/DeactiveModal";
import Pagination from "@/components/common/Pagination";
import { exportDateAndTime } from "@/components/utils/utils.utils";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";

const Inbox = () => {
  const textLength = 20;
  const auth = useAppSelector((state) => state.authReducer.auth);

  if (auth.access_token === "") {
    redirect("/");
  }

  const [files, setFiles] = useState([]);

  //DeactiveModal
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);
  //AnswerModal
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showAnswerPost, setShowAnswerPost] = useState(null);
  //Pagination
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  const getData = () => {
    fetch(`${process.env.url}/comments`)
      .then((res) => res.json())
      .then((data) => {
        let newData = data;
        if (auth.role === "user") {
          newData = data.filter(
            (comment: any) => comment.post.userUuid === auth.uuid
          );
        }
        setFiles(newData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAnswer = (data: any) => {
    setShowAnswerModal(data.value);
    setShowAnswerPost(data.post);
  };

  const handleDeactive = (id: any) => {
    setShowModal(true);
    setShowPost(id);
  };

  const handleActive = (id: any) => {
    const data = {
      verify: true,
    };

    try {
      fetch(`${process.env.url}/comments/${id}`, {
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
            getData();
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
      {files.length > 0 ? (
        <div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mb-4"
            >
              {files
                .sort(
                  (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .slice(StartCourse, EndCourse)
                .map((file: any, i) => (
                  <div
                    key={i}
                    className="w-11/12 h-fit py-2 sm:py-4 bg-white rounded-xl mx-auto mt-5 shadow-custom-shadow"
                  >
                    <div className="flex justify-between mx-4">
                      <Link
                        href={`/post/${file.post.uuid}`}
                        className="text-sm font-semibold"
                      >
                        {`${file.name} در پست ${
                          file.post.title.length > textLength
                            ? `${file.post.title.slice(0, textLength)}...`
                            : file.post.title
                        }`}
                      </Link>
                      <div className="text-xs font-semibold truncate">
                        {exportDateAndTime(file.date)}
                      </div>
                    </div>
                    <div className="text-sm fontcolor1 mx-4">{file.text}</div>
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          handleAnswer({ value: true, post: file })
                        }
                        className="bg-gray-500 hover:bg-gray-600 text-white font-normal text-sm py-1.5 px-8 mr-3 ml-1 mt-1 rounded-full"
                      >
                        پاسخ
                      </button>
                      {file.verify ? (
                        <button
                          onClick={() => handleDeactive(file.uuid)}
                          className="bg-white fontcolor1 border border-gray-400 font-normal text-sm py-1.5 w-24 mt-1 rounded-full"
                        >
                          عدم نمایش
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActive(file.uuid)}
                          className="bg-gray-200 fontcolor1 border border-gray-400 font-normal text-sm py-1.5 w-24 mt-1 rounded-full"
                        >
                          نمایش
                        </button>
                      )}
                    </div>
                    {file.answer && (
                      <div className="w-[98%] h-fit text-sm rounded-xl mt-2 mx-auto p-3 bg-gray-200">
                        {file.answer}
                      </div>
                    )}
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
          <DeactiveModal
            showModal={showModal}
            setShowModal={setShowModal}
            showPosts={showPost}
            getFiles={getData}
          />
          <AnswerModal
            showAnswerModal={showAnswerModal}
            setShowAnswerModal={setShowAnswerModal}
            showAnswerPosts={showAnswerPost}
            getFiles={getData}
          />
          {files.length > pageSize && (
            <div className="my-4">
              <Pagination
                totalPageSize={files.length}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-20 relative block w-8/12 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center">
          <HiOutlineMail className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-medium text-gray-900">
            صندوق پیام شما خالی است.
          </span>
        </div>
      )}
    </div>
  );
};

export default Inbox;
