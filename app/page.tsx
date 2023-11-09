"use client";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { useState, useEffect } from "react";
import { exportDate } from "@/components/utils/utils.utils";
import LandingSkeleton from "@/components/common/skeleton/LandingSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const textLength = 500;
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.url}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      });
  }, []);

  //Pagination
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  return (
    <main>
      <div className="my-4">
        {files.length > 0 ? (
          files
            .sort((a: any, b: any) => b.id - a.id)
            .filter((file: any) => file.verify !== false)
            .slice(StartCourse, EndCourse)
            .map((text: any) => (
              <AnimatePresence key={text.id}>
                <Link href={`/post/${text.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="border border-transparent bg-white w-10/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow"
                  >
                    <div className="text-base font-bold mt-4 mx-6">
                      {text.title}
                    </div>
                    <div className="text-sm font-normal mr-6 mt-1 fontcolor1">
                      {exportDate(text.date)}
                    </div>
                    <div className="text-sm font-light text-justify mt-2 mb-4 mx-6 fontcolor1">
                      {text.text.length > textLength
                        ? `${text.text.slice(0, textLength)}...`
                        : text.text}
                    </div>
                  </motion.div>
                </Link>
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
