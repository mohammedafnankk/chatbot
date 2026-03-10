import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { CharacterMorph } from "@/components/ui/character-morph";

export function Navbar() {
    const texts = ["NexusAI", "Powered by Advanced AI", "Natural Conversations", "Lightning Fast", "Always Learning"];

    return (
        <header className="relative z-10 container mx-auto px-6 py-6">
            <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <CharacterMorph
                        texts={texts}
                        className="text-xl font-bold text-primary hidden sm:block"
                    />
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground mr-4">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Magnetic intensity={1.2}>
                            <Link href={"/auth"}>
                                <Button variant="outline">Sign in</Button>
                            </Link>
                        </Magnetic>
                        <Magnetic intensity={1.2}>
                            <Link href={"/auth"}>
                                <Button variant="gradient" className="">
                                    Get Started
                                </Button>
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </nav>
        </header>
    );
}
