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
        setFiles(data);
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
    <div className="mb-4">
      {files
        .sort((a: any, b: any) => b.id - a.id)
        .slice(StartCourse, EndCourse)
        .map((file: any, i) => (
          <div
            key={i}
            className="w-11/12 h-fit py-2 sm:py-4 rounded-xl mx-auto mt-5 shadow-custom-shadow"
          >
            <div className="flex justify-between mx-4">
              <Link
                href={`/post/${file.postId}`}
                className="text-sm font-semibold"
              >
                {`${file.name} در پست ${
                  file.post.title.length > textLength
                    ? `${file.post.title.slice(0, textLength)}...`
                    : file.post.title
                }`}
              </Link>
              <div className="text-xs font-semibold">
                {exportDateAndTime(file.date)}
              </div>
            </div>
            <div className="text-sm fontcolor1 mx-4">{file.text}</div>
            <div className="mt-4">
              <button
                onClick={() => handleAnswer({ value: true, post: file })}
                className="bg-gray-500 hover:bg-gray-600 text-white font-normal text-sm py-1.5 px-8 mr-3 ml-1 mt-1 rounded-full"
              >
                پاسخ
              </button>
              {file.verify ? (
                <button
                  onClick={() => handleDeactive(file.id)}
                  className="bg-white fontcolor1 border border-gray-400 font-normal text-sm py-1.5 w-24 mt-1 rounded-full"
                >
                  غیرفعال
                </button>
              ) : (
                <button
                  onClick={() => handleActive(file.id)}
                  className="bg-gray-200 fontcolor1 border border-gray-400 font-normal text-sm py-1.5 w-24 mt-1 rounded-full"
                >
                  فعال
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
  );
};

export default Inbox;
