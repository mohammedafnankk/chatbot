import { Bot, Plus, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

const ChatSidebar = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) => {
  

  return (
    <div className="w-72 h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-foreground">NexusAI</span>
        </div>
        
        <Button
          variant="gradient"
          className="w-full"
          onClick={onNewChat}
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="text-xs font-medium text-muted-foreground px-3 py-2">
          Recent Conversations
        </p>
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
              activeId === conv.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
            }`}
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{conv.title}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
        <Link href={"/auth"}>
        <button 
          className="w-full flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign out</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatSidebar;
