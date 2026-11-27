'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Navigation, DollarSign } from 'lucide-react';

type RideType = 'instant' | 'scheduled';

export default function BookRide() {
  const [rideType, setRideType] = useState<RideType>('instant');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [estimate, setEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'scheduled') setRideType('scheduled');
  }, []);

  const calculateEstimate = () => {
    if (!pickup || !dropoff) return;
    // Placeholder estimate logic (replace with real distance API)
    const base = 8.5;
    const distanceFactor = Math.random() * 15 + 5;
    const surge = rideType === 'instant' ? 1.0 : 1.15;
    setEstimate(Math.round((base + distanceFactor) * surge * 100) / 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production: create ride record in Supabase
    // await supabase.from('rides').insert({ ... })
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-gold-500/30 bg-zinc-900/50">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Navigation className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ride Requested!</h2>
          <p className="text-gray-400 mb-6">
            {rideType === 'instant' 
              ? 'Matching you with a nearby driver now...' 
              : `Your ride is scheduled for ${scheduledDate} at ${scheduledTime}.`}
          </p>
          <p className="text-gold-400 font-semibold text-lg mb-6">
            Estimated fare: ${estimate?.toFixed(2)}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 border border-gold-500/50 rounded-xl hover:bg-gold-500/10 transition"
          >
            Book Another Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        Book Your <span className="gold-text">Ride</span>
      </h1>
      <p className="text-center text-gray-400 mb-8">Instant hop-on or schedule ahead across NW Ohio</p>

      {/* Ride Type Toggle */}
      <div className="flex p-1 bg-zinc-900 rounded-xl mb-8 border border-gold-500/20">
        <button
          onClick={() => setRideType('instant')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            rideType === 'instant' 
              ? 'bg-gold-500 text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Instant Ride
        </button>
        <button
          onClick={() => setRideType('scheduled')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            rideType === 'scheduled' 
              ? 'bg-gold-500 text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Schedule Ahead
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pickup */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <MapPin className="w-4 h-4 text-gold-400" /> Pickup Location
          </label>
          <input
            type="text"
            placeholder="Enter pickup address or use current location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onBlur={calculateEstimate}
            className="w-full px-4 py-3 bg-zinc-900 border border-gold-500/30 rounded-xl focus:border-gold-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Dropoff */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <MapPin className="w-4 h-4 text-gold-400" /> Dropoff Location
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onBlur={calculateEstimate}
            className="w-full px-4 py-3 bg-zinc-900 border border-gold-500/30 rounded-xl focus:border-gold-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Scheduled fields */}
        {rideType === 'scheduled' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 text-gold-400" /> Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-gold-500/30 rounded-xl focus:border-gold-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Clock className="w-4 h-4 text-gold-400" /> Time
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-gold-500/30 rounded-xl focus:border-gold-500 focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        {/* Estimate */}
        {estimate && (
          <div className="p-4 rounded-xl border border-gold-500/30 bg-gold-500/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gold-400" />
              <span>Estimated Fare</span>
            </div>
            <span className="text-2xl font-bold text-gold-400">${estimate.toFixed(2)}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !pickup || !dropoff}
          className="w-full py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold text-lg rounded-xl hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-gold-500/20"
        >
          {loading ? 'Requesting...' : rideType === 'instant' ? 'Request Instant Ride' : 'Schedule Ride'}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mt-6">
        By requesting a ride you agree to our terms. Drivers are independent contractors. 
        Service area: NW Ohio (Toledo metro and surrounding).
      </p>
    </div>
  );
}
