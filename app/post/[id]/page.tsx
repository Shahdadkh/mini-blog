"use client";
import { useParams } from "next/navigation";
import { Formik, Form, Field } from "formik";

interface typeValue {
  name: string;
  message: string;
}

const pageId = () => {
  const router = useParams();
  const textList = {
    id: 1,
    title: "متن شماره یک در راه اژده ها",
    date: "1402/07/25",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. ",
    message: [
      {
        id: 1,
        name: "محمد",
        message: "پست قشنگی بود.",
        date: "1402/07/25 - 13:25",
        answer: "خواهش میکنم.",
      },
      {
        id: 2,
        name: "محمد",
        message: "پست قشنگی بود.",
        date: "1402/07/25 - 13:25",
        answer: null,
      },
    ],
  };

  const initialValues: typeValue = {
    name: "",
    message: "",
  };

  const handleSubmit = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <div>
        <div className="border border-transparent w-11/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow">
          <div className="text-base font-bold mt-10 mx-6 text-center">
            {textList.title}
          </div>
          <div className="text-sm font-normal mt-1 text-center fontcolor1">
            {textList.date}
          </div>
          <div className="text-sm font-light text-justify mt-5 mb-10 mx-6 fontcolor1">
            {textList.text}
          </div>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className=" w-11/12 mx-auto my-5">
            <div>
              <Field
                type="text"
                name="name"
                className="border border-transparent block w-full  py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                placeholder="نام شما"
              />
            </div>
            <div className="mb-3">
              <Field
                as="textarea"
                rows="5"
                name="message"
                className="border border-transparent block w-full mt-6 py-2 px-3 rounded-xl shadow-custom-shadow outline-none fontcolor1"
                placeholder="پیام بگذارید"
              />
            </div>
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-base py-1.5 px-8 rounded-full"
              >
                ارسال
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="my-4">
        <div className="text-lg text-center font-bold">بازخورد شما</div>
        {textList.message.length !== 0 ? (
          <div className="w-11/12 mx-auto">
            {textList.message.map((msg) => (
              <div
                key={msg.id}
                className=" h-fit mt-5 rounded-xl shadow-custom-shadow py-1"
              >
                <div className="flex justify-between mx-3 mt-3">
                  <div className="text-sm font-bold">{`${msg.name} نوشته:`}</div>
                  <div className="text-xs">{msg.date}</div>
                </div>
                <div className="fontcolor1 text-sm mx-3 mb-3 mt-1">
                  {msg.message}
                </div>
                {msg.answer && (
                  <div className="flex justify-end w-full mt-3">
                    <div className="bg-gray-200 w-[95%] h-fit rounded-xl mb-2 ml-3">
                      <div className="text-sm font-bold mx-3 mt-3">پاسخ:</div>
                      <div className="fontcolor1 text-sm mx-3 mb-3 mt-1">
                        {msg.answer}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-black border-dotted rounded-xl w-2/6 h-fit py-3 mx-auto text-center my-8">
            بازخوردی ثبت نشده است
          </div>
        )}
      </div>
    </div>
  );
};

export default pageId;
