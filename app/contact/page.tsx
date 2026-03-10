import { Mail, Phone, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { GlitchText } from "@/components/ui/glitch-text";
import ShutterText from "@/components/ui/shutter-text";
import { ContactForm } from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | NexusAI",
    description: "Get in touch with the NexusAI team. We're here to answer your questions and explore partnerships.",
};

export default function Contact() {
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
                        <Mail className="w-4 h-4" />
                        <GlitchText
                            words={["Get in Touch"]}
                            className="text-sm font-medium"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                        <ShutterText text="Let's Start a" trigger="auto" className="text-5xl md:text-7xl font-bold text-foreground mb-2 leading-tight" color="text-white" />
                        <br />
                        <ShutterText text="Conversation" trigger="auto" className="text-5xl md:text-7xl font-bold text-primary leading-tight" color="text-primary" />
                    </h1>

                    <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
                        Have questions about NexusAI? Interested in partnering with us? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>

                        <div className="glass rounded-2xl p-6 flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Email</h3>
                                    <p className="text-muted-foreground">afnankk9995@gmail.com</p>
                                    <p className="text-muted-foreground">afnank9995@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                                    <p className="text-muted-foreground">+91 9995745595</p>
                                    <p className="text-muted-foreground">Mon-Fri 9am-5pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Office</h3>
                                    <p className="text-muted-foreground">123 Demo Street</p>
                                    <p className="text-muted-foreground">Malappuram, Kerala, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <ContactForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
