import "./globals.css";
import PropTypes from "prop-types";
import { primaryFont } from "@/theme/typography";
import ProgressBar from "@/components/partials/ProgressBar";
import { getServerSession } from "next-auth";

import SessionProvider from "../context/SessionProvider";
import ThemeProvider from "@/theme";
import { LocalizationProvider } from "@/locales";
import { SettingsProvider } from "@/components/settings";
import CartProvider from "@/context/CartContext";
import { GetAllCart } from "@/services/Purchase";
// import { MotionLazy } from "@/components/partials/animate/motion-lazy";

export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL),
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Online Halal Food Store for Fresh and Quality Products`,
  description: `Explore a wide range of delicious and fresh food products at ${process.env.NEXT_PUBLIC_STORE_NAME}. From gourmet treats to everyday essentials, we deliver quality right to your doorstep. Shop now for a delightful culinary experience!`,
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Online Halal Food Store for Fresh and Quality Products`,
    description: `Explore a wide range of delicious and fresh food products at ${process.env.NEXT_PUBLIC_STORE_NAME}. From gourmet treats to everyday essentials, we deliver quality right to your doorstep. Shop now for a delightful culinary experience!`,
    image:
      "https://firebasestorage.googleapis.com/v0/b/xetia-demo.appspot.com/o/company%20profile%2F1.png?alt=media&token=0266a5cb-3564-4d80-b9c0-81f3cc6e3469",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hapedHelap",
    title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Online Halal Food Store for Fresh and Quality Products`,
    description: `Explore a wide range of delicious and fresh food products at ${process.env.NEXT_PUBLIC_STORE_NAME}. From gourmet treats to everyday essentials, we deliver quality right to your doorstep. Shop now for a delightful culinary experience!`,
    image:
      "https://firebasestorage.googleapis.com/v0/b/xetia-demo.appspot.com/o/company%20profile%2F1.png?alt=media&token=0266a5cb-3564-4d80-b9c0-81f3cc6e3469",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  const cart = await GetAllCart();

  return (
    <html lang="en" className={primaryFont.className}>
      <head>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/staging-xetia-io-01.appspot.com/o/entity-info%2FWhatsApp%20Image%202024-01-29%20at%2013.36.25.jpeg?alt=media&token=64f18e64-2b26-4223-bf1a-16c550e48f09"
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: "light", // 'light' | 'dark'
              }}
            >
              <ThemeProvider>
                <CartProvider cart={cart}>
                  <ProgressBar />
                  {children}
                </CartProvider>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
