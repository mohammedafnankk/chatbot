import { Bot, User, Copy, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors absolute top-2 right-2"
      title="Copy code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

const ChatMessage = ({ role, content, isTyping }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 animate-slide-up w-full",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-1",
          isUser ? "bg-user-bubble" : "bg-primary/10 border border-primary/20"
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
          "max-w-[85%] sm:max-w-[80%] rounded-2xl px-5 py-4",
          isUser
            ? "bg-user-bubble text-user-bubble-foreground rounded-br-md"
            : "text-foreground w-full bg-ai-bubble/20 rounded-bl-md"
        )}
      >
        {isTyping ? (
          <div className="flex items-center gap-2 py-1 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : isUser ? (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = inline || !match;

                  return isInline ? (
                    <code {...props} className={cn("bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono text-primary", className)}>
                      {children}
                    </code>
                  ) : (
                    <div className="relative group rounded-md my-4 border border-border/50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50">
                        <span className="text-xs font-mono text-muted-foreground lowercase">{match ? match[1] : 'code'}</span>
                        <CopyButton text={String(children).replace(/\n$/, "")} />
                      </div>
                      <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus}
                        language={match ? match[1] : 'javascript'}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1rem', background: 'hsl(var(--card))' }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-6 border border-border/50 rounded-lg">
                      <table className="w-full text-sm text-left border-collapse">
                        {children}
                      </table>
                    </div>
                  );
                },
                thead({ children }) {
                  return <thead className="bg-muted/50">{children}</thead>;
                },
                th({ children }) {
                  return <th className="border-b border-border/50 px-4 py-3 font-semibold text-foreground">{children}</th>;
                },
                td({ children }) {
                  return <td className="border-b border-border/50 px-4 py-3 text-muted-foreground">{children}</td>;
                },
                a({ children, href }) {
                  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline hover:text-primary/80 transition-colors font-medium">{children}</a>
                },
                h1({ children }) { return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1> },
                h2({ children }) { return <h2 className="text-xl font-bold mt-6 mb-3 border-b border-border/50 pb-2">{children}</h2> },
                h3({ children }) { return <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3> },
                ul({ children }) { return <ul className="list-disc list-outside ml-5 my-4 space-y-2">{children}</ul> },
                ol({ children }) { return <ol className="list-decimal list-outside ml-5 my-4 space-y-2">{children}</ol> },
                li({ children }) { return <li className="pl-1 leading-relaxed text-muted-foreground">{children}</li> },
                p({ children }) { return <p className="mb-4 last:mb-0 leading-relaxed text-foreground/90">{children}</p> },
                strong({ children }) { return <strong className="font-semibold text-foreground">{children}</strong> }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
