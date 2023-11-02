"use client";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineX, HiOutlineViewList } from "react-icons/hi";
import ExitModal from "../ExitModal";

const PanelHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);

  //ExitModal
  const [showExitModal, setShowExitModal] = useState(false);

  const menu = [
    { name: "دیدن سایت", href: "/" },
    { name: "پست جدید", href: "/panel/new-post" },
    { name: "مدیریت پست‌ها", href: "/panel/post-management" },
    { name: "صندوق پیام", href: "/panel/inbox" },
    { name: "تغییر رمز عبور", href: "/panel/change-password" },
  ];

  const handleExit = () => {
    setShowExitModal(true);
  };

  return (
    <div className="border border-transparent w-11/12 h-14 mx-auto">
      <div className="flex justify-between mt-3 px-3">
        <HiOutlineViewList
          onClick={() => setOpenMenu(true)}
          className="text-3xl cursor-pointer ml-2 visible sm:hidden"
        />
        {/* Start Hamburger Menu */}
        {openMenu ? (
          <div className="navbar-menu relative z-50">
            <div
              onClick={() => setOpenMenu(false)}
              className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            ></div>
            <nav className="fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <HiOutlineX
                  onClick={() => setOpenMenu(false)}
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                />
              </div>
              <div>
                <ul>
                  {menu.map((menu, i) => (
                    <li key={i} className="mb-1">
                      <div
                        className={`flex items-center w-full hover:bg-gray-100`}
                      >
                        <Link
                          className="block p-4 text-sm font-semibold rounded"
                          onClick={() => setOpenMenu(false)}
                          href={menu.href}
                        >
                          {menu.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        ) : null}
        {/* End Hamburger Menu */}
        <ul className="hidden sm:flex gap-16">
          {menu.map((item, i) => (
            <li key={i}>
              <Link href={item.href} className="text-base font-medium">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          onClick={() => handleExit()}
          className="text-base font-medium cursor-pointer"
        >
          خروج
        </div>
      </div>
      <ExitModal
        showExitModal={showExitModal}
        setShowExitModal={setShowExitModal}
      />
    </div>
  );
};

export default PanelHeader;
