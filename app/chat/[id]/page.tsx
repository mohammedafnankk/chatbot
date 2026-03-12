'use client';

import ChatView from "@/components/chat/ChatView";
import { useParams } from "next/navigation";

export default function DynamicChatPage() {
  const params = useParams();
  const id = params?.id as string;

  return <ChatView id={id} />;
}
