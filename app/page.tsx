import Image from "next/image";
import { Bot, Sparkles, MessageSquare, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">NexusAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={"/auth"}>
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href={"/auth"}>
              <Button variant="gradient" className="">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Powered by Advanced AI
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Intelligent
            <br />
            <span className="gradient-text">Conversation Partner</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the next generation of AI-powered conversations. Smart,
            intuitive, and designed to understand you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={"/auth"}>
              <Button variant="gradient" size="lg" className="text-base">
                Start Chatting Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              // onClick={() => navigate("/auth")}
              className="text-base"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto">
          {[
            {
              icon: MessageSquare,
              title: "Natural Conversations",
              description:
                "Engage in fluid, context-aware dialogues that feel genuinely human.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description:
                "Get instant responses powered by state-of-the-art AI technology.",
            },
            {
              icon: Sparkles,
              title: "Always Learning",
              description:
                "Our AI continuously improves to better understand your needs.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
