import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { fetchNote(); fetchChat(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const fetchNote = async () => {
    const res = await api.get(`/notes/${id}`);
    setNote(res.data);
    if (res.data.summary) setSummary(res.data.summary);
  };

  const fetchChat = async () => {
    const res = await api.get(`/chat/${id}`);
    setChatId(res.data.chatId);
    const msgs = await api.get(`/chat/${res.data.chatId}/messages`);
    setMessages(msgs.data);
  };

  const handleSummary = async () => {
    if (loadingSummary) return;
    setLoadingSummary(true);
    try {
      const res = await api.post(`/notes/${id}/summary`);
      setSummary(res.data.summary);
    } catch (err) {
      alert(err.response?.data?.error || 'Summary failed');
    }
    setLoadingSummary(false);
  };

  const handleQuiz = async () => {
    if (loadingQuiz) return;
    setLoadingQuiz(true);
    setSubmitted(false);
    setUserAnswers({});
    setShowQuiz(true);
    try {
      const res = await api.post(`/notes/${id}/quiz`);
      setQuiz(res.data.quiz);
    } catch (err) {
      alert(err.response?.data?.error || 'Quiz failed');
    }
    setLoadingQuiz(false);
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    quiz.forEach((q, i) => { if (userAnswers[i] === q.answer) correct++; });
    setScore(correct);
    setSubmitted(true);
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const msg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setSending(true);
    try {
      const res = await api.post(`/chat/${chatId}/message`, { message: msg });
      setMessages(prev => [...prev, { role: 'ai', content: res.data.response }]);
    } catch { alert('Chat failed'); }
    setSending(false);
  };

  if (!note) return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center text-white">Loading...</div>
  );

  return (
    <div className="flex h-screen bg-[#0a0a14] text-white overflow-hidden">

      {/* Left Content */}
      <div className="flex-1 overflow-y-auto p-10 border-r border-white/10">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/dashboard')} className="text-[#a3e635] text-sm mb-6 block hover:underline">
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-8">{note.title}</h1>

          {/* Summary */}
          <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 p-6 rounded-2xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#7c3aed] font-bold text-lg">AI Summary</h2>
              <button
                onClick={handleSummary}
                disabled={loadingSummary}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                {loadingSummary ? 'Generating...' : summary ? 'Regenerate' : 'Generate Summary'}
              </button>
            </div>
             {summary ? (
          <div className="text-gray-300 text-sm leading-relaxed prose prose-invert max-w-none">
            <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
            ) : (
            <p className="text-gray-500 text-sm">Click "Generate Summary" to get an AI summary.</p>
            )}
          </div>

          {/* Quiz */}
          <div className="bg-[#a3e635]/5 border border-[#a3e635]/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#a3e635] font-bold text-lg">🧪 Quiz</h2>
              <button
                onClick={handleQuiz}
                disabled={loadingQuiz}
                className="bg-[#a3e635] hover:bg-[#8fd12a] text-black px-4 py-2 rounded-xl text-sm font-bold transition"
              >
                {loadingQuiz ? 'Generating...' : quiz.length ? 'New Quiz' : 'Generate Quiz'}
              </button>
            </div>

            {!showQuiz && (
              <p className="text-gray-500 text-sm">Click "Generate Quiz" to test yourself on this material.</p>
            )}

            {showQuiz && quiz.length > 0 && (
              <div className="space-y-5 mt-4">
                {quiz.map((q, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4">
                    <p className="text-white text-sm font-semibold mb-3">{i + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, j) => {
                        let style = 'bg-white/5 hover:bg-white/10 text-gray-300';
                        if (submitted) {
                          if (opt === q.answer) style = 'bg-green-500/20 border border-green-500/50 text-green-300';
                          else if (userAnswers[i] === opt) style = 'bg-red-500/20 border border-red-500/50 text-red-300';
                          else style = 'bg-white/5 text-gray-500';
                        } else if (userAnswers[i] === opt) {
                          style = 'bg-[#7c3aed]/30 border border-[#7c3aed]/50 text-white';
                        }
                        return (
                          <button
                            key={j}
                            onClick={() => !submitted && setUserAnswers({ ...userAnswers, [i]: opt })}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {!submitted ? (
                  <button onClick={handleSubmitQuiz} className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] py-3 rounded-xl font-bold transition">
                    Submit Quiz
                  </button>
                ) : (
                  <div className="bg-white/5 rounded-xl p-6 text-center">
                    <p className="text-3xl font-black text-white">{score}/{quiz.length}</p>
                    <p className="text-gray-400 mt-2">
                      {score === quiz.length ? '🎉 Perfect score!' : score >= quiz.length / 2 ? '👍 Good job!' : '📚 Keep studying!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Chat */}
      <div className="w-[400px] bg-[#0d0d1a] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-bold text-lg">StudyMind Chat</h2>
          <p className="text-gray-500 text-sm">Ask anything about your notes</p>
          
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.length === 0 && (
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none">
              <p className="text-sm text-gray-400 italic">Welcome! Ask me anything about your notes.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-[#7c3aed] text-white rounded-tr-none'
                  : 'bg-white/5 text-gray-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none text-sm text-gray-400">Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="p-6 border-t border-white/5">
          <div className="relative">
            <input
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white focus:outline-none focus:border-[#7c3aed] transition text-sm placeholder-gray-600"
              placeholder="Ask about your notes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={sending}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7c3aed] hover:bg-[#6d28d9] w-9 h-9 rounded-xl flex items-center justify-center transition"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}