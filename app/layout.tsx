import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A2B Rides | HopRide | GrokRide - Premium Local Rides NW Ohio',
  description: 'Premium rides. Better pay for drivers. Instant & scheduled rides across NW Ohio. Tesla fleet. Local focus.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <header className="border-b border-gold-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-bold text-sm">
                A2B
              </div>
              <span className="font-bold text-xl gold-text">A2B Rides</span>
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:text-gold-400 transition">Home</a>
              <a href="/book" className="hover:text-gold-400 transition font-medium">Book a Ride</a>
              <a href="/login" className="hover:text-gold-400 transition">Login</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gold-500/20 mt-20 py-8 text-center text-sm text-gray-400">
          <p>A2B Rides • HopRide • GrokRide • Premium local rides for NW Ohio</p>
          <p className="mt-2">Toledo • Perrysburg • Findlay • Fremont • Tiffin & surrounding areas</p>
        </footer>
      </body>
    </html>
  );
}
