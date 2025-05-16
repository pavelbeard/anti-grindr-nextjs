import { Chivo } from "next/font/google";

export const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  display: "swap",
});

export const chivoMono = Chivo({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const chivoBold = Chivo({
  variable: "--font-chivo-bold",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

export const chivoBlack = Chivo({
  variable: "--font-chivo-black",
  subsets: ["latin"],
  display: "swap",
  weight: "900",
});

export const chivoLight = Chivo({
  variable: "--font-chivo-light",
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

export const chivoThin = Chivo({
  variable: "--font-chivo-thin",
  subsets: ["latin"],
  display: "swap",
  weight: "100",
});
