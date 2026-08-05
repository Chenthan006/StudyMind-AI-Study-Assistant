import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Flashcards() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        api.get('/notes').then(res => setNotes(res.data));
    }, []);

    const handleGenerate = async (note) => {
        setLoading(true);
        setFlashcards([]);
        setCurrentIndex(0);
        setFlipped(false);
        setSelectedNote(note);
        try {
            const res = await api.post(`/notes/${note.id}/flashcards`);
            setFlashcards(res.data.flashcards);
        } catch {
            alert('Failed to generate flashcards');
        }
        setLoading(false);
    };

    const next = () => { setFlipped(false); setTimeout(() => setCurrentIndex(i => Math.min(i + 1, flashcards.length - 1)), 150); };
    const prev = () => { setFlipped(false); setTimeout(() => setCurrentIndex(i => Math.max(i - 1, 0)), 150); };

    return (
        <div className="min-h-screen bg-[#0a0a14] text-white">
            {/* Header */}
            <div className="border-b border-white/5 px-8 py-5 flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition text-sm">← Back</button>
                <div>
                    <h1 className="text-xl font-black">⚡ Flashcards</h1>
                    <p className="text-gray-500 text-xs">AI-generated flashcards from your notes</p>
                </div>
            </div>

            <div className="flex h-[calc(100vh-73px)]">
                {/* Left Sidebar — Notes List */}
                <div className="w-72 border-r border-white/5 p-5 overflow-y-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Your Notes</p>
                    <div className="space-y-2">
                        {notes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => handleGenerate(note)}
                                className={`p-4 rounded-2xl cursor-pointer transition border ${selectedNote?.id === note.id
                                        ? 'bg-[#7c3aed]/20 border-[#7c3aed]/40 text-white'
                                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#7c3aed]/20 rounded-lg flex items-center justify-center text-sm flex-shrink-0">⚡</div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm truncate">{note.title}</p>
                                        <p className="text-xs text-gray-600">{new Date(note.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Flashcard Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    {!selectedNote && !loading && (
                        <div className="text-center">
                            <div className="text-6xl mb-4">⚡</div>
                            <h2 className="text-xl font-bold text-white mb-2">Select a note to begin</h2>
                            <p className="text-gray-500">Choose a note from the left to generate flashcards</p>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center">
                            <div className="text-5xl mb-4 animate-pulse">⚡</div>
                            <p className="text-gray-400">Generating flashcards...</p>
                        </div>
                    )}

                    {flashcards.length > 0 && !loading && (
                        <div className="w-full max-w-2xl">
                            {/* Title + Progress */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-bold text-lg">{selectedNote?.title}</h2>
                                <span className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full">
                                    {currentIndex + 1} / {flashcards.length}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-white/5 rounded-full h-1 mb-8">
                                <div
                                    className="bg-[#7c3aed] h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                                />
                            </div>

                            {/* Flashcard */}
                            <div
                                onClick={() => setFlipped(!flipped)}
                                className="cursor-pointer bg-[#12121e] border border-white/10 hover:border-[#7c3aed]/40 rounded-3xl p-12 text-center min-h-[260px] flex flex-col items-center justify-center transition mb-6 group"
                            >
                                <span className={`text-xs uppercase tracking-widest font-bold mb-6 px-3 py-1 rounded-full ${flipped ? 'bg-green-400/10 text-green-400' : 'bg-[#7c3aed]/20 text-[#7c3aed]'
                                    }`}>
                                    {flipped ? '✅ Answer' : '❓ Question'}
                                </span>
                                <p className="text-xl font-semibold text-white leading-relaxed">
                                    {flipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                                </p>
                                <p className="text-gray-600 text-xs mt-8 group-hover:text-gray-400 transition">
                                    Click to flip
                                </p>
                            </div>

                            {/* Controls */}
                            <div className="flex gap-3">
                                <button
                                    onClick={prev}
                                    disabled={currentIndex === 0}
                                    className="flex-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition text-sm"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setFlipped(!flipped)}
                                    className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] py-3 rounded-xl font-semibold transition text-sm"
                                >
                                    Flip Card
                                </button>
                                <button
                                    onClick={next}
                                    disabled={currentIndex === flashcards.length - 1}
                                    className="flex-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition text-sm"
                                >
                                    Next →
                                </button>
                            </div>

                            {currentIndex === flashcards.length - 1 && (
                                <button
                                    onClick={() => { setCurrentIndex(0); setFlipped(false); }}
                                    className="w-full mt-3 bg-[#a3e635] hover:bg-[#8fd12a] text-black font-bold py-3 rounded-xl transition text-sm"
                                >
                                    🔄 Restart Flashcards
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}