import Providers from "./providers";

export default function RootLayout({
  children, //destructuring props
}: {
  children: React.ReactNode;    //should be sth react can render
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        </body>
    </html>
  );
}
