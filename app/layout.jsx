import "./globals.css";
import PropTypes from "prop-types";
import { primaryFont } from "@/theme/typography";
import ProgressBar from "@/components/partials/ProgressBar";
import { getServerSession } from "next-auth";

import SessionProvider from "../context/SessionProvider";
import ThemeProvider from "@/theme";
import { LocalizationProvider } from "@/locales";
import { SettingsProvider } from "@/components/settings";

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
            <SettingsProvider
              defaultSettings={{
                themeMode: "light", // 'light' | 'dark'
              }}
            >
              <ThemeProvider>
                <ProgressBar />
                {children}
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
