import { AppBar } from "@/components/AppBar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <AppBar />
      {children}
    </div>
  );
}
