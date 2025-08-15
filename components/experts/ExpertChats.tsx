import Link from "next/link";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { ExternalLink } from "lucide-react";
import { formatMx } from "@/lib/dates";
import { Chat } from "@/lib/types";

export const ExpertChats = ({ chats }: { chats: Chat[] }) => {
  return (
    <Table>
      <TableBody>
        {chats.map((chat: Chat) => (
          <TableRow key={chat.id}>
            <TableCell className="w-2/5 p-3">{chat.title}</TableCell>
            <TableCell className="w-2/5 p-3">
              {formatMx(chat.created_at)}
            </TableCell>
            <TableCell className="w-1/5 text-right p-3">
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
  );
};
