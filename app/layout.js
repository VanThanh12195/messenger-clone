import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProviders";

export const metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          {children}{" "}
        </AuthProvider>
      </body>
    </html>
  );
}
