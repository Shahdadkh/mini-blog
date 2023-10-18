import localFont from "next/font/local";

// 100 – Thin
// 200 – Extra Light (Ultra Light)
// 300 – Light
// 400 – Normal (Regular)
// 500 – Medium
// 600 – Semi Bold (Demi Bold)
// 700 – Bold
// 800 – Extra Bold (Ultra Bold)
// 900 – Black (Heavy)

const iransans = localFont({
  src: [
    {
      path: "./IRANSans(FaNum)_UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./IRANSans(FaNum)_Light.ttf",
      weight: "300",
      style: "normal",
    },
	{
      path: "./IRANSans(FaNum).ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./IRANSans(FaNum)_Medium.ttf",
      weight: "500",
      style: "normal",
    },
	{
      path: "./IRANSans(FaNum)_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./IRANSans(FaNum)_Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--iransans-font",
});

export default iransans;
