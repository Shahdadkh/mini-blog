"use client";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import { useState, useEffect } from "react";

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
        {files
          .sort((a: any, b: any) => a.id - b.id)
          .slice(StartCourse, EndCourse)
          .map((text: any) => (
            <Link key={text.id} href={`/post/${text.id}`}>
              <div className="border border-transparent w-10/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow">
                <div className="text-base font-bold mt-4 mx-6">
                  {text.title}
                </div>
                <div className="text-sm font-normal mr-6 mt-1 fontcolor1">
                  {text.date}
                </div>
                <div className="text-sm font-light text-justify mt-2 mb-4 mx-6 fontcolor1">
                  {text.text.length > textLength
                    ? `${text.text.slice(0, textLength)}...`
                    : text.text}
                </div>
              </div>
            </Link>
          ))}
      </div>
      {files.length > pageSize && (
        <Pagination
          totalPageSize={files.length}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </main>
  );
}
