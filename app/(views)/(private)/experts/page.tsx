import Hello from "@/components/Hello";
import ExpertList from "@/components/experts/ExpertList";

export default async function Experts() {
  return (
    <div className="container mx-auto">
      <Hello />
      <ExpertList />
    </div>
  );
}
