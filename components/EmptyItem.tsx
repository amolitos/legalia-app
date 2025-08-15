export const EmptyItem = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-60 flex items-center justify-center py-5 md:py-20 px-5">
      <div className="flex items-center gap-3 text-neutral-500">{children}</div>
    </div>
  );
};
