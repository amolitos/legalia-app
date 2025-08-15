"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Expert } from "@/lib/types";
import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { EmptyItem } from "../EmptyItem";
import { CustomError } from "../CustomError";
import { Card, CardContent } from "../ui/card";
import { useExperts } from "@/hooks/experts/list";
import { ExpertListSkeleton } from "./ExpertListSkeleton";

export default function ExpertList() {
  const { experts, loading, error, handleFetch } = useExperts();

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRenderTable = () => {
    if (loading) {
      return <ExpertListSkeleton />;
    }

    if (error) {
      return <CustomError message={error} handleRetry={handleFetch} />;
    }

    if (experts.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {experts.map((expert: Expert) => (
            <Link key={expert.id} href={`/experts/${expert.id}`}>
              <Card>
                <CardContent>
                  <h6 className="font-semibold text-2xl line-clamp-1 mb-1">
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
    }

    return <EmptyItem>No hay Expertos registrados...</EmptyItem>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h6 className="font-semibold text-xl">Mis Expertos</h6>
        <Button asChild>
          <Link href="/experts/new">
            <Plus /> Nuevo
          </Link>
        </Button>
      </div>
      {handleRenderTable()}
    </div>
  );
}
