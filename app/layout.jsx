import "./globals.css";
import PropTypes from "prop-types";
// import ThemeRegistry from "@/theme/ThemeRegistry";
// import { ModeProvider } from "@/context/ThemeContext";
import { primaryFont } from "@/theme/typography";
import ProgressBar from "@/components/partials/ProgressBar";
import { getServerSession } from "next-auth";

import SessionProvider from "../context/SessionProvider";
import ThemeProvider from "@/theme";
import { LocalizationProvider } from "@/locales";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Online Halal Food Store for Fresh and Quality Products`,
  description: `Explore a wide range of delicious and fresh food products at ${process.env.NEXT_PUBLIC_STORE_NAME}. From gourmet treats to everyday essentials, we deliver quality right to your doorstep. Shop now for a delightful culinary experience!`,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <SessionProvider session={session}>
          <LocalizationProvider>
            <ThemeProvider>
              <ProgressBar />
              {children}
            </ThemeProvider>
          </LocalizationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
