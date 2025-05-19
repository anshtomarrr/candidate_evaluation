import Footer from "@/components/shared/Footer";

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
