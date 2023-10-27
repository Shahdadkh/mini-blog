"use client";
import Link from "next/link";
import { logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const PanelHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const menu = [
    { name: "دیدن سایت", href: "/" },
    { name: "پست جدید", href: "/panel/new-post" },
    { name: "مدیریت پست‌ها", href: "/panel/post-management" },
    { name: "صندوق پیام", href: "/panel/inbox" },
    { name: "تغییر رمز عبور", href: "/panel/change-password" },
  ];

  const handleExit = () => {
    dispatch(logOut());
    router.push("/");
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
