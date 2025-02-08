// Library

// Components
import Footer from "@/components/Footer/footer";
import Navigation from "@/components/navigation/nav";

// Hooks & Utils

// Api

// Interface & States

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* 1080 ~ 1440 */}
                <div className={styles.section}>
                    <Navigation />

                    {children}
                </div>
            </div>

            <Footer />
        </div>
    );
}

const styles = {
    container: "w-full h-full font-noto",
    wrapper: "w-full flex justify-center content",
    section: "w-full min-w-[1160px] max-w-[1520px] px-20",
};
