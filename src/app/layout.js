"use client";
import { useRef } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { makeStore } from "../redux-store/store";

import Header from "../components/Header";
import Footer from "../components/Footer";

import theme from "../theme";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <html lang="en">
      <body
        className={roboto.variable}
        style={{ backgroundColor: "white", color: "black" }}
      >
        <Provider store={storeRef.current}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
