"use client";
import AnswerModal from "@/components/common/AnswerModal";
import Pagination from "@/components/common/Pagination";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useState, useEffect } from "react";

const Inbox = () => {
  const textLength = 60;
  const auth = useAppSelector((state) => state.authReducer.auth);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.url}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      });
  }, []);

  //AnswerModal
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showAnswerPost, setShowAnswerPost] = useState(null);
  //Pagination
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  const handleAnswer = (data: any) => {
    setShowAnswerModal(data.value);
    setShowAnswerPost(data.post);
  };

  const handleDeactive = () => {
    console.log("Deactive");
  };

  return (
    <div className="mb-4">
      {files
        .sort((a: any, b: any) => b.id - a.id)
        .slice(StartCourse, EndCourse)
        .map((file: any, i) => (
          <div
            key={i}
            className="w-9/12 h-fit py-4 rounded-xl mx-auto mt-5 shadow-custom-shadow"
          >
            <div className="flex justify-between mx-4">
              <Link href={`/post/${file.id}`} className="text-sm font-semibold">
                {`${file.name} در پست ${
                  file.post.title.length > textLength
                    ? `${file.post.title.slice(0, textLength)}...`
                    : file.post.title
                }`}
              </Link>
              <div className="text-xs font-semibold">{file.date}</div>
            </div>
            <div className="text-sm fontcolor1 mx-4">{file.text}</div>
            <div className="mt-4">
              <button
                onClick={() => handleAnswer({ value: true, post: file })}
                className="bg-gray-500 hover:bg-gray-600 text-white font-normal text-sm py-1.5 px-8 mr-3 ml-1 mt-1 rounded-full"
              >
                پاسخ
              </button>
              <button
                onClick={() => handleDeactive()}
                className="bg-white fontcolor1 border border-gray-400 font-normal text-sm py-1.5 w-24 mt-1 rounded-full"
              >
                {file.active ? "غیرفعال" : "فعال"}
              </button>
            </div>
            {file.answer && (
              <div className="w-[98%] h-fit text-sm rounded-xl mt-2 mx-auto p-3 bg-gray-200">
                {file.answer}
              </div>
            )}
          </div>
        ))}
      <AnswerModal
        showAnswerModal={showAnswerModal}
        setShowAnswerModal={setShowAnswerModal}
        showAnswerPosts={showAnswerPost}
        //getFiles={getList}
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
