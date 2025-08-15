import { Detail } from "@/components/experts/Detail";

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto">
      <Detail id={id} />
    </div>
  );
}
