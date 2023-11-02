import antro from "@/public/assets/fonts/Antro-Vectra/fontAntro";
import Link from "next/link";

const MainHeader = () => {
  const menu = [
    { name: "خانه", href: "/" },
    { name: "درباره ما", href: "/about-us" },
    { name: "ورود", href: "/login" },
  ];

  return (
    <div className="border border-transparent w-11/12 h-14 mx-auto mb-16 sm:mb-0">
      <div
        className={`${antro.className} font-antro text-2xl font-bold text-center mt-5 sm:hidden`}
      >
        My Gray Life
      </div>
      <div className="flex justify-center sm:justify-between mt-3">
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
          className={`${antro.className} font-antro text-2xl font-bold hidden sm:block`}
        >
          My Gray Life
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
