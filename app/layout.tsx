export default function RootLayout({
  children, //destructuring props
}: {
  children: React.ReactNode;    //should be sth react can render
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
