// Library

// Components
import Footer from "@/components/Footer/footer";
import Navigation from "@/components/navigation/nav";

// Hooks & Utils

// Api

// Interface & States

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full font-noto">
            <div className="w-full flex justify-center content">
                {/* 1080 ~ 1440 */}
                <div className="w-full min-w-[1160px] max-w-[1520px] px-20">
                    <Navigation />

                    {children}
                </div>
            </div>

            <Footer />
        </div>
    );
}
