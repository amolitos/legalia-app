"use client";

import Link from "next/link";
import { Expert } from "@/lib/types";
import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { CustomError } from "../CustomError";
import { Card, CardContent } from "../ui/card";
import { ExpertListSkeleton } from "./ExpertListSkeleton";
import { useFetchExperts } from "@/hooks/useExpert";

export default function ExpertList() {
  const { experts, isLoading, error, fetchExperts } = useFetchExperts();

  const handleRenderTable = () => {
    if (isLoading) {
      return <ExpertListSkeleton />;
    }

    if (error) {
      return <CustomError message={error.message} handleRetry={fetchExperts} />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link href="/experts/new">
          <Card className="h-full items-center justify-center gap-3">
            <div className="rounded-full bg-primary/10 p-5">
              <Plus />
            </div>
            <h6 className="font-medium text-lg md:text-xl">Crear experto</h6>
          </Card>
        </Link>
        {experts.map((expert: Expert) => (
          <Link key={expert.id} href={`/experts/${expert.id}`}>
            <Card className="h-full">
              <CardContent>
                <h6 className="font-semibold text-lg md:text-2xl line-clamp-1 mb-1">
                  {expert.name}
                </h6>
                <Badge>{expert.role}</Badge>
                <p className="text-neutral-500 line-clamp-2 mt-3">
                  {expert.instructions}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h6 className="font-semibold text-xl mb-8">Mis Expertos</h6>
      {handleRenderTable()}
    </div>
  );
}
