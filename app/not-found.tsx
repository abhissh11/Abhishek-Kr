"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const totalDuration = 10000; // 10 seconds
        const updateInterval = 50; // update every 50ms for smooth progress bar
        const totalSteps = totalDuration / updateInterval;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setProgress(100 - (currentStep / totalSteps) * 100);

            if (currentStep >= totalSteps) {
                clearInterval(interval);
                // Attempt to go back
                if (window.history.length > 1) {
                    router.back();
                } else {
                    router.push("/");
                }
            }
        }, updateInterval);

        return () => clearInterval(interval);
    }, [router]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-900 overflow-hidden relative">
            <div className="z-10 flex flex-col items-center text-center max-w-md w-full gap-6">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-yellow-600 drop-shadow-lg">
                    404
                </h1>

                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Page Not Found</h2>
                    <p className="text-zinc-400 text-sm md:text-base">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="w-full mt-8 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-zinc-500 font-medium px-1">
                        <span>Redirecting back...</span>
                        <span>{Math.ceil((progress / 100) * 10)}s</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden shrink-0 shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (window.history.length > 1) { router.back(); }
                        else { router.push("/"); }
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors border border-zinc-700/50 shadow-lg cursor-pointer"
                >
                    Go Back Now
                </button>
            </div>

            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        </main>
    );
}
