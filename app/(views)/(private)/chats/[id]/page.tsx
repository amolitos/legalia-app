import { Chat } from "@/components/chats/Chat";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <Chat id={id} />;
}
