export default function ExpertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-white shadow shadow-neutral-400 rounded-t-4xl py-5 md:py-16 px-5">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
