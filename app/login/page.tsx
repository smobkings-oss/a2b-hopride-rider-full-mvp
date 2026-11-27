'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (!error) setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-2xl border border-gold-500/30 bg-zinc-900/50">
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-6">Sign in with a magic link</p>

        {sent ? (
          <div className="text-center text-green-400">
            Check your email for the login link!
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gold-500/30 rounded-xl focus:border-gold-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-400 transition"
            >
              Send Magic Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
