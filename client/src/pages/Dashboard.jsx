import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [notes, setNotes] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('Dashboard');
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleUpload = async () => {
    if (!title || !file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    try {
      await api.post('/notes/upload', formData);
      setShowUpload(false);
      setTitle('');
      setFile(null);
      fetchNotes();
    } catch { alert('Upload failed'); }
    setLoading(false);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this note?')) return;
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  const logout = () => { localStorage.clear(); navigate('/login'); };

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  const navItems = [
    { icon: '⊞', label: 'Dashboard', path: '/dashboard' },
    { icon: '📚', label: 'My Notes', path: '/dashboard' },
    { icon: '⚡', label: 'Flashcards', path: '/flashcards' },
    { icon: '🏆', label: 'Quizzes', path: '/quizzes' },
  ];
  return (
    <div className="flex min-h-screen bg-[#0a0a14] text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-5 flex flex-col fixed h-screen bg-[#0a0a14] z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="flex items-center justify-center text-2xl">
            🧠
          </div>
          <span className="font-black text-lg tracking-tight">StudyMind</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { setActive(item.label); navigate(item.path); }}
              className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 text-sm transition ${active === item.label
                  ? 'bg-[#7c3aed]/20 text-white border border-[#7c3aed]/30 font-semibold'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {active === item.label && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />}
            </button>
          ))}
        </nav>

        {/* Profile */}
        {/* Profile */}
        <div className="border-t border-white/5 pt-4">
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition cursor-pointer group"
          >
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a3e635] flex items-center justify-center text-sm font-black shadow-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0a14]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); logout(); }}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition p-1 rounded-lg"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {notes.length === 0 ? "Upload your first note to get started." : `You have ${notes.length} note${notes.length !== 1 ? 's' : ''} ready to study.`}
            </p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition flex items-center gap-2"
          >
            + Upload Note
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: '📄', label: 'Total Notes', value: notes.length, color: 'from-[#7c3aed]/20 to-transparent', border: 'border-[#7c3aed]/20' },
            { icon: '🧠', label: 'AI Summaries', value: notes.length, color: 'from-blue-500/20 to-transparent', border: 'border-blue-500/20' },
            { icon: '🧪', label: 'Quizzes Taken', value: notes.length * 2, color: 'from-[#a3e635]/20 to-transparent', border: 'border-[#a3e635]/20' },
          ].map((s, i) => (
            <div key={i} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-5`}>
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        {notes.length > 0 && (
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#7c3aed] transition text-sm placeholder-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Notes */}
        {filteredNotes.length === 0 && notes.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">No notes yet</h3>
            <p className="text-gray-500 mb-6">Upload your first document to get started</p>
            <button onClick={() => setShowUpload(true)} className="bg-[#7c3aed] px-6 py-3 rounded-xl font-bold">
              + Upload Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map(note => (
              <div
                key={note.id}
                onClick={() => navigate(`/note/${note.id}`)}
                className="bg-[#12121e] border border-white/5 hover:border-[#7c3aed]/40 rounded-2xl p-6 cursor-pointer transition group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#7c3aed]/5 rounded-full blur-2xl group-hover:bg-[#7c3aed]/10 transition" />
                <div className="flex justify-between items-start mb-5 relative">
                  <div className="w-11 h-11 bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-xl flex items-center justify-center text-xl">
                    📄
                  </div>
                  <button
                    onClick={(e) => handleDelete(note.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition text-xs px-2 py-1 rounded-lg hover:bg-red-400/10"
                  >
                    🗑 Delete
                  </button>
                </div>
                <h3 className="font-bold text-base text-white mb-1 group-hover:text-[#a3e635] transition truncate">
                  {note.title}
                </h3>
                <p className="text-gray-600 text-xs mb-4">
                  {new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-black tracking-widest bg-[#7c3aed]/10 border border-[#7c3aed]/20 px-2.5 py-1 rounded-lg text-[#7c3aed]">
                    AI Summary
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-widest bg-[#a3e635]/10 border border-[#a3e635]/20 px-2.5 py-1 rounded-lg text-[#a3e635]">
                    Quiz
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#12121e] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#7c3aed]/20 rounded-xl flex items-center justify-center">📤</div>
              <div>
                <h2 className="text-lg font-bold text-white">Upload Note</h2>
                <p className="text-gray-500 text-xs">PDF or TXT files supported</p>
              </div>
            </div>
            <input
              type="text"
              placeholder="Give your note a title..."
              className="w-full bg-[#0a0a14] text-white px-4 py-3 rounded-xl border border-white/10 mb-4 focus:outline-none focus:border-[#7c3aed] transition text-sm placeholder-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 mb-6 text-center hover:border-[#7c3aed]/40 transition">
              <input
                type="file"
                accept=".pdf,.txt"
                className="w-full text-gray-400 text-sm cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {!file && <p className="text-gray-600 text-xs mt-2">PDF or TXT up to 10MB</p>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                disabled={loading || !title || !file}
                className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-40 text-white font-bold py-3 rounded-xl transition"
              >
                {loading ? 'Uploading...' : 'Upload Note'}
              </button>
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-3 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}