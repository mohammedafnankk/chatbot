'use client';

import ChatInput from "@/components/chat/ChatInput";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";


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

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "React best practices",
    lastMessage: "Here are some key patterns...",
    timestamp: "2 hours ago",
    messages: [
      { id: "1", role: "user", content: "What are the best practices for React?" },
      { id: "2", role: "assistant", content: "Here are some key React best practices:\n\n1. **Component Composition** - Break down your UI into small, reusable components\n\n2. **State Management** - Keep state as close as possible to where it's used\n\n3. **Performance** - Use React.memo, useMemo, and useCallback wisely\n\n4. **Custom Hooks** - Extract reusable logic into custom hooks" },
    ],
  },
  {
    id: "2",
    title: "Python vs JavaScript",
    lastMessage: "Both languages have their strengths...",
    timestamp: "Yesterday",
    messages: [],
  },
  {
    id: "3",
    title: "Database design tips",
    lastMessage: "For optimal database design...",
    timestamp: "2 days ago",
    messages: [],
  },
];

export default function Chat() {
      const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<string | null>("1");
  const [messages, setMessages] = useState<Message[]>(mockConversations[0].messages);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(content),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Let me break it down for you...\n\nBased on my analysis, here are the key points to consider:\n\n1. **Understanding the context** - First, we need to establish the foundation\n\n2. **Implementation details** - Here's how you can approach this practically\n\n3. **Best practices** - Following industry standards will help ensure success",
      "I'd be happy to help you with that! Here's my perspective:\n\nThe approach you're taking is on the right track. Consider these additional factors:\n\n• Start with a clear objective\n• Break down complex problems into smaller parts\n• Test iteratively and gather feedback",
      "Interesting question! Let me share some insights:\n\nFrom my understanding, this involves several interconnected concepts. The key is to find the right balance between simplicity and functionality.\n\nWould you like me to elaborate on any specific aspect?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveConversation(null);
    setSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setMessages(conv.messages);
      setActiveConversation(id);
      setSidebarOpen(false);
    }
  };

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
        className={`fixed lg:relative inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200`}
      >
        <ChatSidebar
          conversations={conversations}
          activeId={activeConversation}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
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
              ? conversations.find((c) => c.id === activeConversation)?.title || "New Chat"
              : "New Chat"}
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <span className="text-3xl">✨</span>
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