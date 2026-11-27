import Link from 'next/link';
import { MapPin, Clock, Shield, Car } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-black/50 mb-8 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Now serving NW Ohio
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium rides.<br />
            <span className="gold-text">Better for everyone.</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Instant or scheduled rides across Toledo, Perrysburg, Findlay and surrounding areas. 
            Tesla fleet. Transparent pricing. Drivers get paid better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-gold-500/25"
            >
              Book Instant Ride
            </Link>
            <Link
              href="/book?type=scheduled"
              className="px-8 py-4 border border-gold-500/50 text-gold-400 font-semibold rounded-xl hover:bg-gold-500/10 transition"
            >
              Schedule a Ride
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: 'Instant & Scheduled', desc: 'Hop on now or book ahead. Perfect for airport runs, appointments, or nights out.' },
            { icon: MapPin, title: 'Local Focus', desc: 'Built for NW Ohio. We know the roads, the traffic, and the communities.' },
            { icon: Shield, title: 'Safe & Transparent', desc: 'Real-time tracking, verified drivers, clear pricing with no surprises.' },
            { icon: Car, title: 'Tesla Fleet', desc: 'Premium vehicles. Quiet, clean, and modern rides with local drivers.' },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gold-500/20 bg-zinc-900/50 holographic-border">
              <f.icon className="w-10 h-10 text-gold-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to ride?</h2>
        <p className="text-gray-400 mb-8">Drivers earn more. Riders get premium service. Everyone wins.</p>
        <Link
          href="/book"
          className="inline-block px-10 py-4 bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 transition"
        >
          Place a Ride Order
        </Link>
      </section>
    </div>
  );
}
