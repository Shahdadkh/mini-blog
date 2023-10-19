"use client";
import { MdEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import Pagination from "@/components/common/Pagination";

export const file = [
  {
    id: 1,
    title:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
    date: "1402/05/05",
    active: true,
  },
  { id: 2, title: "متن دوم", date: "1402/06/05", active: false },
  { id: 3, title: "متن سوم", date: "1402/07/05", active: true },
  { id: 4, title: "متن دوم", date: "1402/06/05", active: false },
  { id: 5, title: "متن سوم", date: "1402/07/05", active: true },
  { id: 6, title: "متن دوم", date: "1402/06/05", active: false },
  { id: 7, title: "متن سوم", date: "1402/07/05", active: true },
  { id: 8, title: "متن دوم", date: "1402/06/05", active: false },
];

const PostManagement = () => {
  const [files, setFiles] = useState(file);
  const titleLength = 40;

  //Pagination
  const pageSize = 7;
  const [currentPage, setCurrentPage] = useState(0);

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  const handleDelete = (id: any) => {
    console.log(id);
  };

  const handleEdit = (id: any) => {
    console.log(id);
  };

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 w-8/12 mx-auto">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        عنوان
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        تاریخ
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        وضعیت
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        حذف
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        ویرایش
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        نمایش
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {files
                      .sort((a, b) => b.id - a.id)
                      .slice(StartCourse, EndCourse)
                      .map((file, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                            {file.title.length > titleLength
                              ? `${file.title.slice(0, titleLength)}...`
                              : file.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                            {file.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                            {file.active ? "فعال" : "غیرفعال"}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                            <MdDelete
                              onClick={() => handleDelete(file.id)}
                              className="w-6 h-6 fontcolor1 mx-auto cursor-pointer"
                            />
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                            <MdEdit
                              onClick={() => handleEdit(file.id)}
                              className="w-6 h-6 fontcolor1 mx-auto cursor-pointer"
                            />
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                            <Link href={`/post/${file.id}`}>
                              <MdRemoveRedEye className="w-6 h-6 fontcolor1 mx-auto cursor-pointer" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {file.length > pageSize && (
        <div className="mt-4">
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

export default PostManagement;