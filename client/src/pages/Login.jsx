import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-[#7c3aed] opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#a3e635] opacity-5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
    🧠
  </div>
          <h1 className="text-2xl font-black text-white">StudyMind</h1>
          <p className="text-gray-500 text-sm mt-1">Your AI-powered study companion</p>
        </div>

        <div className="bg-[#12121e] border border-white/10 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to continue studying</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] transition placeholder-gray-700 text-sm"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] transition placeholder-gray-700 text-sm"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="animate-spin">⟳</span> Signing in...</>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-600 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#a3e635] font-semibold hover:text-white transition">
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}