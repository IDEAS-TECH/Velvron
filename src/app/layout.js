import './styles/globals.css';
import { ScrollTriggerProvider } from './components/ScrollAnimations/ScrollTriggerProvider';

const siteUrl = 'https://velvronlabs.vercel.app';
const siteTitle = 'Velvron Labs - Engineering the Future';
const siteDescription = 'Building tomorrow\'s technology today with cutting-edge solutions in AI, cloud, and automation.';
const siteImage = '/assets/Logo.png';

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Velvron Labs',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'Velvron Labs Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
    creator: '@velvronlabs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification ID if you have one
    // google: 'your-google-verification-code',
  },
};

export const viewport = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#001233',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased">
        <ScrollTriggerProvider>
          {children}
        </ScrollTriggerProvider>
      </body>
    </html>
  );
}