"use client";

import Link from "next/link";
import { Chat } from "@/lib/types";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { CustomError } from "../CustomError";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { formatMx } from "@/lib/dates";
import { EmptyItem } from "../EmptyItem";
import { useFetchChats } from "@/hooks/useChat";

export default function ChatList() {
  const { chats, isLoading, error, fetchChats } = useFetchChats();

  const handleRenderTable = () => {
    if (isLoading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <CustomError message={error.message} handleRetry={fetchChats} />;
    }

    return (
      <div className="border border-neutral-200 rounded-md">
        {chats.length > 0 ? (
          <Table>
            <TableBody>
              {chats.map((chat: Chat) => (
                <TableRow key={chat.id}>
                  <TableCell className="w-4/6 p-3 font-medium">
                    {chat.title}
                  </TableCell>
                  <TableCell className="w-1/6 p-3">
                    {formatMx(chat.created_at)}
                  </TableCell>
                  <TableCell className="w-1/6 text-right p-3">
                    <Button asChild variant="outline" size="icon">
                      <Link href={`/chats/${chat.id}`}>
                        <ExternalLink />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyItem>Aún no tienes conversaciones.</EmptyItem>
        )}
      </div>
    );
  };

  return (
    <div>
      <h6 className="font-semibold text-xl mb-8">Chats recientes</h6>
      {handleRenderTable()}
    </div>
  );
}
