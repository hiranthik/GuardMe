// app/layout.tsx
import "./global.css";
import Providers from "./providers"; // Import your new provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className="min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  );
}
