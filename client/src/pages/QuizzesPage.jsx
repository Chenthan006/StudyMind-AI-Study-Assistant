import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function QuizzesPage() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        api.get('/notes').then(res => setNotes(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a14] text-white">
            {/* Header */}
            <div className="border-b border-white/5 px-8 py-5 flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition text-sm">← Back</button>
                <div>
                    <h1 className="text-xl font-black">🏆 Quizzes</h1>
                    <p className="text-gray-500 text-xs">Test your knowledge from your notes</p>
                </div>
            </div>

            <div className="flex h-[calc(100vh-73px)]">
                {/* Left Sidebar */}
                <div className="w-72 border-r border-white/5 p-5 overflow-y-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Your Notes</p>
                    <div className="space-y-2">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => navigate(`/note/${note.id}`)}
                                className="p-4 rounded-2xl cursor-pointer transition border bg-white/5 border-white/5 text-gray-400 hover:bg-[#a3e635]/10 hover:border-[#a3e635]/30 hover:text-white group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#a3e635]/20 rounded-lg flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#a3e635]/30 transition">🏆</div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm truncate">{note.title}</p>
                                        <p className="text-xs text-gray-600">{new Date(note.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Info Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-2xl font-black text-white mb-2">Ready to test yourself?</h2>
                    <p className="text-gray-500 mb-8 max-w-md">Select a note from the left to open it and generate a quiz from your study material.</p>
                    <div className="grid grid-cols-3 gap-4 max-w-lg w-full">
                        {[
                            { icon: '🧪', label: '5 Questions', desc: 'Per quiz' },
                            { icon: '✅', label: 'Instant', desc: 'Answer feedback' },
                            { icon: '📊', label: 'Score', desc: 'Tracking' },
                        ].map((f, i) => (
                            <div key={i} className="bg-[#12121e] border border-white/10 rounded-2xl p-4 text-center">
                                <div className="text-2xl mb-2">{f.icon}</div>
                                <p className="font-bold text-sm text-white">{f.label}</p>
                                <p className="text-gray-500 text-xs">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}