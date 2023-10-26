import Link from "next/link";
import {
  FaSquareFacebook,
  FaXTwitter,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa6";

const aboutus = () => {
  const linkList = {
    about:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    links: [
      { icon: FaSquareFacebook, src: "/" },
      { icon: FaXTwitter, src: "/" },
      { icon: FaTelegram, src: "/" },
      { icon: FaInstagram, src: "/" },
    ],
  };

  return (
    <div className="rounded-xl w-8/12 mx-auto mt-20 py-20 shadow-custom-shadow">
      <div className=" w-10/12 h-fit mx-auto text-sm text-justify font-normal fontcolor1">
        {linkList.about}
      </div>
      <div className="flex justify-center gap-2 flex-row-reverse mt-10">
        {linkList.links.map((link, i) => (
          <Link key={i} href={link.src}>
            <link.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default aboutus;
