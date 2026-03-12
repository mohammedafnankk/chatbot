'use client';

import ChatInput from "@/components/chat/ChatInput";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { motion } from "framer-motion";
import { Bot, Menu, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

interface ChatViewProps {
  id?: string;
}

export default function ChatView({ id }: ChatViewProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(id || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // NextAuth session
  const { data: session, status } = useSession();
  const isPending = status === "loading";

  // Redirect to auth if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  // Sync activeConversation with id prop
  useEffect(() => {
    setActiveConversation(id || null);
  }, [id]);

  // Load conversations on mount
  const loadConversations = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const res = await axios.get(`/api/conversation?userId=${session.user.id}`);
      if (res.data.success) {
        const convs: Conversation[] = res.data.data.conversations.map((c: any) => ({
          id: c.id,
          title: c.title,
          lastMessage: "",
          timestamp: c.updatedAt,
          messages: [],
        }));
        setConversations(convs);
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user?.id) {
      loadConversations();
    }
  }, [session?.user?.id, loadConversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      const res = await axios.get(`/api/message?conversationId=${conversationId}`);
      if (res.data.success) {
        const msgs: Message[] = res.data.data.map((m: any) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
        }));
        setMessages(msgs);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }, []);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation);
    } else {
      setMessages([]);
    }
  }, [activeConversation, loadMessages]);

  const handleSend = async (content: string) => {
    if (!session?.user?.id) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    let convId = activeConversation;
    try {

      // Create new conversation if none is active
      if (!convId) {
        const title = content.length > 40 ? content.substring(0, 40) + "..." : content;
        const convRes = await axios.post("/api/conversation", {
          userId: session.user.id,
          title,
        });
        convId = convRes.data.data.id;
        setActiveConversation(convId);
        
        // Don't redirect yet, let the AI response logic finish
        setConversations((prev) => [
          {
            id: convId!,
            title,
            lastMessage: content,
            timestamp: new Date().toISOString(),
            messages: [],
          },
          ...prev,
        ]);
      }

      // Save user message to DB
      await axios.post("/api/message", {
        conversationId: convId,
        content,
        role: "user",
      });

      // Build conversation history for AI
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Get AI response
      const chatRes = await axios.post("/api/chat", { messages: history });
      const aiContent = chatRes.data.message || "Sorry, I couldn't generate a response.";

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiContent,
      };

      // Save AI message to DB
      await axios.post("/api/message", {
        conversationId: convId,
        content: aiContent,
        role: "assistant",
      });

      setMessages((prev) => [...prev, aiMessage]);

      // Update conversation's lastMessage in sidebar
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, lastMessage: aiContent, timestamp: new Date().toISOString() }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      // Redirect to the new conversation URL if we just created one
      if (!id && convId) {
        router.push(`/chat/${convId}`);
      }
    }
  };

  const handleNewChat = () => {
    router.push("/chat");
    setSidebarOpen(false);
  };

  const handleSelectConversation = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
    setSidebarOpen(false);
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await axios.delete(`/api/conversation?conversationId=${conversationId}`);
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      if (activeConversation === conversationId) {
        router.push("/chat");
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/auth" });
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 mb-4 z-10"
        >
          <Bot className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-medium tracking-wide text-muted-foreground z-10"
        >
          Securing Connection...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-200`}
      >
        <ChatSidebar
          conversations={conversations}
          activeId={activeConversation}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="font-semibold text-foreground">
            {activeConversation
              ? conversations.find((c) => c.id === activeConversation)?.title || "Chat"
              : "New Chat"}
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 px-2 py-2">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground max-w-md">
                  I'm your AI assistant. Ask me anything - from coding questions to creative writing, I'm here to help.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                  />
                ))}
                {isTyping && (
                  <ChatMessage role="assistant" content="" isTyping />
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="px-4 lg:px-8 py-4 shrink-0">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
