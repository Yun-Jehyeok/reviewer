import Footer from '@/components/footer';
import Navigation from '@/components/nav';
import AntdProvider from '@/components/wrapper/AntdProvider';
import QueryProviderWrapper from '@/components/wrapper/QueryProviderWrapper';
import RQProvider from '@/components/wrapper/RQProvider';
import RecoilRootWrapper from '@/components/wrapper/RecoilRootWrapper';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://cdn.iamport.kr/v1/iamport.js" />

        <Script
          src="https://cdn.iamport.kr/v1/iamport.js"
          strategy="beforeInteractive"
        />
        <AntdProvider>
          <RecoilRootWrapper>
            <QueryProviderWrapper>
              <RQProvider>
                <div className="w-full">
                  <div className="w-full flex justify-center">
                    <div className="w-full min-w-[1340px] max-w-[1730px] px-20">
                      <Navigation />

                      {children}
                    </div>
                  </div>

                  <Footer />
                </div>
              </RQProvider>
            </QueryProviderWrapper>
          </RecoilRootWrapper>
        </AntdProvider>
      </body>
    </html>
  );
}
