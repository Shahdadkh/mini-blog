"use client";
import Link from "next/link";

const PanelHeader = () => {
  const menu = [
    { name: "دیدن سایت", href: "/" },
    { name: "پست جدید", href: "/panel/new-post" },
    { name: "مدیریت پست‌ها", href: "/panel/post-management" },
    { name: "صندوق پیام", href: "/panel/inbox" },
    { name: "ویرایش درباره ما", href: "/panel/edit-aboutus" },
  ];

  const handleExit = () => {
    console.log("ok");
  };

  return (
    <div className="border border-transparent bg-white w-11/12 h-14 mx-auto">
      <div className="flex justify-between mt-3">
        <ul className="flex gap-16">
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
    </div>
  );
};

export default PanelHeader;
