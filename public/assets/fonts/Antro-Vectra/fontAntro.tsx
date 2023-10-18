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

const antro = localFont({
  src: [
    {
      path: "./antro-vectra.regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./antro-vectra.bolder.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--antro-font",
});

export default antro;
