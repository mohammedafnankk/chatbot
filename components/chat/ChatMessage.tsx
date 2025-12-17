import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const ChatMessage = ({ role, content, isTyping }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          isUser ? "bg-user-bubble" : "bg-ai-bubble"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-user-bubble-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-primary" />
        )}
      </div>

      {/* Message */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-user-bubble text-user-bubble-foreground rounded-br-md"
            : "bg-ai-bubble text-ai-bubble-foreground rounded-bl-md"
        )}
      >
        {isTyping ? (
          <div className="flex items-center gap-1.5 py-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
