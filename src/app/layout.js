import "./styles.css";

export const metadata = {
  title: "Recipe Manager",
  description: "D424 - Ronald DuPree Jr.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
