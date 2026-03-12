"use client";

import { useState } from "react";
import { Bot, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { CharacterMorph } from "@/components/ui/character-morph";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const texts = ["BotixAI", "Powered by Advanced AI", "Natural Conversations", "Lightning Fast", "Always Learning"];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="relative z-50 container mx-auto px-6 py-6">
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

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 ml-4">
                        <Magnetic intensity={1.2}>
                            <Link href="/auth">
                                <Button variant="outline">Sign in</Button>
                            </Link>
                        </Magnetic>
                        <Magnetic intensity={1.2}>
                            <Link href="/auth">
                                <Button variant="gradient">
                                    Get Started
                                </Button>
                            </Link>
                        </Magnetic>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-6 right-6 mt-4 p-8 glass rounded-3xl md:hidden flex flex-col gap-8 z-50 overflow-hidden"
                    >
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="h-px bg-white/10 w-full" />
                        <div className="flex flex-col gap-4">
                            <Link href="/auth" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full justify-center text-lg py-6">
                                    Sign in
                                </Button>
                            </Link>
                            <Link href="/auth" onClick={() => setIsOpen(false)}>
                                <Button variant="gradient" className="w-full justify-center text-lg py-6">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

