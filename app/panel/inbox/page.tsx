"use client";
import AnswerModal from "@/components/common/AnswerModal";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import { useState } from "react";

export const data = [
  {
    id: 1,
    name: "محمد",
    title:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
    date: "13:50 - 1402/07/05",
    text: "متن بسیار زیبایی بود",
    active: true,
    answer: "خواهش می‌کنم",
  },
  {
    id: 2,
    name: "محمد",
    title: "متن شماره دو",
    date: "13:00 - 1402/08/05",
    text: "متن بسیار زیبایی بود",
    active: false,
    answer: "",
  },
  {
    id: 3,
    name: "محمد",
    title: "متن شماره یک",
    date: "13:50 - 1402/07/05",
    text: "متن بسیار زیبایی بود",
    active: true,
    answer: "",
  },
  {
    id: 4,
    name: "محمد",
    title: "متن شماره یک",
    date: "13:50 - 1402/07/05",
    text: "متن بسیار زیبایی بود",
    active: true,
    answer: "متشکرم",
  },
];

const Inbox = () => {
  const [files, setFiles] = useState(data);
  const textLength = 60;
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
        .sort((a, b) => b.id - a.id)
        .slice(StartCourse, EndCourse)
        .map((file, i) => (
          <div
            key={i}
            className="w-11/12 h-fit py-4 rounded-xl mx-auto mt-5 shadow-custom-shadow"
          >
            <div className="flex justify-between mx-4">
              <Link href={`/post/${file.id}`} className="text-sm font-semibold">
                {`${file.name} در پست ${
                  file.title.length > textLength
                    ? `${file.title.slice(0, textLength)}...`
                    : file.title
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
