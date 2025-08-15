"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { EmptyItem } from "../EmptyItem";
import { useSourceSearch } from "@/hooks/useSource";

export interface Result {
  description: string;
  href: string;
}

export function ChatSearch() {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { results, isLoading, error, search } = useSourceSearch();

  const handleRenderResults = () => {
    if (isLoading)
      return (
        <div className="h-96 flex flex-col gap-4 animate-pulse">
          <p className="font-semibold text-center text-neutral-400">
            Cargando...
          </p>
          <div className="h-16 bg-neutral-200 rounded-md"></div>
          <div className="h-16 bg-neutral-200 rounded-md"></div>
          <div className="h-16 bg-neutral-200 rounded-md"></div>
          <div className="h-16 bg-neutral-200 rounded-md"></div>
          <div className="h-16 bg-neutral-200 rounded-md"></div>
        </div>
      );

    if (error) return <p>{error.message}</p>;

    if (results.length > 0) {
      return (
        <>
          <p className="font-medium text-sm my-1">
            {results.length} resultados
          </p>
          <div className="max-h-96 flex flex-col gap-2 overflow-scroll -mr-5 pr-5">
            {results.map((rr: Result, index) => (
              <Link
                key={index}
                href={rr.href}
                target="_blank"
                className="flex items-center border border-neutral-200 rounded-md cursor-pointer p-2 hover:bg-neutral-100"
              >
                <p className="flex-1 text-sm text-neutral-600 line-clamp-2">
                  {rr.description}
                </p>
              </Link>
            ))}
          </div>
        </>
      );
    }

    return <EmptyItem>No se encontrarón resultados...</EmptyItem>;
  };

  return (
    <Dialog open={modal}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setModal(true)}
          variant="outline"
          className="rounded-full"
        >
          <Search />
          Buscar
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={() => setModal(false)}
        className="max-w-2/3 outline-0"
      >
        <DialogHeader>
          <DialogTitle>Busqueda de sentencias</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Búsqueda por palabras clave o número de registro"
              className="flex-1"
            />
            <Button onClick={() => search(searchTerm)} disabled={isLoading}>
              Buscar
            </Button>
          </div>
          {handleRenderResults()}
        </form>
      </DialogContent>
    </Dialog>
  );
}
