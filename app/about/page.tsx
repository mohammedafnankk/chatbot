import { Bot, Users, Target, Shield, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import ShutterText from "@/components/ui/shutter-text";
import { GlitchText } from "@/components/ui/glitch-text";
import Link from "next/link";
import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "About | NexusAI",
    description: "Learn about NexusAI, our mission to redefine human-AI interaction, and our commitment to responsible AI.",
};

export default function About() {
    const missionText = ["Our Mission"];

    return (
        <div className="min-h-screen bg-background overflow-hidden flex flex-col">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            <Navbar />

            <main className="relative z-10 grow container mx-auto px-6 pt-20 pb-32">
                <div className="max-w-4xl mx-auto text-center animate-fade-in mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                        <Bot className="w-4 h-4" />
                        <GlitchText
                            words={["About NexusAI"]}
                            className="text-sm font-medium"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight flex flex-col items-center">
                        <ShutterText text="Redefining" trigger="auto" className="text-5xl md:text-7xl font-bold text-foreground mb-2 leading-tight" color="text-white" />
                        <ShutterText text="Human-AI Interaction" trigger="auto" className="text-5xl md:text-7xl font-bold text-primary leading-tight" color="text-primary" />
                    </h1>

                    <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
                        We're building the future of conversational AI. Our mission is to create intelligent, empathetic, and highly capable AI assistants that empower individuals and organizations to achieve more.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
                    {[
                        {
                            icon: Target,
                            title: "Our Vision",
                            description: "To make advanced AI accessible, intuitive, and seamlessly integrated into seamless workflows.",
                        },
                        {
                            icon: Users,
                            title: "User-Centric",
                            description: "Everything we build starts with the user. We prioritize privacy, security, and exceptional user experience.",
                        },
                        {
                            icon: Shield,
                            title: "Responsible AI",
                            description: "We are committed to developing AI technology ethically, with robust safety measures and transparent practices.",
                        },
                    ].map((item, index) => (
                        <Magnetic intensity={1.2} key={index}>
                            <div
                                className="glass rounded-2xl p-6 text-center animate-slide-up h-full flex flex-col"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground text-sm grow">
                                    {item.description}
                                </p>
                            </div>
                        </Magnetic>
                    ))}
                </div>

                <div className="mt-32 max-w-4xl mx-auto text-center glass rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-white mb-6">Join Us on this Journey</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Experience the power of NexusAI today and see how we can transform the way you work and communicate.
                    </p>
                    <Magnetic>
                        <Link href="/auth">
                            <Button variant="gradient" size="lg" className="text-base">
                                Get Started Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </Magnetic>
                </div>
            </main>
            <Footer />
        </div>
    );
}
