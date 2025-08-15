import Hello from "@/components/Hello";
import ChatList from "@/components/chats/ChatList";
import ExpertList from "@/components/experts/ExpertList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Experts() {
  return (
    <div className="container mx-auto">
      <Hello />
      <Tabs defaultValue="experts">
        <TabsList className="mb-8">
          <TabsTrigger value="experts">Expertos</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
        </TabsList>
        <TabsContent
          value="experts"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ExpertList />
        </TabsContent>
        <TabsContent
          value="chats"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ChatList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
