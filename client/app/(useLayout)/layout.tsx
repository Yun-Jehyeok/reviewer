import Footer from '@/components/Footer/footer';
import Navigation from '@/components/navigation/nav';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-center content">
                <div className="w-full min-w-[1340px] max-w-[1730px] px-20">
                    <Navigation />

                    {children}
                </div>
            </div>

            <Footer />
        </div>
    );
}
