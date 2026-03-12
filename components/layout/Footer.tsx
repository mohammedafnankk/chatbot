'use client';
import Link from "next/link";
import { Bot, Github } from "lucide-react";
export function Footer() {
    return (
        <footer className="glass border-t border-border mt-10">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Bot className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold text-foreground">BotixAI</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            The future of conversational AI. Intelligent, intuitive, and designed to understand you.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Demo
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 text-center border-t border-border pt-8 flex justify-between max-sm:flex-col gap-2 items-center">
                    <p className="text-muted-foreground text-sm">
                        &copy; {new Date().getFullYear()} BotixAI. All rights reserved.
                    </p>
                    <div className="flex items-center justify-between gap-4">
                        <a href="https://mhd-afnan.vercel.app/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                            Made with ❤️ by Afnan
                        </a>
                        <a href="https://github.com/mohammedafnankk/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                            <Github className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}