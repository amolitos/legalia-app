import { ExpertForm } from "@/components/experts/ExpertForm";

export default function NewCase() {
  return (
    <div className="md:w-2/3 lg:w-2/4 mx-auto">
      <h4 className="font-bold text-2xl mb-6">Nuevo Experto</h4>
      <ExpertForm expert={undefined} />
    </div>
  );
}
