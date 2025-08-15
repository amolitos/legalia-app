export const DocumentContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="border border-neutral-200 flex items-center gap-1 rounded-md cursor-pointer p-1">
      {children}
    </div>
  );
};
