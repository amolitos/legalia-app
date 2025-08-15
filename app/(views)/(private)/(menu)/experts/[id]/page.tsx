import { ExpertDetail } from "@/components/experts/ExpertDetail";

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto">
      <ExpertDetail id={id} />
    </div>
  );
}
