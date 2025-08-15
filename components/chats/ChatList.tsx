"use client";

import { useRouter } from "next/navigation";
import { useFetchChats } from "@/hooks/useChat";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { CustomError } from "../CustomError";
import { EmptyItem } from "../EmptyItem";
import { formatMx } from "@/lib/dates";
import { Chat } from "@/lib/types";

export default function ChatList() {
  const router = useRouter();
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
                <TableRow
                  key={chat.id}
                  onClick={() => router.push(`/chats/${chat.id}`)}
                  onMouseEnter={() => router.prefetch(`/chats/${chat.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="w-2/5 p-5 font-medium">
                    {chat.title}
                  </TableCell>
                  <TableCell className="w-2/5 p-5">
                    {chat.expert.name}
                  </TableCell>
                  <TableCell className="w-1/5 p-5">
                    {formatMx(chat.created_at)}
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
