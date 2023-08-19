import { CMSContext } from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
const poppin = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppin.className}>
      <CMSContext>
        <Component {...pageProps} />
      </CMSContext>
    </main>
  );
}
