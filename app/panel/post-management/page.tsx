"use client";
import { MdEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";
import Link from "next/link";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import DeleteModal from "@/components/common/DeleteModal";
import EditPostModal from "@/components/common/EditPostModal";
import { exportDate } from "@/components/utils/utils.utils";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/store";

const PostManagement = () => {
  const auth = useAppSelector((state) => state.authReducer.auth);
  const [files, setFiles] = useState([]);
  const titleLength = 18;

  if (auth.access_token === "") {
    redirect("/");
  }

  const getData = () => {
    fetch(`${process.env.url}/posts`)
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((post: any) => post.userId === auth.id);
        setFiles(newData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //DeleteModal
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);

  //EditPostModal
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditPost, setShowEditPost] = useState(null);

  //Pagination
  const pageSize = 7;
  const [currentPage, setCurrentPage] = useState(0);

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  const handleDelete = (data: any) => {
    setShowModal(data.value);
    setShowPost(data.post);
  };

  const handleEdit = (data: any) => {
    setShowEditModal(data.value);
    setShowEditPost(data.post);
  };

  return (
    <div>
      {files.length > 0 && (
        <div>
          <div className="px-4 sm:px-6 lg:px-8 w-11/12 sm:w-9/12 lg:w-8/12 mx-auto">
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
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 hidden sm:table-cell"
                          >
                            تاریخ
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 hidden sm:table-cell"
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
                          .sort((a: any, b: any) => b.id - a.id)
                          .slice(StartCourse, EndCourse)
                          .map((file: any, i) => (
                            <tr key={i}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                                {file.title.length > titleLength
                                  ? `${file.title.slice(0, titleLength)}...`
                                  : file.title}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 hidden sm:table-cell">
                                {exportDate(file.date)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500 hidden sm:table-cell">
                                {file.verify ? "فعال" : "غیرفعال"}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                <MdDelete
                                  onClick={() =>
                                    handleDelete({ value: true, post: file.id })
                                  }
                                  className="w-6 h-6 fontcolor1 mx-auto cursor-pointer"
                                />
                              </td>
                              <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                <MdEdit
                                  onClick={() =>
                                    handleEdit({ value: true, post: file })
                                  }
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
          <EditPostModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            showPosts={showEditPost}
            setShowPosts={setShowEditPost}
            getFiles={getData}
          />
          <DeleteModal
            showModal={showModal}
            setShowModal={setShowModal}
            showPosts={showPost}
            getFiles={getData}
          />
          {files.length > pageSize && (
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
      )}
    </div>
  );
};

export default PostManagement;
