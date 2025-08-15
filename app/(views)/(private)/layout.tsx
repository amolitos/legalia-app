import { AppBar } from "@/components/AppBar";
import { Toaster } from "@/components/ui/sonner";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <AppBar />
      {children}
      <Toaster />
    </div>
  );
}
