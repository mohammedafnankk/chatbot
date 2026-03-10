'use client';

import { Bot, Plus, MessageSquare, Settings, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onDeleteConversation: (id: string) => void;
  onSignOut: () => void;
}

const ChatSidebar = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onSignOut,
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
        {conversations.length === 0 ? (
          <p className="text-xs text-muted-foreground px-3 py-4 text-center">
            No conversations yet
          </p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-center gap-2 ${activeId === conv.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                }`}
            >
              <button
                onClick={() => onSelectConversation(conv.id)}
                className="flex items-start gap-3 flex-1 min-w-0"
              >
                <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate text-left">{conv.title}</p>
                  {conv.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5 text-left">
                      {conv.lastMessage}
                    </p>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/20 hover:text-destructive shrink-0"
                title="Delete conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
