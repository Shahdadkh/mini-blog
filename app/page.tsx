import Link from "next/link";
import MainHeader from "@/components/common/MainHeader";

export default function Home() {
  const textLength = 500;
  const textList = [
    {
      id: 1,
      title: "متن شماره یک در راه اژده ها",
      date: "1402/07/25",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    },
    {
      id: 2,
      title: "متن شماره دو در راه اژده ها",
      date: "1402/07/26",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    },
    {
      id: 3,
      title: "متن شماره دو در راه اژده ها",
      date: "1402/07/26",
      text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    },
  ];
  return (
    <main>
      <MainHeader />
      <div className="my-4">
        {textList.map((text) => (
          <Link key={text.id} href={`/post/${text.id}`}>
            <div className="border border-transparent w-11/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow">
              <div className="text-base font-bold mt-4 mx-6">{text.title}</div>
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
      <div className="my-8">
        <ol className="flex justify-center text-xs font-medium space-x-2">
          <li>
            <a
              href="/"
              className="inline-flex items-center justify-center ml-2 w-8 h-8 border border-gray-100 fontcolor1 shadow-custom-shadow rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="/"
              className="block w-8 h-8 text-center border border-gray-100 fontcolor1 rounded leading-8 shadow-custom-shadow"
            >
              1
            </a>
          </li>

          <li className="block w-8 h-8 text-center text-white bg-gray-500 rounded leading-8 shadow-custom-shadow">
            2
          </li>

          <li>
            <a
              href="/"
              className="block w-8 h-8 text-center border border-gray-100 fontcolor1 rounded leading-8 shadow-custom-shadow"
            >
              3
            </a>
          </li>

          <li>
            <a
              href="/"
              className="block w-8 h-8 text-center border border-gray-100 fontcolor1 rounded leading-8 shadow-custom-shadow"
            >
              4
            </a>
          </li>

          <li>
            <a
              href="/"
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 fontcolor1 rounded shadow-custom-shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </main>
  );
}
