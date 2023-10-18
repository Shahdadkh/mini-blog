import antro from "@/public/assets/fonts/Antro-Vectra/fontAntro";
import Link from "next/link";

const MainHeader = () => {
  const menu = [
    { name: "خانه", href: "/" },
    { name: "درباره ما", href: "/" },
  ];
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
        <div className={`${antro.className} font-antro text-2xl font-bold`}>
          My Gray Life
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
