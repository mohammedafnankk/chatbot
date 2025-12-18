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
      { id: "2", role: "assistant", content: "Below is a complete, step‑by‑step guide to spin up a brand‑new **React** project using **Vite** (the fast, modern build tool).  \nThe instructions cover the most common scenarios – plain JavaScript, TypeScript, and a few handy extras – so you can pick the one that fits your workflow.\n\n---\n\n## 1️⃣ Prerequisites\n\n| What you need | Why |\n|---------------|-----|\n| **Node.js** ≥ 14 (≥ 18 recommended) | Vite runs on Node and bundles your code. |\n| **npm** (bundled with Node) **or** **Yarn** / **pnpm** | Package manager for installing dependencies. |\n| **Git** (optional) | For version control and easy `git init`. |\n\nVerify your installations:\n\n```bash\nnode -v   # e.g. v20.12.0\nnpm -v    # e.g. 10.5.0\n```\n\n---\n\n## 2️⃣ Create the project\n\nVite ships with a **project scaffolding CLI** (`create-vite`).  \nRun one of the commands below depending on the package manager you prefer.\n\n| Package manager | Command |\n|-----------------|---------|\n| npm | `npm create vite@latest` |\n| Yarn | `yarn create vite` |\n| pnpm | `pnpm create vite` |\n\n### 2.1 Interactive wizard (npm example)\n\n```bash\nnpm create vite@latest\n```\n\nYou’ll be prompted for:\n\n1. **Project name** – e.g. `my-react-app`.  \n2. **Framework** – select **React**.  \n3. **Variant** – choose **JavaScript** or **TypeScript** (we’ll show both).  \n\nAfter answering, Vite will generate a folder with everything you need.\n\n> **Tip:** If you already know the answers you can skip the prompts by passing them as arguments:\n\n```bash\n# JavaScript\nnpm create vite@latest my-react-app -- --template react\n\n# TypeScript\nnpm create vite@latest my-react-app -- --template react-ts\n```\n\n> The double‑dash (`--`) tells npm that the following flags belong to the `create-vite` script, not to npm itself.\n\n---\n\n## 3️⃣ Install dependencies\n\nMove into the new folder and install the generated `package.json` dependencies:\n\n```bash\ncd my-react-app\nnpm install   # or `yarn` / `pnpm install`\n```\n\n---\n\n## 4️⃣ Project structure (what you just got)\n\n```\nmy-react-app/\n├─ public/                 # static assets (favicon, robots.txt, etc.)\n│   └─ vite.svg\n├─ src/\n│   ├─ assets/             # images, fonts, …\n│   ├─ App.jsx            # root component (App.tsx if TS)\n│   ├─ main.jsx           # entry point – mounts <App />\n│   └─ index.css          # global styles\n├─ .gitignore\n├─ index.html             # Vite injects script tags here\n├─ vite.config.{js,ts}    # Vite config (mostly defaults)\n└─ package.json\n```\n\n---\n\n## 5️⃣ Run the development server\n\n```bash\nnpm run dev   # or `yarn dev` / `pnpm dev`\n```\n\nYou should see something like:\n\n```\n  VITE v5.2.0  ready in 350 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n```\n\nOpen the URL in your browser – you’ll see the default Vite + React starter page.\n\n---\n\n## 6️⃣ Building for production\n\nWhen you’re ready to ship:\n\n```bash\nnpm run build   # creates a `dist/` folder\n```\n\n- Vite bundles your code with **esbuild** (JS/TS) and **Rollup** (CSS, assets).  \n- The output in `dist/` is fully static and can be served by any static host (Netlify, Vercel, GitHub Pages, Nginx, etc.).\n\nTo preview the built site locally:\n\n```bash\nnpm run preview\n```\n\n---\n\n## 7️⃣ (Optional) Add TypeScript to an existing JavaScript Vite project\n\nIf you started with the plain `react` template but later decide to switch to TypeScript:\n\n```bash\n# 1. Install TS & type defs\nnpm i -D typescript @types/react @types/react-dom\n\n# 2. Rename files\nmv src/main.jsx src/main.tsx\nmv src/App.jsx   src/App.tsx\n\n# 3. Create a minimal tsconfig (Vite can generate one automatically)\nnpx tsc --init --pretty --jsx react-jsx\n```\n\nVite will automatically detect the `tsconfig.json` and start using TypeScript on the next `npm run dev`.\n\n---\n\n## 8️⃣ Common additions you’ll likely need\n\n| Feature | Install command | Quick usage |\n|---------|----------------|-------------|\n| **React Router** (v6) | `npm i react-router-dom` | ```jsx import { BrowserRouter, Routes, Route } from \"react-router-dom\"; <BrowserRouter>…</BrowserRouter>``` |\n| **State management** (Redux Toolkit) | `npm i @reduxjs/toolkit react-redux` | ```js import { configureStore } from \"@reduxjs/toolkit\";``` |\n| **CSS Modules** | No extra install; just name files `Component.module.css` | ```import styles from \"./Button.module.css\";``` |\n| **Sass/SCSS** | `npm i -D sass` | ```import \"./styles.scss\";``` |\n| **ESLint + Prettier** | `npm i -D eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier` | Follow Vite’s **eslint-plugin-react** config or use `npm init @eslint/config`. |\n| **Testing** (Vitest + React Testing Library) | `npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event` | Add `vite.config.ts` → `test: { globals: true, environment: \"jsdom\" }` and run `npm run test`. |\n\n> **Tip:** Vite already ships a `vite.config.js` that works out‑of‑the‑box. Most of the time you won’t need to touch it unless you want custom aliases, proxying, or extra plugins.\n\n---\n\n## 9️⃣ Adding a custom path alias (e.g., `@/components`)\n\nEdit `vite.config.{js,ts}`:\n\n```js\nimport { defineConfig } from \"vite\";\nimport react from \"@vitejs/plugin-react\";\nimport { resolve } from \"node:path\";\n\nexport default defineConfig({\n  plugins: [react()],\n  resolve: {\n    alias: {\n      \"@\": resolve(__dirname, \"src\"),\n    },\n  },\n});\n```\n\nNow you can import like:\n\n```tsx\nimport Button from \"@/components/Button\";\n```\n\nIf you’re using TypeScript, add the same alias to `tsconfig.json`:\n\n```json\n{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"src/*\"]\n    }\n  }\n}\n```\n\n---\n\n## 10️⃣ Deploying a Vite‑React app\n\n| Platform | Steps |\n|----------|-------|\n| **Netlify** | 1️⃣ Connect repo → 2️⃣ Set *Build command*: `npm run build`  <br> *Publish directory*: `dist` |\n| **Vercel** | 1️⃣ `vercel` CLI or UI → 2️⃣ Build command `npm run build` <br> Output folder `dist` |\n| **GitHub Pages** | 1️⃣ Add `homepage` field in `package.json`: `\"homepage\": \"https://<user>.github.io/<repo>\"` <br> 2️⃣ Run `npm run build` <br> 3️⃣ Push `dist/` to `gh-pages` branch (or use the `gh-pages` npm package). |\n| **Static host (Nginx, Apache, etc.)** | Serve the `dist/` folder as a static site. Remember to fallback to `index.html` for client‑side routing (e.g., `try_files $uri $uri/ /index.html;` in Nginx). |\n\n---\n\n## 11️⃣ Full “starter” script (copy‑paste)\n\nIf you want a one‑liner that creates a **React + TypeScript + ESLint + Prettier** starter, run:\n\n```bash\n# 1️⃣ Scaffold\nnpm create vite@latest my-react-app -- --template react-ts\n\n# 2️⃣ Move in & install core + dev tools\ncd my-react-app\nnpm install\n\n# 3️⃣ Add linting & formatting\nnpm i -D eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier\n\n# 4️⃣ Create a basic .eslintrc.cjs\ncat <<'EOF' > .eslintrc.cjs\nmodule.exports = {\n  env: {\n    browser: true,\n    es2021: true,\n  },\n  extends: [\n    \"eslint:recommended\",\n    \"plugin:react/recommended\",\n    \"plugin:react-hooks/recommended\",\n    \"prettier\",\n  ],\n  parserOptions: {\n    ecmaFeatures: { jsx: true },\n    ecmaVersion: \"latest\",\n    sourceType: \"module\",\n  },\n  plugins: [\"react\", \"react-hooks\", \"prettier\"],\n  rules: {\n    \"prettier/prettier\": \"error\",\n    \"react/react-in-jsx-scope\": \"off\", // not needed with React 17+\n  },\n  settings: {\n    react: { version: \"detect\" },\n  },\n};\nEOF\n\n# 5️⃣ Add a Prettier config (optional)\ncat <<'EOF' > .prettierrc\n{\n  \"singleQuote\": true,\n  \"trailingComma\": \"es5\",\n  \"printWidth\": 80,\n  \"tabWidth\": 2,\n  \"semi\": true\n}\nEOF\n\n# 6️⃣ Add npm scripts (optional, but convenient)\nnpx json -I -f package.json -e 'this.scripts.lint=\"eslint src --ext .js,.jsx,.ts,.tsx\"', \\\n                               -e 'this.scripts.format=\"prettier --write src\"', \\\n                               -e 'this.scripts.check=\"npm run lint && npm run format\"'\n\n# 7️⃣ Done! Run dev server\nnpm run dev\n```\n\n*(The `json` CLI used above is just a tiny helper to edit `package.json`; you can edit it manually if you prefer.)*\n\n---\n\n## ✅ TL;DR Checklist\n\n1. **Install Node** (≥ 18).  \n2. Run `npm create vite@latest my-react-app -- --template react` (or `react-ts`).  \n3. `cd my-react-app && npm install`.  \n4. `npm run dev` → develop at `http://localhost:5173`.  \n5. `npm run build` → production files in `dist/`.  \n6. Deploy `dist/` to any static host (Netlify, Vercel, etc.).  \n\nYou now have a blazing‑fast React development environment powered by Vite! 🚀  \n\nHappy coding! If you run into any hiccups, just ask – I’m here to help." },
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