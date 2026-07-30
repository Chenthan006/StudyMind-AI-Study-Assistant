import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeTab, setActiveTab] = useState('account');

  const logout = () => { localStorage.clear(); navigate('/login'); };

  const tabs = [
    { id: 'account', label: '👤 Account' },
    { id: 'security', label: '🔒 Security' },
    { id: 'preferences', label: '⚙️ Preferences' },
    { id: 'danger', label: '🗑 Danger Zone' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white p-8">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button onClick={() => navigate('/dashboard')} className="text-[#a3e635] text-sm mb-8 hover:underline flex items-center gap-2">
          ← Back to Dashboard
        </button>

        {/* Profile Header */}
        <div className="bg-[#12121e] border border-white/10 rounded-3xl p-8 mb-6 flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a3e635] flex items-center justify-center text-3xl font-black shadow-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#0a0a14]" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white">{user?.name}</h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#7c3aed] px-3 py-1 rounded-full font-semibold">
                Free Plan
              </span>
              <span className="text-xs bg-green-400/10 border border-green-400/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                Active
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#12121e] border border-white/10 rounded-2xl p-1.5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-[#7c3aed] text-white shadow-lg'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#12121e] border border-white/10 rounded-3xl p-8">

          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold">Account Information</h2>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
                <input
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7c3aed] transition"
                  defaultValue={user?.name}
                  readOnly
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                <input
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7c3aed] transition"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Member Since</label>
                <input
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-xl px-4 py-3 text-gray-400 text-sm"
                  defaultValue="May 2026"
                  readOnly
                />
              </div>
              <button className="bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-3 rounded-xl font-bold text-sm transition opacity-50 cursor-not-allowed">
                Save Changes (Coming Soon)
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold">Security Settings</h2>
              <div className="bg-white/5 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Password</p>
                  <p className="text-gray-500 text-xs mt-1">Last changed: Never</p>
                </div>
                <button className="bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#7c3aed] px-4 py-2 rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed">
                  Change Password
                </button>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Two-Factor Authentication</p>
                  <p className="text-gray-500 text-xs mt-1">Add extra security to your account</p>
                </div>
                <span className="text-xs bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">Coming Soon</span>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Active Sessions</p>
                  <p className="text-gray-500 text-xs mt-1">1 active session</p>
                </div>
                <button onClick={logout} className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition">
                  Sign Out All
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold">Preferences</h2>
              {[
                { label: 'AI Language', value: 'English', desc: 'Language for AI responses' },
                { label: 'Summary Style', value: 'Bullet Points', desc: 'How summaries are formatted' },
                { label: 'Quiz Difficulty', value: 'Medium', desc: 'Default quiz difficulty' },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 rounded-2xl p-5">
                  <div>
                    <p className="font-semibold text-sm">{pref.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{pref.desc}</p>
                  </div>
                  <span className="text-sm text-[#a3e635] font-semibold bg-[#a3e635]/10 border border-[#a3e635]/20 px-3 py-1 rounded-xl">
                    {pref.value}
                  </span>
                </div>
              ))}
              <p className="text-gray-600 text-xs">Preference editing coming soon!</p>
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-red-400">⚠️ Danger Zone</h2>
              <div className="border border-red-500/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">Delete All Notes</p>
                    <p className="text-gray-500 text-xs mt-1">Permanently delete all your uploaded notes</p>
                  </div>
                  <button className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition">
                    Delete All
                  </button>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">Delete Account</p>
                    <p className="text-gray-500 text-xs mt-1">Permanently delete your account and all data</p>
                  </div>
                  <button className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}