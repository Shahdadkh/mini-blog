"use client";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { useState, useEffect } from "react";
import { exportDate } from "@/components/utils/utils.utils";
import LandingSkeleton from "@/components/common/skeleton/LandingSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSquareFacebook,
  FaXTwitter,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa6";

export default function profile({ params }: any) {
  const textLength = 500;
  const [files, setFiles] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>("");

  const getPost = () => {
    fetch(`${process.env.url}/posts`)
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter(
          (post: any) => post.user.uuid === params.id
        );
        setFiles(newData);
      });
  };

  const getData = () => {
    fetch(`${process.env.url}/users/${params.id}`)
      .then((res) => res.json())
      .then((data: any) => {
        setDataUser(data);
        getPost();
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //Pagination
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  return (
    <main>
      <div className="my-10">
        <div>
          {dataUser.length !== "" ? (
            <div className="bg-white rounded-xl h-fit w-11/12 sm:w-8/12 mx-auto shadow-custom-shadow border border-transparent">
              <div className="relative flex justify-center h-24">
                <div className="w-28 h-28 absolute -top-8  rounded-xl overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: dataUser.imgUrl }} />
                </div>
              </div>
              <div className="w-10/12 mx-auto text-center text-xl font-bold">
                {dataUser.displayName}
              </div>
              <div className="w-10/12 mx-auto text-sm mt-2 text-center font-normal fontcolor1">
                {dataUser.aboutMe}
              </div>
              <div className="flex justify-center gap-2 flex-row-reverse my-8">
                {dataUser.facebook ? (
                  <Link href={dataUser.facebook}>
                    <FaSquareFacebook className="w-6 h-6" />
                  </Link>
                ) : null}
                {dataUser.twitter ? (
                  <Link href={dataUser.twitter}>
                    <FaXTwitter className="w-6 h-6" />
                  </Link>
                ) : null}
                {dataUser.telegram ? (
                  <Link href={dataUser.telegram}>
                    <FaTelegram className="w-6 h-6" />
                  </Link>
                ) : null}
                {dataUser.instagram ? (
                  <Link href={dataUser.instagram}>
                    <FaInstagram className="w-6 h-6" />
                  </Link>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        {files.length > 0 ? (
          files
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .filter((file: any) => file.verify !== false)
            .slice(StartCourse, EndCourse)
            .map((text: any, i: any) => (
              <AnimatePresence key={i}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="border border-transparent bg-white w-10/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow"
                >
                  <Link href={`/post/${text.uuid}`}>
                    <div className="text-base font-bold mt-4 mx-6">
                      {text.title}
                    </div>
                    <div className="text-sm font-normal mr-6 mt-1 fontcolor1">
                      {text.user.displayName} - {exportDate(text.date)}
                    </div>
                    <div className="text-sm font-light text-justify mt-2 mb-4 mx-6 fontcolor1">
                      {text.text.length > textLength
                        ? `${text.text.slice(0, textLength)}...`
                        : text.text}
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            ))
        ) : (
          <LandingSkeleton />
        )}
      </div>

      <div className="my-5">
        {files.length > pageSize && (
          <Pagination
            totalPageSize={files.length}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </main>
  );
}
