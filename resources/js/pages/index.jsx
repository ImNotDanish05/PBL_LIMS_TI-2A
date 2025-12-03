import { Head, Link } from "@inertiajs/react";
import { FlaskConical, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-hijauGelap via-primary-hijauTua to-primary-hijauGelap relative overflow-hidden">
            <Head title="Home" />

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-primary-hijauMuda/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
                <div className="absolute w-96 h-96 bg-primary-toska/10 rounded-full blur-3xl top-1/2 -right-48 animate-pulse duration-1000" />
                <div className="absolute w-72 h-72 bg-primary-hijauPudar/5 rounded-full blur-3xl bottom-0 left-1/2 animate-pulse duration-500" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-hijauGelap/70 to-primary-hijauGelap/90" />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                            <FlaskConical className="w-6 h-6 text-primary-hijauMuda" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-hijauMuda to-primary-toska bg-clip-text text-transparent">
                                LABOO
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 text-primary-hijauMuda text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                <span>Premium Laboratory Solutions</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-white via-primary-hijauTerang to-primary-toska bg-clip-text text-transparent">
                                    Experience
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-primary-hijauMuda to-primary-toska bg-clip-text text-transparent">
                                    Excellence
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-primary-hijauTerang/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Elevate your research with cutting-edge laboratory management solutions designed for precision and efficiency.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/auth/login"
                                className="group relative px-8 py-4 bg-gradient-to-r from-primary-hijauMuda to-primary-hijauMuda/70 rounded-full font-semibold text-white shadow-2xl shadow-primary-hijauMuda/30 hover:shadow-primary-hijauMuda/50 transition-all duration-300 hover:scale-105"
                            >
                                <span className="flex items-center gap-2 justify-center">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-primary-hijauMuda/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                                    <Shield className="w-5 h-5 text-primary-hijauMuda" />
                                </div>
                                <p className="text-sm text-primary-hijauTerang font-medium">Secure</p>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-primary-toska/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                                    <Zap className="w-5 h-5 text-primary-toska" />
                                </div>
                                <p className="text-sm text-primary-hijauTerang font-medium">Fast</p>
                            </div>
                            <div className="space-y-2">
                                <div className="w-10 h-10 bg-primary-hijauMuda/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                                    <Sparkles className="w-5 h-5 text-primary-hijauMuda" />
                                </div>
                                <p className="text-sm text-primary-hijauTerang font-medium">Modern</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-center justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-hijauMuda/20 to-primary-toska/20 blur-2xl animate-pulse" />
                            <div className="absolute -inset-4 rounded-full border border-primary-hijauMuda/20 animate-spin-slow" />
                            <div className="absolute -inset-8 rounded-full border border-primary-toska/10 animate-spin-slower" />

                            <div className="relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary-hijauMuda/20 to-primary-toska/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent" />
                                <FlaskConical className="w-40 h-40 md:w-48 md:h-48 text-primary-hijauMuda drop-shadow-2xl relative z-10" />

                                <div className="absolute top-20 left-20 w-2 h-2 bg-primary-hijauMuda rounded-full animate-ping" />
                                <div className="absolute bottom-24 right-16 w-2 h-2 bg-primary-toska rounded-full animate-ping duration-700" />
                                <div className="absolute top-32 right-24 w-1 h-1 bg-white rounded-full animate-ping duration-1000" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-hijauMuda/50 to-transparent" />
        </div>
    );
}
