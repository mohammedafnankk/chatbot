'use client'
import { useState } from "react";
import { PromptInputBox } from "../ui/ai-prompt-box";

interface ChatInputProps {
  onSend: (message: string, files?: File[]) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (message: string, files?: File[]) => {
    if (!disabled) {
      onSend(message, files);
    }
  };

  return (
    <div className="relative flex w-full items-center justify-center">
      <PromptInputBox
        onSend={handleSend}
        isLoading={isLoading}
        placeholder="Send a message to see loading state..."
      />
    </div>
  );
};

export default ChatInput;
