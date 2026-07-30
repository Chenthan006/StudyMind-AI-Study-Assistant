import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen text-white">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          <span>🧠</span>
          <span>StudyMind</span>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => navigate('/login')} className="text-gray-400 hover:text-white transition">Login</button>
          <button onClick={() => navigate('/register')} className="bg-[#7c3aed] px-5 py-2 rounded-full font-medium hover:bg-[#6d28d9] transition">Get Started</button>
        </div>
      </nav>
      <header className="max-w-4xl mx-auto text-center pt-20 pb-32">
        <span className="text-[#a3e635] font-mono text-sm border border-[#a3e635]/30 px-3 py-1 rounded-full bg-[#a3e635]/10">New: AI Quiz Generator 2.0</span>
        <h1 className="text-7xl font-bold mt-6 leading-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Master your studies with the power of AI.
        </h1>
        <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
          Upload your lecture notes and watch StudyMind transform them into summaries, interactive quizzes, and AI chat in seconds.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <button onClick={() => navigate('/register')} className="bg-[#7c3aed] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition">Start for Free</button>
          <button onClick={() => navigate('/login')} className="border border-white/10 bg-white/5 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition">Sign In</button>
        </div>
        <div className="flex justify-center gap-12 mt-16 text-left">
          {[{ value: '12k+', label: 'DOCS ANALYZED' }, { value: '3', label: 'LANGUAGES' }, { value: '< 8s', label: 'AVG SUMMARY' }].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-gray-500 text-xs tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <p className="text-[#a3e635] text-sm font-semibold tracking-widest text-center mb-4">FEATURES</p>
        <h2 className="text-5xl font-black text-center text-white mb-4">Everything you need before exam week.</h2>
        <p className="text-gray-400 text-center mb-16">Built for the way real students actually study.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '📄', title: 'Smart Summaries', desc: 'Bullet points or exam-style — generated in seconds.' },
            { icon: '💬', title: 'Chat with Notes', desc: 'Ask anything. Answers grounded in your document.' },
            { icon: '🧪', title: 'Quiz Generator', desc: 'Auto-generate MCQs. Test yourself before the exam.' },
            { icon: '🌐', title: 'Multilingual', desc: 'English, Tamil, Sinhala — whatever works for you.' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 hover:border-[#7c3aed]/50 rounded-2xl p-8 transition">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-black text-white text-center mb-12">Frequently asked questions.</h2>
        <div className="space-y-3">
          {[
            { q: 'How accurate are the answers?', a: 'Answers are grounded in your uploaded documents using RAG technology.' },
            { q: 'Is my data used for training?', a: 'No. Your documents are never used to train AI models.' },
            { q: 'Which languages are supported?', a: 'English, Tamil, and Sinhala. More coming soon.' },
            { q: 'What file types can I upload?', a: 'PDF and TXT files are supported.' },
          ].map((f, i) => (
            <details key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer group">
              <summary className="flex justify-between items-center text-white font-semibold list-none">
                {f.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform inline-block">+</span>
              </summary>
              <p className="text-gray-400 mt-4">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 pb-24 text-center">
        <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-3xl p-16">
          <h2 className="text-5xl font-black text-white mb-4">Ready to study smarter?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of students already using StudyMind.</p>
          <button onClick={() => navigate('/register')} className="bg-[#a3e635] hover:bg-[#8fd12a] text-black font-bold px-10 py-4 rounded-xl text-lg transition">
            Get started for free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧠</span>
              <span className="font-bold">StudyMind</span>
            </div>
            <p className="text-gray-500 text-sm">Multilingual AI study companion.<br />Built by students, for students.</p>
          </div>
          <div className="grid grid-cols-3 gap-12 text-sm">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Demo', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map((col, i) => (
              <div key={i}>
                <p className="text-white font-semibold mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l, j) => (
                    <li key={j}><a href="#" className="text-gray-500 hover:text-white transition">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-gray-600 text-sm">
          <span>© 2026 StudyMind. Built by <span className="text-cyan-400 font-semibold">D. Chenthan</span> 🎓</span>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/d-chenthan-25018535b" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition">LinkedIn</a>
            <span>React · Node.js · Groq AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}