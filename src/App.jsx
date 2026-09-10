import './App.css';
import { useState, useEffect } from 'react';
// ─── Data ─────────────────────────────────────────────────────────────────────
const MATERIAS = [
    { id: 'portugues', label: 'Português', icon: '📚', color: '#FF6B35', bg: '#FFF0EA', topicos: ['Interpretação de texto', 'Gramática', 'Ortografia', 'Pontuação'] },
    { id: 'matematica', label: 'Matemática', icon: '🔢', color: '#6C3AFF', bg: '#F0EBFF', topicos: ['Operações básicas', 'Frações', 'Porcentagem', 'Equações'] },
];
const QUESTOES = [
    // Matemática
    { q: 'Quanto é 15 × 4?', opcao: ['40', '50', '60', '70'], resposta: 2, explicacao: '15 × 4 = 60. Multiplique 15 por 4: 10×4=40, 5×4=20, logo 40+20=60.' },
    { q: 'Qual é a metade de 48?', opcao: ['22', '24', '26', '28'], resposta: 1, explicacao: '48 ÷ 2 = 24.' },
    { q: '3/4 equivale a quantos por cento?', opcao: ['50%', '65%', '70%', '75%'], resposta: 3, explicacao: '3 ÷ 4 = 0,75 = 75%.' },
    { q: 'Se x + 7 = 15, qual é o valor de x?', opcao: ['6', '7', '8', '9'], resposta: 2, explicacao: 'x = 15 − 7 = 8.' },
    { q: 'Quanto é 9² (nove ao quadrado)?', opcao: ['18', '72', '81', '99'], resposta: 2, explicacao: '9 × 9 = 81.' },
    { q: 'Qual fração representa 0,5?', opcao: ['1/3', '1/2', '2/3', '3/4'], resposta: 1, explicacao: '0,5 = 5/10 = 1/2.' },
    { q: 'Quanto é 25% de 200?', opcao: ['25', '40', '50', '75'], resposta: 2, explicacao: '25% de 200 = 200 × 0,25 = 50.' },
    { q: 'Qual é o resultado de 144 ÷ 12?', opcao: ['10', '11', '12', '14'], resposta: 2, explicacao: '144 ÷ 12 = 12.' },
    { q: 'Quantos lados tem um hexágono?', opcao: ['4', '5', '6', '7'], resposta: 2, explicacao: 'Hexa = seis. Um hexágono tem 6 lados.' },
    { q: 'Qual é o MMC de 4 e 6?', opcao: ['8', '10', '12', '24'], resposta: 2, explicacao: 'Múltiplos de 4: 4,8,12… Múltiplos de 6: 6,12… MMC = 12.' },
    // Português
    { q: 'Qual é o sinônimo de "alegre"?', opcao: ['Triste', 'Feliz', 'Cansado', 'Assustado'], resposta: 1, explicacao: 'Sinônimo é uma palavra com significado semelhante. "Feliz" tem o mesmo sentido de "alegre".' },
    { q: 'Em qual alternativa há um verbo no infinitivo?', opcao: ['Ele corre rápido.', 'Vou correr amanhã.', 'Ele correu ontem.', 'Estou correndo agora.'], resposta: 1, explicacao: 'O infinitivo é a forma verbal que termina em -ar, -er, -ir. "Correr" é infinitivo.' },
    { q: 'Qual frase está pontuada corretamente?', opcao: ['Ele comprou maçã, pão e leite', 'Ele comprou maçã pão e leite.', 'Ele comprou, maçã pão, e leite.', 'Ele comprou maçã pão, e leite'], resposta: 0, explicacao: 'As vírgulas devem separar itens de uma enumeração de forma clara e correta.' },
    { q: 'Qual palavra é um adjetivo?', opcao: ['Correr', 'Livro', 'Azul', 'Rapidamente'], resposta: 2, explicacao: 'Adjetivo é a palavra que qualifica um substantivo. "Azul" descreve a qualidade de algo.' },
    { q: 'Complete: "Eu ___ assistir ao filme."', opcao: ['gostei de', 'gosto de', 'gostaria', 'gostei'], resposta: 1, explicacao: 'A forma correta é "gosto de" porque o verbo "gostar" sempre é seguido pela preposição "de".' },
    { q: 'Qual é a diferença entre "mas" e "mais"?', opcao: ['São a mesma coisa', '"Mas" é conjunção, "mais" é adjetivo/advérbio', '"Mais" é conjunção, "mas" é substantivo', 'Não há diferença'], resposta: 1, explicacao: '"Mas" (conjunção) indica contraste. "Mais" (adjetivo/advérbio) indica quantidade ou intensidade.' },
    { q: 'Qual alternativa melhor completa: "Se você estudar, ___."', opcao: ['você falharia', 'você falhará', 'você terá êxito', 'você falhava'], resposta: 2, explicacao: 'Com "se" (condicional), o resultado deve estar em tempo futuro ou condicional. "Você terá êxito" é a melhor opção.' },
    { q: 'O que é um substantivo próprio?', opcao: ['Qualquer nome de pessoa', 'Nome de um lugar ou pessoa específica (com maiúscula)', 'Um adjetivo especial', 'Uma palavra que começa com maiúscula'], resposta: 1, explicacao: 'Substantivo próprio é aquele que designa um ser específico e é escrito com maiúscula inicial (ex: João, Brasil).' },
    { q: 'Em "O gato subiu no telhado", qual é o verbo?', opcao: ['Gato', 'Telhado', 'Subiu', 'No'], resposta: 2, explicacao: 'Verbo é a palavra que indica a ação. "Subiu" expressa a ação que o gato realizou.' },
    { q: 'Escolha o antônimo de "pequeno":', opcao: ['Minúsculo', 'Grande', 'Compacto', 'Breve'], resposta: 1, explicacao: 'Antônimo é uma palavra com significado oposto. "Grande" é o oposto de "pequeno".' },
];
const CONQUISTAS = [
    { icon: '🏆', label: 'Primeiro exercício concluído', earned: true },
    { icon: '⭐', label: '10 questões respondidas', earned: true },
    { icon: '🔥', label: '3 dias estudando', earned: true },
    { icon: '💎', label: '50 questões respondidas', earned: false },
    { icon: '🚀', label: 'Nota máxima em uma sessão', earned: false },
];
const LIVROS = [
    { id: 1, title: 'Gramática Essencial', author: 'Maria Luísa Campos', subject: 'Português', color: '#FF6B35', bg: '#FFF0EA', nivel: 'Básico', desc: 'Guia completo de gramática para o Ensino Fundamental com exemplos práticos e exercícios.', topicos: ['Classes de palavras', 'Sintaxe', 'Ortografia', 'Pontuação'], pages: 184, emoji: '📖' },
    { id: 2, title: 'Matemática Descomplicada', author: 'Carlos Mendes', subject: 'Matemática', color: '#6C3AFF', bg: '#F0EBFF', nivel: 'Básico', desc: 'Aprenda operações, frações e porcentagem de forma simples e divertida.', topicos: ['Operações básicas', 'Frações', 'Porcentagem', 'Equações'], pages: 210, emoji: '📐' },
    { id: 3, title: 'Interpretação de Texto', author: 'Ana Paula Rocha', subject: 'Português', color: '#FF6B35', bg: '#FFF0EA', nivel: 'Intermediário', desc: 'Estratégias para ler, interpretar e compreender textos de diferentes gêneros.', topicos: ['Leitura crítica', 'Inferência', 'Resumo', 'Argumentação'], pages: 156, emoji: '📝' },
    { id: 4, title: 'Álgebra para Todos', author: 'Roberto Lima', subject: 'Matemática', color: '#6C3AFF', bg: '#F0EBFF', nivel: 'Avançado', desc: 'Equações, inequações e sistemas lineares com resolução passo a passo.', topicos: ['Equações', 'Inequações', 'Sistemas', 'Funções'], pages: 242, emoji: '🔢' },
];
const VIDEOAULAS = [
    { id: 1, title: 'Introdução às frações', subject: 'Matemática', topico: 'Frações', duracao: '08:32', professor: 'Prof. Carlos Mendes', watched: false, progresso: 0 },
    { id: 2, title: 'Como resolver frações', subject: 'Matemática', topico: 'Frações', duracao: '12:15', professor: 'Prof. Carlos Mendes', watched: true, progresso: 100 },
    { id: 3, title: 'Exercícios resolvidos', subject: 'Matemática', topico: 'Frações', duracao: '10:45', professor: 'Prof. Carlos Mendes', watched: false, progresso: 40 },
    { id: 4, title: 'Classes de palavras', subject: 'Português', topico: 'Gramática', duracao: '09:20', professor: 'Profa. Ana Paula', watched: true, progresso: 100 },
    { id: 5, title: 'Pontuação na prática', subject: 'Português', topico: 'Pontuação', duracao: '07:55', professor: 'Profa. Ana Paula', watched: false, progresso: 65 },
    { id: 6, title: 'Porcentagem do zero', subject: 'Matemática', topico: 'Porcentagem', duracao: '11:10', professor: 'Prof. Roberto Lima', watched: false, progresso: 0 },
];
const APOSTILAS = [
    { id: 1, title: 'Apostila de Matemática — Porcentagem', subject: 'Matemática', color: '#6C3AFF', bg: '#F0EBFF', desc: 'Aprenda os conceitos básicos de porcentagem através de exemplos e exercícios.', pages: 32, progresso: 30, emoji: '📄' },
    { id: 2, title: 'Gramática — Classes de palavras', subject: 'Português', color: '#FF6B35', bg: '#FFF0EA', desc: 'Resumo completo sobre substantivos, adjetivos, verbos e demais classes.', pages: 28, progresso: 65, emoji: '📄' },
    { id: 3, title: 'Frações e Operações', subject: 'Matemática', color: '#6C3AFF', bg: '#F0EBFF', desc: 'Do conceito básico às operações com frações mistas e simplificação.', pages: 40, progresso: 0, emoji: '📄' },
    { id: 4, title: 'Interpretação de Texto', subject: 'Português', color: '#FF6B35', bg: '#FFF0EA', desc: 'Técnicas e estratégias para interpretar textos dissertativos e narrativos.', pages: 24, progresso: 80, emoji: '📄' },
];
const MATERIAIS_RECENTES = [
  { icon: '📖', label: 'Gramática — Classes de palavras', type: 'Apostila', progresso: 65, color: '#FF6B35', dest: 'mat-apostilas' },
  { icon: '▶️', label: 'Frações — Aula 2', type: 'Videoaula', progresso: 40, color: '#6C3AFF', dest: 'mat-videos' },
  { icon: '📄', label: 'Apostila de Matemática', type: 'Apostila', progresso: 30, color: '#6C3AFF', dest: 'mat-apostilas' },
];
const CORES = {
    violet: '#6C3AFF',
    orange: '#FF6B35',
    teal: '#00C9A7',
    yellow: '#FFD166',
    green: '#22C55E',
    red: '#EF4444',
    bg: '#F5F3FF',
    text: '#1A1035',
    muted: '#7B7494',
    card: '#FFFFFF',
};
const PERFIL_PADRAO = { name: 'Gustavo Augusto', email: 'gass7@discente.ifpe.edu.br', school: 'E.E. Escola Estadual', year: '7º ano', bio: 'Apaixonado por matemática e leitura!', avatar: '🧑' };
const CONTA_PADRAO = { email: 'gass7@discente.ifpe.edu.br', password: '123456' };
function carregarPerfil() {
  try {
    return { ...PERFIL_PADRAO, ...JSON.parse(localStorage.getItem('educamais-profile') || '{}') };
  }
  catch {
    return PERFIL_PADRAO;
  }
}
function carregarConta() {
  try {
    return { ...CONTA_PADRAO, ...JSON.parse(localStorage.getItem('educamais-account') || '{}') };
  }
  catch {
    return CONTA_PADRAO;
  }
}
const limitarValor = (numero, minimo, maximo) => Math.min(Math.max(numero, minimo), maximo);
function EstruturaCelular({ children, dark }) {
    return (<div style={{ minHeight: '100dvh', boxSizing: 'border-box', background: dark ? '#050816' : '#0f0a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '390px', minHeight: '780px', background: CORES.bg, borderRadius: '40px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(108,58,255,0.35), 0 0 0 10px rgba(255,255,255,0.06)', position: 'relative', display: 'flex', flexDirection: 'column', fontFamily: "'Nunito', system-ui, sans-serif", filter: dark ? 'brightness(0.78)' : 'none' }}>
        <div style={{ background: 'transparent', padding: '12px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: CORES.text, opacity: 0.5 }}>9:41</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <svg width="15" height="11" viewBox="0 0 15 11" fill={CORES.text} opacity={0.5}><rect x="0" y="4" width="3" height="7" rx="1"/><rect x="4" y="2" width="3" height="9" rx="1"/><rect x="8" y="0" width="3" height="11" rx="1"/><rect x="12" y="0" width="3" height="11" rx="1" opacity="0.3"/></svg>
            <svg width="16" height="11" viewBox="0 0 16 11" fill={CORES.text} opacity={0.5}><rect x="1" y="2" width="13" height="8" rx="2" strokeWidth="1.5" stroke={CORES.text} fill="none"/><rect x="14" y="4" width="2" height="4" rx="1"/><rect x="2.5" y="3.5" width="8" height="5" rx="1"/></svg>
          </div>
        </div>
        {children}
      </div>
    </div>);
}
function NavegacaoInferior({ screen, navegar }) {
    const abas = [
        { id: 'home', icon: '🏠', label: 'Início' },
        { id: 'subjects', icon: '📖', label: 'Matérias' },
        { id: 'materials', icon: '🎒', label: 'Materiais' },
        { id: 'performance', icon: '📊', label: 'Desempenho' },
        { id: 'profile', icon: '👤', label: 'Perfil' },
    ];
      return (<div style={{ display: 'flex', background: '#fff', borderTop: '1px solid #EDE9FF', padding: '10px 0 20px' }}>
      {abas.map(t => {
            const active = screen === t.id || (t.id === 'materials' && screen.startsWith('mat-'));
            return (<button key={t.id} onClick={() => navegar(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', border: 'none', background: 'none', cursor: 'pointer', padding: '4px 0' }}>
            <span style={{ fontSize: '18px', filter: active ? 'none' : 'grayscale(1) opacity(0.5)' }}>{t.icon}</span>
            <span style={{ fontSize: '9px', fontWeight: active ? 700 : 500, color: active ? CORES.violet : CORES.muted, fontFamily: "'Nunito', sans-serif" }}>{t.label}</span>
            {active && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: CORES.violet }}/>}
          </button>);
        })}
    </div>);
}
function BarraProgresso({ value, color = CORES.violet, height = 8 }) {
    return (<div style={{ background: '#EDE9FF', borderRadius: 99, height, overflow: 'hidden' }}>
      <div style={{ width: `${limitarValor(value, 0, 100)}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }}/>
    </div>);
}
function IndicadorEstatistica({ icon, value, label, color }) {
    return (<div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '12px 10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(108,58,255,0.08)' }}>
      <div style={{ fontSize: '20px', marginBottom: '2px' }}>{icon}</div>
      <div style={{ fontSize: '18px', fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: '10px', color: CORES.muted, fontWeight: 600 }}>{label}</div>
    </div>);
}
function BotaoVoltar({ label, navegar, dest }) {
    return (<button onClick={() => navegar(dest)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 10, padding: '6px 12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      ← {label ?? 'Voltar'}
    </button>);
}
function TelaAbertura({ onDone }) {
    useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, [onDone]);
    return (<div style={{ flex: 1, background: `linear-gradient(145deg, ${CORES.violet} 0%, #9B5DE5 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', paddingTop: '40px' }}>
      <div style={{ position: 'absolute', top: 60, right: 30, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
      <div style={{ position: 'absolute', top: 120, left: 20, width: 30, height: 30, background: CORES.yellow, borderRadius: 6, transform: 'rotate(20deg)' }}/>
      <div style={{ position: 'absolute', bottom: 180, right: 24, width: 50, height: 50, border: '4px solid rgba(255,255,255,0.2)', borderRadius: '50%' }}/>
      <div style={{ position: 'absolute', bottom: 240, left: 30, width: 24, height: 24, background: CORES.teal, transform: 'rotate(45deg)', borderRadius: 4 }}/>
      <div className="anim-popin" style={{ fontSize: 72 }}>🎓</div>
      <div className="anim-fadeup anim-delay-1" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>EducaMais</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', marginTop: '6px', fontWeight: 500 }}>Aprender pode ser mais fácil.</p>
      </div>
      <div className="anim-fadeup anim-delay-3" style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
        {[0, 1, 2].map(i => (<div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', animation: `bounce-dot 1.2s ease ${i * 0.2}s infinite` }}/>))}
      </div>
    </div>);
}
function TelaLogin({ navegar, account, mensagemSucesso, limparSucesso }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    function realizarLogin() {
      if (email.trim().toLowerCase() === account.email.toLowerCase() && pass === account.password) {
        setError('');
        limparSucesso();
        navegar('home');
        return;
      }
      limparSucesso();
      setError('E-mail ou senha incorretos. Confira seus dados e tente novamente.');
    }
    function acessarDemonstracao() {
      setError('');
      limparSucesso();
      navegar('home');
    }
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '80px 28px 28px', overflowY: 'auto' }}>
      <div className="anim-fadeup" style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎓</div>
        <h2 style={{ fontSize: '26px', fontWeight: 900, color: CORES.text, margin: 0 }}>Bem-vindo(a)!</h2>
        <p style={{ color: CORES.muted, fontSize: '14px', marginTop: '4px' }}>Entre na sua conta para continuar</p>
      </div>
      <div className="anim-fadeup anim-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>E-mail</label>
          <input value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="seu@email.com" type="email" style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${error ? CORES.red : email ? CORES.violet : '#DDD8F0'}`, outline: 'none', fontSize: '15px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box' }}/>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Senha</label>
          <input value={pass} onChange={e => { setPass(e.target.value); setError(''); }} placeholder="••••••••" type="password" style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${error ? CORES.red : pass ? CORES.violet : '#DDD8F0'}`, outline: 'none', fontSize: '15px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box' }}/>
        </div>
        {mensagemSucesso && <p role="status" style={{ margin: 0, padding: '10px 12px', borderRadius: 10, background: '#F0FDF4', color: '#15803D', fontSize: '12px', fontWeight: 700 }}>{mensagemSucesso}</p>}
        {error && <p role="alert" style={{ margin: 0, padding: '10px 12px', borderRadius: 10, background: '#FEF2F2', color: CORES.red, fontSize: '12px', fontWeight: 700 }}>{error}</p>}
        <button style={{ textAlign: 'right', background: 'none', border: 'none', cursor: 'pointer', color: CORES.violet, fontSize: '13px', fontWeight: 700, fontFamily: "'Nunito', sans-serif", padding: 0 }} onClick={() => navegar('forgot-password')}>Esqueci minha senha</button>
        <button onClick={realizarLogin} style={{ marginTop: '4px', padding: '15px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.35)` }}>Entrar</button>
        <button onClick={() => navegar('register')} style={{ padding: '14px', borderRadius: 14, background: 'transparent', color: CORES.violet, border: `2px solid ${CORES.violet}`, fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Criar uma conta</button>
        <button onClick={acessarDemonstracao} style={{ padding: '10px', border: 'none', background: 'none', color: CORES.muted, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Acessar app</button>
      </div>
    </div>);
}
function TelaCadastro({ navegar, aoCriar }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const campos = [
        { label: 'Nome', val: name, set: setName, ph: 'Seu nome completo', type: 'text' },
        { label: 'E-mail', val: email, set: setEmail, ph: 'seu@email.com', type: 'email' },
        { label: 'Senha', val: pass, set: setPass, ph: '••••••••', type: 'password' },
        { label: 'Confirmar senha', val: confirm, set: setConfirm, ph: '••••••••', type: 'password' },
    ];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '80px 28px 28px', overflowY: 'auto' }}>
      <button onClick={() => navegar('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: CORES.violet, fontSize: '13px', fontWeight: 700, padding: 0, textAlign: 'left', marginBottom: '16px', fontFamily: "'Nunito', sans-serif" }}>← Voltar</button>
      <div className="anim-fadeup" style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 900, color: CORES.text, margin: 0 }}>Criar conta</h2>
        <p style={{ color: CORES.muted, fontSize: '14px', marginTop: '4px' }}>Junte-se a milhares de estudantes</p>
      </div>
      <div className="anim-fadeup anim-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {campos.map(f => (<div key={f.label}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</label>
            <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} type={f.type} style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${f.val ? CORES.violet : '#DDD8F0'}`, outline: 'none', fontSize: '15px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box' }}/>
          </div>))}
        {error && <p role="alert" style={{ margin: 0, padding: '10px 12px', borderRadius: 10, background: '#FEF2F2', color: CORES.red, fontSize: '12px', fontWeight: 700 }}>{error}</p>}
        <button onClick={() => {
          if (!name.trim() || !email.trim() || pass.length < 6 || pass !== confirm) {
            setError('Preencha os campos corretamente. A senha precisa ter pelo menos 6 caracteres.');
            return;
          }
          aoCriar({ email: email.trim(), password: pass });
        }} style={{ marginTop: '8px', padding: '15px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.3)` }}>Criar conta</button>
      </div>
    </div>);
}
function TelaPremium({ navegar }) {
    const [planoSelecionado, definirPlanoSelecionado] = useState(null);
    const plans = [
        {
            id: 'mensal',
            name: 'Mensal',
            price: '29,90',
            period: '/mês',
            save: false,
            features: [
                '✅ Acesso a todas as matérias',
                '✅ Sem anúncios',
                '✅ Materiais ilimitados',
                '✅ Exercícios personalizados',
                '✅ Relatórios de desempenho',
                '❌ Aulas ao vivo',
                '❌ Correção personalizada',
            ],
        },
        {
            id: 'trimestral',
            name: 'Trimestral',
            price: '69,90',
            period: '/3 meses',
            save: true,
            savePercent: '22%',
            features: [
                '✅ Acesso a todas as matérias',
                '✅ Sem anúncios',
                '✅ Materiais ilimitados',
                '✅ Exercícios personalizados',
                '✅ Relatórios de desempenho',
                '✅ 2 aulas ao vivo por mês',
                '❌ Correção personalizada',
            ],
        },
        {
            id: 'anual',
            name: 'Anual',
            price: '189,90',
            period: '/ano',
            save: true,
            savePercent: '47%',
            features: [
                '✅ Acesso a todas as matérias',
                '✅ Sem anúncios',
                '✅ Materiais ilimitados',
                '✅ Exercícios personalizados',
                '✅ Relatórios de desempenho',
                '✅ Aulas ao vivo ilimitadas',
                '✅ Correção personalizada',
            ],
        },
    ];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
   
      <div style={{ background: `linear-gradient(145deg, #6C3AFF 0%, #9B5DE5 100%)`, padding: '60px 24px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 20, left: 20 }}>
          <button onClick={() => navegar('home')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '6px 12px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
            ← Voltar
          </button>
        </div>
        <div style={{ position: 'absolute', top: 30, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        <div style={{ position: 'absolute', bottom: -10, left: 20, width: 60, height: 60, background: CORES.yellow, borderRadius: '50%', opacity: 0.15 }}/>
        
        <div className="anim-fadeup">
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👑</div>
          <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: 900, margin: '0 0 6px' }}>EducaMais Premium</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', margin: 0 }}>Desbloqueie todo o potencial de seus estudos</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
     
        <div className="anim-fadeup" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, color: CORES.text, fontSize: '13px', margin: '0 0 12px' }}>Sua versão atual</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>📖</div>
            <div>
              <p style={{ fontWeight: 700, color: CORES.text, fontSize: '13px', margin: 0 }}>Versão Gratuita</p>
              <p style={{ color: CORES.muted, fontSize: '11px', margin: '2px 0 0' }}>Acesso limitado a conteúdos</p>
            </div>
          </div>
          <button onClick={() => definirPlanoSelecionado(null)} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: 12, background: '#F5F3FF', border: 'none', color: CORES.violet, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
            Seu plano atual
          </button>
        </div>

        
        <div className="anim-fadeup anim-delay-1">
          <p style={{ fontWeight: 800, fontSize: '13px', color: CORES.text, margin: '0 0 10px' }}>Escolha seu plano</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {plans.map((plan, i) => (<button key={plan.id} onClick={() => definirPlanoSelecionado(plan.id)} style={{
                position: 'relative',
                padding: '18px',
                borderRadius: 18,
                background: planoSelecionado === plan.id ? CORES.violet : '#fff',
                border: planoSelecionado === plan.id ? `3px solid ${CORES.violet}` : `2px solid ${plan.save ? CORES.orange : '#EDE9FF'}`,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Nunito', sans-serif",
                transition: 'all 0.2s',
                boxShadow: planoSelecionado === plan.id ? `0 8px 24px rgba(108,58,255,0.25)` : `0 2px 12px rgba(108,58,255,0.06)`,
                transform: planoSelecionado === plan.id ? 'scale(1.01)' : 'scale(1)',
            }} className={`anim-fadeup anim-delay-${i + 2}`}>
                {plan.save && (<div style={{ position: 'absolute', top: -10, right: 12, background: CORES.orange, color: '#fff', padding: '3px 12px', borderRadius: 99, fontSize: '10px', fontWeight: 800 }}>
                    ECONOMIZE {plan.savePercent}
                  </div>)}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: planoSelecionado === plan.id ? 'rgba(255,255,255,0.2)' : plan.save ? CORES.orange + '15' : CORES.violet + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                    {plan.id === 'mensal' ? '📅' : plan.id === 'trimestral' ? '📊' : '🏆'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800, color: planoSelecionado === plan.id ? '#fff' : CORES.text, fontSize: '15px', margin: '0 0 2px' }}>{plan.name}</p>
                    <p style={{ fontWeight: 700, color: planoSelecionado === plan.id ? 'rgba(255,255,255,0.9)' : CORES.violet, fontSize: '18px', margin: 0 }}>
                      R$ {plan.price}
                      <span style={{ fontSize: '12px', color: planoSelecionado === plan.id ? 'rgba(255,255,255,0.7)' : CORES.muted, fontWeight: 600 }}>{plan.period}</span>
                    </p>
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', border: planoSelecionado === plan.id ? `3px solid #fff` : `2px solid ${plan.save ? CORES.orange : '#EDE9FF'}`, background: planoSelecionado === plan.id ? 'rgba(255,255,255,0.3)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {planoSelecionado === plan.id && <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff' }}/>}
                  </div>
                </div>
              </button>))}
          </div>
        </div>

       
        {planoSelecionado && (<div className="anim-fadeup" style={{ background: '#fff', borderRadius: 18, padding: '18px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
            <p style={{ fontWeight: 800, color: CORES.text, fontSize: '13px', margin: '0 0 12px' }}>O que você ganha</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {plans.find(p => p.id === planoSelecionado)?.features.map((feature, i) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px' }}>{feature.startsWith('✅') ? '✅' : '❌'}</span>
                  <span style={{ color: feature.startsWith('✅') ? CORES.text : CORES.muted, fontSize: '13px', fontWeight: 600, opacity: feature.startsWith('✅') ? 1 : 0.6 }}>
                    {feature.replace('✅ ', '').replace('❌ ', '')}
                  </span>
                </div>))}
            </div>
          </div>)}

       
        {planoSelecionado ? (<button className="anim-fadeup" onClick={() => navegar('home')} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.35)` }}>
            💳 Assinar agora
          </button>) : (<button className="anim-fadeup" onClick={() => definirPlanoSelecionado('anual')} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.orange}, #FF8C5A)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(255,107,53,0.35)` }}>
            🚀 Explorar planos
          </button>)}

       
        <div className="anim-fadeup" style={{ textAlign: 'center', padding: '12px', borderRadius: 14, background: '#F5F3FF' }}>
          <p style={{ color: CORES.muted, fontSize: '11px', margin: 0, lineHeight: 1.6 }}>
            💳 Pagamento seguro<br />
            🔄 Cancele a qualquer momento<br />
            🎁 7 dias de teste gratuito
          </p>
        </div>
      </div>
    </div>);
}
function TelaInicio({ navegar, streak }) {
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
  <div style={{ background: `linear-gradient(145deg, ${CORES.violet} 0%, #9B5DE5 100%)`, padding: '60px 24px 28px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 20, right: -10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        <div style={{ position: 'absolute', bottom: -20, right: 30, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>
        <div className="anim-fadeup">
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>Olá, Gustavo!</p>
          <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: '2px 0 0' }}>O que você quer estudar hoje?</h2>
        </div>
        <div className="anim-fadeup anim-delay-1" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '8px 14px', width: 'fit-content' }}>
          <span style={{ fontSize: '18px' }}>🔥</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{streak} dias seguidos</span>
        </div>
      </div>
    <button className="anim-fadeup anim-delay-2" onClick={() => navegar('premium')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px', borderRadius: 18, background: `linear-gradient(135deg, ${CORES.orange}, #FF8C5A)`, border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 20px rgba(255,107,53,0.25)', transition: 'transform 0.15s', fontFamily: "'Nunito', sans-serif" }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>👑</div>
  <div style={{ flex: 1 }}>
    <p style={{ fontWeight: 800, color: '#fff', fontSize: '16px', margin: 0 }}>Ir para Premium</p>
    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: '2px 0 0' }}>Desbloqueie recursos avançados</p>
  </div>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>
      <div style={{ flex: 1, padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Subject cards */}
        {MATERIAS.map((s, i) => (<button key={s.id} onClick={() => navegar('subjects')} className={`anim-fadeup anim-delay-${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px', borderRadius: 18, background: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 16px rgba(108,58,255,0.10)', transition: 'transform 0.15s', fontFamily: "'Nunito', sans-serif" }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 800, color: CORES.text, fontSize: '16px', margin: 0 }}>{s.label}</p>
              <p style={{ color: CORES.muted, fontSize: '12px', margin: '2px 0 8px' }}>{s.id === 'portugues' ? 'Pratique leitura, gramática e interpretação.' : 'Resolva desafios e melhore suas habilidades.'}</p>
              <BarraProgresso value={s.id === 'portugues' ? 68 : 45} color={s.color} height={6}/>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CORES.muted} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>))}

        
        <button className="anim-fadeup anim-delay-3" onClick={() => navegar('materials')} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px', borderRadius: 18, background: `linear-gradient(135deg, #0f0a2e, #1a1060)`, border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 20px rgba(108,58,255,0.25)', transition: 'transform 0.15s', fontFamily: "'Nunito', sans-serif" }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>🎒</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 800, color: '#fff', fontSize: '15px', margin: 0 }}>Materiais de Estudo</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', margin: '2px 0 0' }}>Aprenda de diferentes formas.</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Continue estudando */}
        <div className="anim-fadeup anim-delay-4" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, fontSize: '13px', color: CORES.text, margin: '0 0 12px' }}>Continue estudando</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MATERIAIS_RECENTES.map(m => (<button key={m.label} onClick={() => navegar('materials')} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: "'Nunito', sans-serif" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, color: CORES.text, fontSize: '12px', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.label}</p>
                  <BarraProgresso value={m.progresso} color={m.color} height={5}/>
                </div>
                <span style={{ fontSize: '11px', color: m.color, fontWeight: 700, flexShrink: 0 }}>{m.progresso}%</span>
              </button>))}
          </div>
        </div>

        <div className="anim-fadeup anim-delay-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button onClick={() => navegar('study-plan')} style={{ padding: 14, borderRadius: 16, border: 'none', background: '#fff', boxShadow: '0 4px 14px rgba(108,58,255,.08)', textAlign: 'left', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>📅 <b style={{ color: CORES.text }}>Plano de hoje</b><small style={{ display: 'block', color: CORES.muted, marginTop: 3 }}>35 minimo</small></button>
          <button onClick={() => navegar('daily-challenge')} style={{ padding: 14, borderRadius: 16, border: 'none', background: '#FFF8E1', boxShadow: '0 4px 14px rgba(108,58,255,.06)', textAlign: 'left', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>⚡ <b style={{ color: CORES.text }}>Desafio</b><small style={{ display: 'block', color: '#9A6B00', marginTop: 3 }}>+50 XP</small></button>
          <button onClick={() => navegar('focus')} style={{ padding: 14, borderRadius: 16, border: 'none', background: '#EFFFFB', boxShadow: '0 4px 14px rgba(0,201,167,.06)', textAlign: 'left', cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>🎯 <b style={{ color: CORES.text }}>Modo foco</b><small style={{ display: 'block', color: CORES.muted, marginTop: 3 }}>25 minimo</small></button>
        </div>

        {/* Stats */}
        <div className="anim-fadeup anim-delay-4" style={{ display: 'flex', gap: '10px' }}>
          <IndicadorEstatistica icon="✅" value="124" label="Exercícios" color={CORES.teal}/>
          <IndicadorEstatistica icon="🎯" value="78%" label="Acertos" color={CORES.orange}/>
          <IndicadorEstatistica icon="⭐" value="1.240" label="Pontos" color={CORES.yellow}/>
        </div>

        <button className="anim-fadeup anim-delay-4" onClick={() => navegar('exercise')} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.teal}, #00A88F)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(0,201,167,0.3)` }}>
          ▶ Continuar estudando
        </button>

        {/* Achievements */}
        <div className="anim-fadeup anim-delay-4" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, fontSize: '13px', color: CORES.text, margin: '0 0 12px' }}>Conquistas recentes</p>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {CONQUISTAS.filter(a => a.earned).map(a => (<div key={a.label} style={{ flexShrink: 0, textAlign: 'center', width: 56 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FFF8E1', border: '2px solid #FFD166', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', margin: '0 auto 4px' }}>{a.icon}</div>
                <p style={{ fontSize: '9px', color: CORES.muted, margin: 0, lineHeight: 1.2 }}>{a.label}</p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
function TelaEsqueciSenha({ navegar }) {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('email');
    const [code, setCode] = useState('');
    const [novaSenha, definirNovaSenha] = useState('');
    const [confirmarSenha, definirConfirmarSenha] = useState('');
    const enviarCodigo = () => {
        if (email.trim()) {
            setStep('code');
        }
    };
    const verificarCodigo = () => {
        if (code.trim()) {
            setStep('newpass');
        }
    };
    const redefinirSenha = () => {
        if (novaSenha === confirmarSenha && novaSenha.length >= 6) {
            navegar('login');
        }
    };
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '80px 28px 28px', overflowY: 'auto' }}>
      <button onClick={() => navegar('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: CORES.violet, fontSize: '13px', fontWeight: 700, padding: 0, textAlign: 'left', marginBottom: '16px', fontFamily: "'Nunito', sans-serif" }}>← Voltar</button>
      
      <div className="anim-fadeup" style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 900, color: CORES.text, margin: 0 }}>Recuperar senha</h2>
        <p style={{ color: CORES.muted, fontSize: '14px', marginTop: '4px' }}>
          {step === 'email' && 'Digite seu e-mail para receber um código de confirmação'}
          {step === 'code' && 'Insira o código que enviamos para seu e-mail'}
          {step === 'newpass' && 'Crie uma nova senha segura'}
        </p>
      </div>

      {/* Step 1: Email */}
      {step === 'email' && (<div className="anim-fadeup anim-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>E-mail</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" type="email" style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${email ? CORES.violet : '#DDD8F0'}`, outline: 'none', fontSize: '15px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box' }}/>
          </div>
          <p style={{ fontSize: '11px', color: CORES.muted, lineHeight: 1.6, margin: '8px 0 0' }}>Você receberá um código de 6 dígitos no seu e-mail cadastrado para confirmar sua identidade.</p>
          <button onClick={enviarCodigo} disabled={!email.trim()} style={{ marginTop: '12px', padding: '15px', borderRadius: 14, background: email.trim() ? `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)` : '#DDD8F0', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: email.trim() ? 'pointer' : 'not-allowed', fontFamily: "'Nunito', sans-serif", boxShadow: email.trim() ? `0 6px 20px rgba(108,58,255,0.35)` : 'none' }}>
            Enviar código
          </button>
        </div>)}

      {/* Step 2: Code verification */}
      {step === 'code' && (<div className="anim-fadeup anim-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#F5F3FF', borderRadius: 14, padding: '14px', textAlign: 'center', marginBottom: '8px' }}>
            <p style={{ fontSize: '12px', color: CORES.muted, margin: '0 0 4px' }}>Código enviado para</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: CORES.text, margin: 0 }}>{email}</p>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Código de verificação</label>
            <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" maxLength={6} type="text" style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${code ? CORES.violet : '#DDD8F0'}`, outline: 'none', fontSize: '18px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box', letterSpacing: '8px', textAlign: 'center', fontWeight: 700 }}/>
          </div>
          <p style={{ fontSize: '11px', color: CORES.muted, lineHeight: 1.6, margin: '8px 0 0' }}>O código expira em 10 minutos. Se não recebeu, <button onClick={() => setStep('email')} style={{ background: 'none', border: 'none', color: CORES.violet, fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '11px' }}>tente novamente</button>.</p>
          <button onClick={verificarCodigo} disabled={code.length !== 6} style={{ marginTop: '12px', padding: '15px', borderRadius: 14, background: code.length === 6 ? `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)` : '#DDD8F0', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: code.length === 6 ? 'pointer' : 'not-allowed', fontFamily: "'Nunito', sans-serif", boxShadow: code.length === 6 ? `0 6px 20px rgba(108,58,255,0.35)` : 'none' }}>
            Verificar código
          </button>
        </div>)}

      {/* Step 3: New password */}
      {step === 'newpass' && (<div className="anim-fadeup anim-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nova senha</label>
            <input value={novaSenha} onChange={e => definirNovaSenha(e.target.value)} placeholder="••••••••" type="password" style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${novaSenha ? CORES.violet : '#DDD8F0'}`, outline: 'none', fontSize: '15px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box' }}/>
            <p style={{ fontSize: '10px', color: CORES.muted, margin: '6px 0 0' }}>Mínimo 6 caracteres</p>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Confirmar senha</label>
            <input value={confirmarSenha} onChange={e => definirConfirmarSenha(e.target.value)} placeholder="••••••••" type="password" style={{ width: '100%', marginTop: '6px', padding: '13px 14px', borderRadius: 12, border: `1.5px solid ${confirmarSenha ? (novaSenha === confirmarSenha ? CORES.green : CORES.red) : '#DDD8F0'}`, outline: 'none', fontSize: '15px', fontFamily: "'Nunito', sans-serif", background: '#fff', color: CORES.text, boxSizing: 'border-box' }}/>
            {confirmarSenha && (<p style={{ fontSize: '10px', color: novaSenha === confirmarSenha ? CORES.green : CORES.red, margin: '6px 0 0', fontWeight: 700 }}>
                {novaSenha === confirmarSenha ? '✓ Senhas correspondem' : '✗ Senhas não correspondem'}
              </p>)}
          </div>
          <button onClick={redefinirSenha} disabled={novaSenha.length < 6 || novaSenha !== confirmarSenha} style={{ marginTop: '12px', padding: '15px', borderRadius: 14, background: (novaSenha.length >= 6 && novaSenha === confirmarSenha) ? `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)` : '#DDD8F0', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: (novaSenha.length >= 6 && novaSenha === confirmarSenha) ? 'pointer' : 'not-allowed', fontFamily: "'Nunito', sans-serif", boxShadow: (novaSenha.length >= 6 && novaSenha === confirmarSenha) ? `0 6px 20px rgba(108,58,255,0.35)` : 'none' }}>
            Redefinir senha
          </button>
        </div>)}
    </div>);
}
function TelaMaterias({ navegar, definirMateriaSelecionada }) {
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ padding: '60px 24px 16px', background: '#fff', borderBottom: '1px solid #EDE9FF' }}>
        <h2 className="anim-fadeup" style={{ fontSize: '24px', fontWeight: 900, color: CORES.text, margin: 0 }}>Matérias</h2>
        <p className="anim-fadeup anim-delay-1" style={{ color: CORES.muted, fontSize: '13px', margin: '4px 0 0' }}>Escolha um tópico para estudar</p>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {MATERIAS.map((s, si) => (<div key={s.id} className={`anim-fadeup anim-delay-${si + 1}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '20px' }}>{s.icon}</span>
              <h3 style={{ fontWeight: 800, fontSize: '16px', color: s.color, margin: 0 }}>{s.label}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {s.topicos.map((topic, ti) => (<button key={topic} onClick={() => { definirMateriaSelecionada(s.id); navegar('content'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: '#fff', border: `1.5px solid ${ti === 0 ? s.color : '#EDE9FF'}`, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = s.bg; }} onMouseLeave={e => { e.currentTarget.style.borderColor = ti === 0 ? s.color : '#EDE9FF'; e.currentTarget.style.background = '#fff'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: ti < 2 ? s.color : '#DDD8F0' }}/>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: CORES.text }}>{topic}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {ti < 2 && <span style={{ fontSize: '10px', background: s.bg, color: s.color, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>Disponível</span>}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CORES.muted} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </button>))}
            </div>
          </div>))}
      </div>
    </div>);
}
function TelaConteudo({ navegar, materiaSelecionada }) {
    const portuguesSelecionado = materiaSelecionada === 'portugues';
    const subject = portuguesSelecionado ? MATERIAS[0] : MATERIAS[1];
    const blocks = portuguesSelecionado
        ? [
            { icone: '📖', titulo: 'Leitura', texto: 'A leitura é a base da interpretação. Ler com atenção ajuda a entender o texto.' },
            { icone: '✏️', titulo: 'Gramática', texto: 'Gramática estuda as regras da língua. Ex: classes de palavras, conjugação verbal.' },
            { icone: '📝', titulo: 'Interpretação', texto: 'Interpretar é entender o significado e a mensagem do texto. Ex: tema central, intenção do autor.' },
        ]
        : [
            { icone: '➕', titulo: 'Adição', texto: 'A adição é a operação de juntar duas ou mais quantidades. Ex: 15 + 7 = 22' },
            { icone: '✖️', titulo: 'Multiplicação', texto: 'Multiplicação é uma forma rápida de somar quantidades iguais. Ex: 4 × 3 = 12' },
            { icone: '➗', titulo: 'Divisão', texto: 'Divisão é distribuir uma quantidade em partes iguais. Ex: 20 ÷ 4 = 5' },
        ];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}CC)`, padding: '60px 24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 30, right: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}/>
        <BotaoVoltar navegar={navegar} dest="subjects"/>
        <span style={{ background: CORES.yellow, color: CORES.text, borderRadius: 99, padding: '3px 10px', fontSize: '11px', fontWeight: 800 }}>{subject.label}</span>
        <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, margin: '8px 0 4px' }}>
          {portuguesSelecionado ? 'Interpretação de Texto' : 'Operações Básicas'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', margin: 0 }}>
          {portuguesSelecionado
            ? 'Aprenda a interpretar e compreender textos de diferentes gêneros.'
            : 'Aprenda a resolver operações de adição, subtração, multiplicação e divisão.'}
        </p>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="anim-fadeup" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)', border: `1.5px solid ${subject.color}20` }}>
          <p style={{ fontWeight: 800, color: subject.color, fontSize: '13px', margin: '0 0 10px' }}>💡 Quer aprender antes de praticar?</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[{ icon: '📖', label: 'Ler material', dest: 'mat-books' }, { icon: '🎥', label: 'Videoaula', dest: 'mat-videos' }, { icon: '📄', label: 'Apostila', dest: 'mat-apostilas' }].map(item => (<button key={item.label} onClick={() => navegar(item.dest)} style={{ flex: 1, minWidth: 80, padding: '8px 6px', borderRadius: 10, background: subject.bg, border: `1.5px solid ${subject.color}30`, color: subject.color, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span>{item.icon}</span> {item.label}
              </button>))}
          </div>
        </div>

        {blocks.map((block, i) => (<div key={block.titulo} className={`anim-fadeup anim-delay-${i + 1}`} style={{ background: '#fff', borderRadius: 16, padding: '16px', display: 'flex', gap: '12px', boxShadow: '0 2px 12px rgba(108,58,255,0.08)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: subject.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{block.icone}</div>
            <div>
              <p style={{ fontWeight: 800, color: CORES.text, margin: '0 0 4px', fontSize: '14px' }}>{block.titulo}</p>
              <p style={{ color: CORES.muted, margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{block.texto}</p>
            </div>
          </div>))}

        <div className="anim-fadeup anim-delay-4" style={{ background: subject.bg, borderRadius: 16, padding: '16px', border: `1.5px solid ${subject.color}20` }}>
          <p style={{ fontWeight: 800, color: subject.color, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>Exemplo</p>
          <p style={{ color: CORES.text, fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>
            {portuguesSelecionado
            ? '"A leitura é o caminho para o conhecimento."'
            : 'Se você tem 5 caixas com 6 lápis cada, quantos lápis tem no total?'}
          </p>
          <p style={{ color: subject.color, fontSize: '20px', fontWeight: 900, margin: '8px 0 0' }}>
            {portuguesSelecionado
            ? 'Texto declarativo com mensagem inspiradora'
            : '5 × 6 = 30 lápis'}
          </p>
        </div>

        <button className="anim-fadeup anim-delay-4" onClick={() => navegar('exercise')} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${subject.color}, ${subject.color}BB)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px ${subject.color}40` }}>
          Começar exercícios 🚀
        </button>
      </div>
    </div>);
}
function TelaExercicio({ navegar, qIndex, materiaSelecionada, quantidadeQuiz }) {
    const [selected, setSelected] = useState(null);
    const questoesFiltradas = QUESTOES.slice(materiaSelecionada === 'matematica' ? 0 : 10, materiaSelecionada === 'matematica' ? 10 : 20);
    const q = questoesFiltradas.length ? questoesFiltradas[qIndex % questoesFiltradas.length] : QUESTOES[0];
  const total = quantidadeQuiz;
    const progresso = (qIndex / total) * 100;
    const rotuloMateria = materiaSelecionada === 'matematica' ? '🔢 Matemática' : '📚 Português';
    function answer(idx) {
        if (selected !== null)
            return;
        setSelected(idx);
        setTimeout(() => {
            const correct = idx === q.resposta;
            navegar(correct ? 'correct' : 'wrong');
            setSelected(null);
        }, 700);
    }
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '56px 24px 16px', background: '#fff', borderBottom: '1px solid #EDE9FF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <button onClick={() => navegar('home')} style={{ background: 'rgba(108,58,255,0.1)', border: 'none', color: CORES.violet, borderRadius: 8, padding: '6px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
            ← Sair
          </button>
          <span style={{ fontSize: '13px', fontWeight: 700, color: CORES.muted }}>Questão {qIndex + 1} de {total}</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: CORES.violet }}>{rotuloMateria}</span>
        </div>
        <BarraProgresso value={progresso} color={CORES.violet} height={8}/>
      </div>
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="anim-fadeup" style={{ background: '#fff', borderRadius: 20, padding: '22px', boxShadow: '0 4px 20px rgba(108,58,255,0.10)', textAlign: 'center' }}>
          <p style={{ fontSize: '24px', fontWeight: 900, color: CORES.text, margin: 0, lineHeight: 1.3 }}>{q.q}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.opcao.map((opt, i) => {
            const letter = ['A', 'B', 'C', 'D'][i];
            const isSelected = selected === i;
            const isCorrect = selected !== null && i === q.resposta;
            const isWrong = isSelected && i !== q.resposta;
            let bg = '#fff', border = '#EDE9FF', textColor = CORES.text;
            if (isCorrect) {
                bg = '#F0FDF4';
                border = CORES.green;
                textColor = CORES.green;
            }
            else if (isWrong) {
                bg = '#FEF2F2';
                border = CORES.red;
                textColor = CORES.red;
            }
            else if (isSelected) {
                bg = '#F0EBFF';
                border = CORES.violet;
            }
            return (<button key={i} onClick={() => answer(i)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: 14, background: bg, border: `2px solid ${border}`, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s', textAlign: 'left' }} onMouseEnter={e => { if (selected === null) {
                e.currentTarget.style.background = '#F0EBFF';
                e.currentTarget.style.borderColor = CORES.violet;
            } }} onMouseLeave={e => { if (selected === null) {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.borderColor = '#EDE9FF';
            } }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: isCorrect ? CORES.green : isWrong ? CORES.red : CORES.violet, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: '14px' }}>{isCorrect ? '✓' : isWrong ? '✗' : letter}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: '16px', color: textColor }}>{opt}</span>
              </button>);
        })}
        </div>
      </div>
    </div>);
}
function TelaRespostaCorreta({ navegar, qIndex, setQIndex, materiaSelecionada, quantidadeQuiz }) {
  const questions = QUESTOES.slice(materiaSelecionada === 'matematica' ? 0 : 10);
  const q = questions[qIndex % questions.length];
  const isLast = qIndex >= quantidadeQuiz - 1;
    function next() {
        if (isLast) {
            setQIndex(0);
            navegar('result');
        }
        else {
            setQIndex(qIndex + 1);
            navegar('exercise');
        }
    }
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', background: `linear-gradient(160deg, #F0FDF4 0%, #DCFCE7 100%)` }}>
      <div className="anim-popin" style={{ fontSize: '80px', marginBottom: '12px' }}>🎉</div>
      <h2 className="anim-fadeup" style={{ fontSize: '28px', fontWeight: 900, color: CORES.green, margin: '0 0 6px', textAlign: 'center' }}>Muito bem!</h2>
      <p className="anim-fadeup anim-delay-1" style={{ fontSize: '16px', fontWeight: 600, color: CORES.text, margin: '0 0 20px', textAlign: 'center' }}>Resposta correta! 🎯</p>
      <div className="anim-fadeup anim-delay-2" style={{ background: '#fff', borderRadius: 18, padding: '18px 20px', width: '100%', marginBottom: '24px', boxShadow: '0 4px 20px rgba(34,197,94,0.15)', border: '2px solid #BBF7D0' }}>
        <p style={{ fontWeight: 800, color: CORES.green, fontSize: '14px', margin: '0 0 6px' }}>💡 Explicação</p>
        <p style={{ color: CORES.text, fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
      </div>
      <div className="anim-fadeup anim-delay-3" style={{ background: '#fff', borderRadius: 12, padding: '10px 20px', marginBottom: '24px', border: '2px solid #BBF7D0' }}>
        <span style={{ fontWeight: 900, color: CORES.green, fontSize: '15px' }}>+10 pontos ⭐</span>
      </div>
      <button className="anim-fadeup anim-delay-3" onClick={next} style={{ width: '100%', padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.green}, #16A34A)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}>
        {isLast ? 'Ver resultado 🏆' : 'Próxima questão →'}
      </button>
    </div>);
}
function TelaRespostaIncorreta({ navegar, qIndex, setQIndex, materiaSelecionada, quantidadeQuiz }) {
  const questions = QUESTOES.slice(materiaSelecionada === 'matematica' ? 0 : 10);
  const q = questions[qIndex % questions.length];
  const isLast = qIndex >= quantidadeQuiz - 1;
  function next() {
    if (isLast) {
      setQIndex(0);
      navegar('result');
    }
    else {
      setQIndex(qIndex + 1);
      navegar('exercise');
    }
  }
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', background: `linear-gradient(160deg, #FEF2F2 0%, #FEE2E2 100%)` }}>
      <div className="anim-popin" style={{ fontSize: '80px', marginBottom: '12px' }}>💪</div>
      <h2 className="anim-fadeup" style={{ fontSize: '28px', fontWeight: 900, color: CORES.red, margin: '0 0 6px', textAlign: 'center' }}>Quase lá!</h2>
      <p className="anim-fadeup anim-delay-1" style={{ fontSize: '15px', fontWeight: 600, color: CORES.muted, margin: '0 0 20px', textAlign: 'center' }}>Essa não foi a resposta correta — mas você aprende tentando!</p>
      <div className="anim-fadeup anim-delay-2" style={{ background: '#fff', borderRadius: 18, padding: '18px 20px', width: '100%', marginBottom: '24px', boxShadow: '0 4px 20px rgba(239,68,68,0.10)', border: '2px solid #FCA5A5' }}>
        <p style={{ fontWeight: 800, color: CORES.red, fontSize: '14px', margin: '0 0 6px' }}>✅ Resposta correta</p>
        <p style={{ color: CORES.text, fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }} className="anim-fadeup anim-delay-3">
        <button onClick={() => { navegar('exercise'); }} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.3)` }}>Tentar novamente 🔄</button>
        <button onClick={next} style={{ padding: '14px', borderRadius: 14, background: 'transparent', color: CORES.muted, border: `2px solid #EDE9FF`, fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>{isLast ? 'Ver resultado 🏆' : 'Próxima questão →'}</button>
      </div>
    </div>);
}
function TelaResultado({ navegar, setQIndex, score }) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🌟' : '💪';
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', overflowY: 'auto' }}>
      <div className="anim-popin" style={{ fontSize: '72px', marginBottom: '8px' }}>{emoji}</div>
      <h2 className="anim-fadeup" style={{ fontSize: '26px', fontWeight: 900, color: CORES.text, margin: '0 0 4px', textAlign: 'center' }}>Exercícios concluídos!</h2>
      <p className="anim-fadeup anim-delay-1" style={{ color: CORES.muted, fontSize: '14px', margin: '0 0 24px', textAlign: 'center' }}>Você acertou {score.correct} de {score.total} questões.</p>
      <div className="anim-popin anim-delay-1" style={{ width: 120, height: 120, borderRadius: '50%', background: pct >= 80 ? '#F0FDF4' : pct >= 60 ? '#FFF8E1' : '#FEF2F2', border: `4px solid ${pct >= 80 ? CORES.green : pct >= 60 ? CORES.yellow : CORES.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px', fontWeight: 900, color: pct >= 80 ? CORES.green : pct >= 60 ? '#F59E0B' : CORES.red }}>{pct}%</span>
      </div>
      <div className="anim-fadeup anim-delay-2" style={{ display: 'flex', gap: '10px', width: '100%', marginBottom: '20px' }}>
        <IndicadorEstatistica icon="✅" value={score.correct} label="Acertos" color={CORES.green}/>
        <IndicadorEstatistica icon="❌" value={score.total - score.correct} label="Erros" color={CORES.red}/>
        <IndicadorEstatistica icon="⭐" value={score.correct * 10} label="Pontos" color={CORES.yellow}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }} className="anim-fadeup anim-delay-3">
        <button onClick={() => { setQIndex(0); navegar('exercise'); }} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.3)` }}>Tentar novamente 🔄</button>
        <button onClick={() => navegar('home')} style={{ padding: '14px', borderRadius: 14, background: 'transparent', color: CORES.violet, border: `2px solid ${CORES.violet}30`, fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>Voltar para o início</button>
      </div>
    </div>);
}
function TelaDesempenho({ navegar }) {
    const subjects = [{ ...MATERIAS[0], exercises: 68, pct: 72 }, { ...MATERIAS[1], exercises: 56, pct: 64 }];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ padding: '60px 24px 16px', background: '#fff', borderBottom: '1px solid #EDE9FF' }}>
        <h2 className="anim-fadeup" style={{ fontSize: '24px', fontWeight: 900, color: CORES.text, margin: 0 }}>Desempenho</h2>
        <p className="anim-fadeup anim-delay-1" style={{ color: CORES.muted, fontSize: '13px', margin: '4px 0 0' }}>Acompanhe sua evolução</p>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="anim-fadeup" style={{ display: 'flex', gap: '10px' }}>
          <IndicadorEstatistica icon="🏅" value="Nível 5" label="Atual" color={CORES.violet}/>
          <IndicadorEstatistica icon="⭐" value="1.240" label="Pontos" color={CORES.yellow}/>
          <IndicadorEstatistica icon="✅" value="124" label="Concluídos" color={CORES.teal}/>
        </div>
        {subjects.map((s, i) => (<div key={s.id} className={`anim-fadeup anim-delay-${i + 1}`} style={{ background: '#fff', borderRadius: 18, padding: '18px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{s.icon}</div>
              <div>
                <p style={{ fontWeight: 800, color: CORES.text, margin: 0, fontSize: '14px' }}>{s.label}</p>
                <p style={{ color: CORES.muted, margin: 0, fontSize: '11px' }}>{s.exercises} exercícios realizados</p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <span style={{ fontWeight: 900, fontSize: '20px', color: s.color }}>{s.pct}%</span>
                <p style={{ color: CORES.muted, margin: 0, fontSize: '10px' }}>acertos</p>
              </div>
            </div>
            <BarraProgresso value={s.pct} color={s.color} height={10}/>
            <div style={{ marginTop: '14px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: CORES.muted, margin: '0 0 8px' }}>Esta semana</p>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: 40 }}>
                {[60, 80, 45, 90, 70, 55, 85].map((h, di) => (<div key={di} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '100%', height: `${h * 0.4}px`, background: s.color, borderRadius: '4px 4px 0 0', opacity: di === 6 ? 1 : 0.4 }}/>
                    <span style={{ fontSize: '9px', color: CORES.muted }}>{'SMTQSSD'[di]}</span>
                  </div>))}
              </div>
            </div>
          </div>))}
        <div className="anim-fadeup anim-delay-3" style={{ background: '#fff', borderRadius: 18, padding: '18px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, fontSize: '14px', color: CORES.text, margin: '0 0 14px' }}>Conquistas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONQUISTAS.map(a => (<div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: a.earned ? '#FFF8E1' : '#F5F3FF', border: `2px solid ${a.earned ? '#FFD166' : '#EDE9FF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', opacity: a.earned ? 1 : 0.4, flexShrink: 0 }}>{a.icon}</div>
                <span style={{ fontWeight: a.earned ? 700 : 500, color: a.earned ? CORES.text : CORES.muted, fontSize: '13px' }}>{a.label}</span>
                {a.earned && <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#F0FDF4', color: CORES.green, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>✓</span>}
              </div>))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button onClick={() => navegar('ranking')} style={{ padding: 13, border: 0, borderRadius: 14, background: '#FFF8E1', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}>🏆 Ranking</button>
          <button onClick={() => navegar('streak')} style={{ padding: 13, border: 0, borderRadius: 14, background: '#FFF0EA', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}>🔥 Sequência</button>
        </div>
      </div>
    </div>);
}
function TelaPerfil({ navegar, profile }) {
    const itens = [
        { icon: '✏️', label: 'Editar perfil', dest: 'edit-profile' },
        { icon: '🔔', label: 'Notificações', dest: 'notifications' },
        { icon: '❤️', label: 'Meus favoritos', dest: 'favorites' },
        { icon: '📅', label: 'Histórico de estudos', dest: 'history' },
        { icon: '🏆', label: 'Ranking semanal', dest: 'ranking' },
        { icon: '⚙️', label: 'Configurações', dest: 'settings' },
    ];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(145deg, ${CORES.violet} 0%, #9B5DE5 100%)`, padding: '60px 24px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 20, right: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        <div className="anim-popin" style={{ width: 76, height: 76, borderRadius: '50%', background: CORES.yellow, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px', border: '3px solid rgba(255,255,255,0.3)' }}>{profile.avatar}</div>
        <h2 className="anim-fadeup" style={{ color: '#fff', fontSize: '20px', fontWeight: 900, margin: '0 0 2px' }}>{profile.name}</h2>
        <p className="anim-fadeup anim-delay-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '0 0 16px' }}>{profile.email}</p>
        <div className="anim-fadeup anim-delay-2" style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {[['🏅', 'Nível 5'], ['⭐', '1.240 pts'], ['🔥', '7 dias']].map(([ic, l]) => (<div key={l} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 12px', textAlign: 'center' }}>
              <p style={{ color: '#fff', fontSize: '12px', margin: 0, fontWeight: 700 }}>{ic} {l}</p>
            </div>))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="anim-fadeup" style={{ display: 'flex', gap: '10px' }}>
          <IndicadorEstatistica icon="📚" value="124" label="Exercícios" color={CORES.violet}/>
          <IndicadorEstatistica icon="🎯" value="78%" label="Acertos" color={CORES.orange}/>
          <IndicadorEstatistica icon="🏆" value="3" label="Medalhas" color={CORES.yellow}/>
        </div>
        <div className="anim-fadeup anim-delay-1" style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          {itens.map((item, i) => (<button key={item.label} onClick={() => navegar(item.dest)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 18px', border: 'none', borderBottom: i < itens.length - 1 ? '1px solid #F5F3FF' : 'none', background: 'transparent', cursor: 'pointer', fontFamily: "'Nunito', sans-serif", transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#F5F3FF'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '14px', color: CORES.text }}>{item.label}</span>
              <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CORES.muted} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>))}
        </div>
        <button className="anim-fadeup anim-delay-2" onClick={() => navegar('login')} style={{ padding: '15px', borderRadius: 14, background: '#FEF2F2', color: CORES.red, border: `2px solid #FCA5A5`, fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>🚪 Sair</button>
      </div>
    </div>);
}
function TelaEdicaoPerfil({ navegar, profile, onSave }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [school, setSchool] = useState(profile.school);
  const [year, setYear] = useState(profile.year);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);
    const avatares = ['🧑', '👨', '👨‍🎓', '🧑‍💼', '👦', '👨‍🚀', '🧔', '👴'];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(145deg, ${CORES.violet} 0%, #9B5DE5 100%)`, padding: '60px 24px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 20, left: 20 }}>
          <button onClick={() => navegar('profile')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '6px 12px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
            ← Voltar
          </button>
        </div>
        <h2 className="anim-fadeup" style={{ color: '#fff', fontSize: '22px', fontWeight: 900, margin: 0 }}>Editar perfil</h2>
        <p className="anim-fadeup anim-delay-1" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', margin: '4px 0 0' }}>Personalize suas informações</p>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Avatar selector */}
        <div className="anim-fadeup" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, color: CORES.text, fontSize: '13px', margin: '0 0 12px' }}>Escolha seu avatar</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {avatares.map(av => (<button key={av} onClick={() => setAvatar(av)} style={{ width: '100%', aspectRatio: '1', borderRadius: 14, border: `3px solid ${avatar === av ? CORES.violet : '#EDE9FF'}`, background: avatar === av ? 'rgba(108,58,255,0.1)' : '#fff', fontSize: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                {av}
              </button>))}
          </div>
        </div>

        {/* Name field */}
        <div className="anim-fadeup anim-delay-1" style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(108,58,255,0.06)' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nome completo</label>
          <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: 12, border: `1.5px solid ${CORES.violet}20`, outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif", color: CORES.text, boxSizing: 'border-box' }}/>
        </div>

        {/* Email field */}
        <div className="anim-fadeup anim-delay-2" style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(108,58,255,0.06)' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>E-mail</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: 12, border: `1.5px solid ${CORES.violet}20`, outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif", color: CORES.text, boxSizing: 'border-box' }}/>
        </div>

        {/* School field */}
        <div className="anim-fadeup anim-delay-3" style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(108,58,255,0.06)' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Escola</label>
          <input value={school} onChange={e => setSchool(e.target.value)} style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: 12, border: `1.5px solid ${CORES.violet}20`, outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif", color: CORES.text, boxSizing: 'border-box' }}/>
        </div>

        {/* Year field */}
        <div className="anim-fadeup anim-delay-4" style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(108,58,255,0.06)' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ano letivo</label>
          <select value={year} onChange={e => setYear(e.target.value)} style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: 12, border: `1.5px solid ${CORES.violet}20`, outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif", color: CORES.text, boxSizing: 'border-box', background: '#fff', cursor: 'pointer' }}>
            <option>6º ano</option>
            <option>7º ano</option>
            <option>8º ano</option>
            <option>9º ano</option>
            <option>1º EM</option>
            <option>2º EM</option>
            <option>3º EM</option>
          </select>
        </div>

        
        <div className="anim-fadeup anim-delay-5" style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(108,58,255,0.06)' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: CORES.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bio (opcional)</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Conte um pouco sobre você..." style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: 12, border: `1.5px solid ${CORES.violet}20`, outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif", color: CORES.text, boxSizing: 'border-box', minHeight: '80px', resize: 'none' }}/>
          <p style={{ fontSize: '11px', color: CORES.muted, margin: '6px 0 0', textAlign: 'right' }}>{bio.length}/150</p>
        </div>

        <button className="anim-fadeup anim-delay-5" onClick={() => { onSave({ name, email, school, year, bio, avatar }); navegar('profile'); }} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.35)`, marginTop: '8px' }}>
          💾 Salvar alterações
        </button>

       
        <button className="anim-fadeup anim-delay-5" onClick={() => { if (window.confirm('Excluir sua conta e os dados salvos neste navegador?')) { localStorage.removeItem('educamais-profile'); localStorage.removeItem('educamais-dark'); localStorage.removeItem('educamais-sound'); navegar('login'); } }} style={{ padding: '14px', borderRadius: 14, background: 'transparent', color: CORES.red, border: `2px solid #FCA5A5`, fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
          🗑️ Deletar conta
        </button>
      </div>
    </div>);
}
function TelaCentralMateriais({ navegar }) {
    const [busca, definirBusca] = useState('');
    const [filtroMateria, definirFiltroMateria] = useState('Todos');
    const [filtroTipo, definirFiltroTipo] = useState('Todos');
    const [filtroNivel, definirFiltroNivel] = useState('Todos');
    const todosItens = [
        ...LIVROS.map(b => ({ ...b, type: 'Livro', dest: 'mat-books' })),
        ...VIDEOAULAS.map(v => ({ id: v.id + 100, title: v.title, subject: v.subject, nivel: 'Básico', type: 'Videoaula', dest: 'mat-videos', color: CORES.violet, bg: '#F0EBFF', emoji: '🎥' })),
        ...APOSTILAS.map(a => ({ ...a, nivel: 'Básico', type: 'Apostila', dest: 'mat-apostilas' })),
    ];
    const filtrados = todosItens.filter(item => {
        const matchQ = busca === '' || item.title.toLowerCase().includes(busca.toLowerCase()) || item.subject.toLowerCase().includes(busca.toLowerCase());
        const matchS = filtroMateria === 'Todos' || item.subject === filtroMateria;
        const matchT = filtroTipo === 'Todos' || item.type === filtroTipo;
        const matchL = filtroNivel === 'Todos' || item.nivel === filtroNivel;
        return matchQ && matchS && matchT && matchL;
    });
    const iconeTipo = { Livro: '📕', Videoaula: '🎥', Apostila: '📄' };
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
  
      <div style={{ background: `linear-gradient(145deg, #1a1060, ${CORES.violet})`, padding: '60px 24px 20px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 20, right: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
        <div style={{ position: 'absolute', bottom: -10, left: 20, width: 50, height: 50, background: CORES.yellow, borderRadius: '50%', opacity: 0.15 }}/>
        <h2 className="anim-fadeup" style={{ color: '#fff', fontSize: '22px', fontWeight: 900, margin: 0 }}>🎒 Materiais de Estudo</h2>
        <p className="anim-fadeup anim-delay-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: '4px 0 16px' }}>Aprenda de diferentes formas.</p>

        <div className="anim-fadeup anim-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: 12, padding: '10px 14px' }}>
          <span style={{ fontSize: '16px' }}>🔎</span>
          <input value={busca} onChange={e => definirBusca(e.target.value)} placeholder="O que você quer aprender?" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Nunito', sans-serif", color: CORES.text }}/>
          {busca && <button onClick={() => definirBusca('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: CORES.muted, fontSize: '16px', padding: 0 }}>×</button>}
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {!busca && (<div className="anim-fadeup">
            <p style={{ fontWeight: 800, fontSize: '13px', color: CORES.text, margin: '0 0 10px' }}>Acessar por tipo</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { icon: '📕', label: 'Livros', count: LIVROS.length, color: '#FF6B35', bg: '#FFF0EA', dest: 'mat-books' },
                { icon: '🎥', label: 'Videoaulas', count: VIDEOAULAS.length, color: CORES.violet, bg: '#F0EBFF', dest: 'mat-videos' },
                { icon: '📄', label: 'Apostilas', count: APOSTILAS.length, color: CORES.teal, bg: '#E6FBF7', dest: 'mat-apostilas' },
                { icon: '📝', label: 'Resumos', count: 8, color: '#F59E0B', bg: '#FFFBEB', dest: 'materials' },
            ].map(card => (<button key={card.label} onClick={() => navegar(card.dest)} style={{ padding: '16px 14px', borderRadius: 16, background: card.bg, border: `1.5px solid ${card.color}20`, cursor: 'pointer', textAlign: 'left', fontFamily: "'Nunito', sans-serif", transition: 'transform 0.15s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <div style={{ fontSize: '26px', marginBottom: '6px' }}>{card.icon}</div>
                  <p style={{ fontWeight: 800, color: card.color, fontSize: '13px', margin: '0 0 2px' }}>{card.label}</p>
                  <p style={{ color: CORES.muted, fontSize: '11px', margin: 0 }}>{card.count} disponíveis</p>
                </button>))}
            </div>
          </div>)}

   
        <div className="anim-fadeup anim-delay-1">
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['Todos', 'Português', 'Matemática'].map(f => (<button key={f} onClick={() => definirFiltroMateria(f)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 99, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", border: `1.5px solid ${filtroMateria === f ? CORES.violet : '#DDD8F0'}`, background: filtroMateria === f ? CORES.violet : '#fff', color: filtroMateria === f ? '#fff' : CORES.muted, transition: 'all 0.15s' }}>
                {f}
              </button>))}
            {['Livro', 'Videoaula', 'Apostila'].map(f => (<button key={f} onClick={() => definirFiltroTipo(filtroTipo === f ? 'Todos' : f)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 99, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", border: `1.5px solid ${filtroTipo === f ? CORES.orange : '#DDD8F0'}`, background: filtroTipo === f ? CORES.orange : '#fff', color: filtroTipo === f ? '#fff' : CORES.muted, transition: 'all 0.15s' }}>
                {iconeTipo[f]} {f}
              </button>))}
            <select value={filtroNivel} onChange={e => definirFiltroNivel(e.target.value)} aria-label="Filtrar por nível" style={{ flexShrink: 0, padding: '5px 8px', borderRadius: 99, border: '1.5px solid #DDD8F0', color: CORES.muted, background: '#fff', fontSize: '11px', fontFamily: "'Nunito', sans-serif" }}>
              {['Todos', 'Básico', 'Intermediário', 'Avançado'].map(nivel => <option key={nivel} value={nivel}>{nivel}</option>)}
            </select>
          </div>
        </div>

     
        {!busca && (<div className="anim-fadeup anim-delay-2" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
            <p style={{ fontWeight: 800, fontSize: '13px', color: CORES.text, margin: '0 0 12px' }}>Continue de onde parou</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MATERIAIS_RECENTES.map(m => (<div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{m.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: CORES.text, fontSize: '12px', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.label}</p>
                    <BarraProgresso value={m.progresso} color={m.color} height={5}/>
                  </div>
                  <button onClick={() => navegar(m.dest)} style={{ flexShrink: 0, padding: '5px 10px', borderRadius: 8, background: `${m.color}15`, border: 'none', color: m.color, fontSize: '10px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
                    Continuar
                  </button>
                </div>))}
            </div>
          </div>)}

      
        {busca && (<div className="anim-fadeup">
            <p style={{ fontWeight: 700, fontSize: '13px', color: CORES.muted, margin: '0 0 10px' }}>{filtrados.length} resultado{filtrados.length !== 1 ? 's' : ''} para "{busca}"</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filtrados.length === 0 ? (<div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <p style={{ fontSize: '32px' }}>🔍</p>
                  <p style={{ color: CORES.muted, fontSize: '14px' }}>Nenhum material encontrado.</p>
                </div>) : filtrados.map(item => (<button key={`${item.type}-${item.id}`} onClick={() => navegar(item.dest)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: 14, background: '#fff', border: `1.5px solid ${item.color}20`, cursor: 'pointer', textAlign: 'left', fontFamily: "'Nunito', sans-serif", boxShadow: '0 2px 8px rgba(108,58,255,0.06)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: CORES.text, fontSize: '13px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '3px' }}>
                      <span style={{ fontSize: '10px', background: item.bg, color: item.color, padding: '1px 6px', borderRadius: 99, fontWeight: 700 }}>{item.type}</span>
                      <span style={{ fontSize: '10px', color: CORES.muted }}>{item.subject}</span>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CORES.muted} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>))}
            </div>
          </div>)}
      </div>
    </div>);
}
function TelaLivros({ navegar, definirLivroSelecionado }) {
    const [filtro, definirFiltro] = useState('Todos');
    const filtrados = LIVROS.filter(b => filtro === 'Todos' || b.subject === filtro);
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, #FF6B35, #FF8C5A)`, padding: '60px 24px 20px' }}>
        <BotaoVoltar navegar={navegar} dest="materials"/>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 900, margin: 0 }}>📕 Livros</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', margin: '4px 0 0' }}>Livros digitais para estudar</p>
      </div>
      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Todos', 'Português', 'Matemática'].map(f => (<button key={f} onClick={() => definirFiltro(f)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 99, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", border: `1.5px solid ${filtro === f ? '#FF6B35' : '#DDD8F0'}`, background: filtro === f ? '#FF6B35' : '#fff', color: filtro === f ? '#fff' : CORES.muted }}>
              {f}
            </button>))}
        </div>
        {filtrados.map((book, i) => (<button key={book.id} className={`anim-fadeup anim-delay-${i}`} onClick={() => { definirLivroSelecionado(book); navegar('mat-book-detail'); }} style={{ display: 'flex', gap: '14px', padding: '16px', borderRadius: 18, background: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 16px rgba(255,107,53,0.10)', fontFamily: "'Nunito', sans-serif", transition: 'transform 0.15s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ width: 60, height: 80, borderRadius: 10, background: book.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0, border: `2px solid ${book.color}25` }}>{book.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', background: book.bg, color: book.color, padding: '2px 7px', borderRadius: 99, fontWeight: 700 }}>{book.subject}</span>
                <span style={{ fontSize: '10px', background: '#F5F3FF', color: CORES.muted, padding: '2px 7px', borderRadius: 99, fontWeight: 600 }}>{book.nivel}</span>
              </div>
              <p style={{ fontWeight: 800, color: CORES.text, fontSize: '14px', margin: '0 0 2px' }}>{book.title}</p>
              <p style={{ color: CORES.muted, fontSize: '12px', margin: '0 0 8px' }}>{book.author}</p>
              <p style={{ color: CORES.muted, fontSize: '11px', margin: '0 0 8px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: CORES.muted }}>{book.pages} páginas</span>
                <span style={{ fontSize: '11px', background: book.bg, color: book.color, padding: '3px 10px', borderRadius: 99, fontWeight: 700 }}>Ler →</span>
              </div>
            </div>
          </button>))}
      </div>
    </div>);
}
function TelaDetalheLivro({ navegar, book }) {
    const b = book ?? LIVROS[0];
    const [favorito, definirFavorito] = useState(false);
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}CC)`, padding: '60px 24px 28px', position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <button onClick={() => definirFavorito(!favorito)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{favorito ? '❤️' : '🤍'}</button>
        </div>
        <BotaoVoltar navegar={navegar} dest="mat-books" label="Livros"/>
        <div className="anim-popin" style={{ width: 90, height: 120, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', margin: '0 auto 14px', border: '2px solid rgba(255,255,255,0.3)' }}>{b.emoji}</div>
        <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 900, margin: '0 0 4px' }}>{b.title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: 0 }}>{b.author}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 99, padding: '4px 12px', fontSize: '11px', fontWeight: 700 }}>{b.subject}</span>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 99, padding: '4px 12px', fontSize: '11px', fontWeight: 700 }}>{b.nivel}</span>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 99, padding: '4px 12px', fontSize: '11px', fontWeight: 700 }}>{b.pages}p</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="anim-fadeup" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, color: CORES.text, fontSize: '13px', margin: '0 0 8px' }}>Sinopse</p>
          <p style={{ color: CORES.muted, fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
        </div>
        <div className="anim-fadeup anim-delay-1" style={{ background: '#fff', borderRadius: 18, padding: '16px', boxShadow: '0 4px 16px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, color: CORES.text, fontSize: '13px', margin: '0 0 10px' }}>Conteúdos abordados</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {b.topicos.map((t, i) => (<div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: b.color, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: '13px', color: CORES.text, fontWeight: 600 }}>{t}</span>
              </div>))}
          </div>
        </div>
        <button className="anim-fadeup anim-delay-2" onClick={() => navegar('mat-book-reader')} style={{ padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${b.color}, ${b.color}BB)`, color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px ${b.color}40` }}>
          📖 Começar a ler
        </button>
      </div>
    </div>);
}
function TelaLeitor({ navegar, material, tipo }) {
    const item = material ?? (tipo === 'livro' ? LIVROS[0] : APOSTILAS[0]);
    const chave = `educamais-leitura-${tipo}-${item.id}`;
    const paginas = [
      { titulo: 'Visão geral', texto: item.desc, destaque: 'Comece identificando a ideia principal do conteúdo.' },
      { titulo: item.topicos?.[0] ?? 'Conceitos essenciais', texto: `Nesta parte, vamos estudar os fundamentos de ${item.title.toLowerCase()}. Observe os exemplos e destaque as palavras mais importantes.`, destaque: 'Aprenda um conceito por vez e confira se consegue explicá-lo com suas próprias palavras.' },
      { titulo: item.topicos?.[1] ?? 'Exemplo prático', texto: `Use este exemplo para relacionar o conteúdo com uma situação do dia a dia. A prática ajuda a transformar a leitura em conhecimento.`, destaque: 'Tente resolver o exemplo antes de consultar a explicação.' },
      { titulo: item.topicos?.[2] ?? 'Aplicação', texto: `Agora aplique o que você aprendeu em uma nova situação. Compare seu raciocínio com os passos apresentados e anote suas dúvidas.`, destaque: 'Revisar os passos é tão importante quanto encontrar a resposta.' },
      { titulo: 'Resumo e revisão', texto: `Você concluiu esta seção de ${item.title}. Revise os pontos principais e, quando estiver pronto, pratique com exercícios relacionados.`, destaque: 'Uma boa revisão reforça a memória e revela quais assuntos ainda precisam de atenção.' },
    ];
    const [pagina, definirPagina] = useState(() => Number(localStorage.getItem(`${chave}-pagina`) || 0));
    const [concluidas, definirConcluidas] = useState(() => {
      try { return JSON.parse(localStorage.getItem(`${chave}-concluidas`) || '[]'); }
      catch { return []; }
    });
    const atual = paginas[pagina];
    const marcarPagina = () => {
      if (concluidas.includes(pagina)) return;
      const novasConcluidas = [...concluidas, pagina];
      definirConcluidas(novasConcluidas);
      localStorage.setItem(`${chave}-concluidas`, JSON.stringify(novasConcluidas));
    };
    const mudarPagina = (novaPagina) => {
      definirPagina(novaPagina);
      localStorage.setItem(`${chave}-pagina`, String(novaPagina));
    };
    const percentual = Math.round((concluidas.length / paginas.length) * 100);
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`, padding: '58px 20px 20px', color: '#fff' }}>
        <BotaoVoltar navegar={navegar} dest={tipo === 'livro' ? 'mat-book-detail' : 'mat-apostilas'} label="Voltar"/>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, opacity: 0.75 }}>{tipo === 'livro' ? 'Leitura do livro' : 'Leitura da apostila'}</p>
        <h2 style={{ fontSize: '21px', fontWeight: 900, margin: '5px 0 0' }}>{item.title}</h2>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: '0 3px 12px rgba(108,58,255,.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
            <span style={{ color: CORES.text, fontSize: '12px', fontWeight: 800 }}>Progresso da leitura</span>
            <span style={{ color: item.color, fontSize: '12px', fontWeight: 800 }}>{percentual}%</span>
          </div>
          <BarraProgresso value={percentual} color={item.color} height={7}/>
        </div>
        <div className="anim-fadeup" style={{ background: '#fff', borderRadius: 20, padding: '22px 20px', minHeight: 230, boxShadow: '0 4px 18px rgba(108,58,255,.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span style={{ color: item.color, fontSize: '12px', fontWeight: 800 }}>Página {pagina + 1} de {paginas.length}</span>
            <span style={{ fontSize: '24px' }}>{item.emoji}</span>
          </div>
          <h2 style={{ color: CORES.text, fontSize: '22px', fontWeight: 900, margin: '0 0 10px' }}>{atual.titulo}</h2>
          <p style={{ color: CORES.muted, fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px' }}>{atual.texto}</p>
          <div style={{ background: item.bg, borderRadius: 12, padding: '12px', color: CORES.text, fontSize: '12px', lineHeight: 1.5 }}><b>💡 Para lembrar:</b> {atual.destaque}</div>
        </div>
        <button onClick={marcarPagina} disabled={concluidas.includes(pagina)} style={{ padding: '14px', borderRadius: 14, background: concluidas.includes(pagina) ? '#F0FDF4' : item.bg, color: concluidas.includes(pagina) ? CORES.green : item.color, border: `1.5px solid ${concluidas.includes(pagina) ? '#BBF7D0' : `${item.color}30`}`, fontSize: '14px', fontWeight: 800, cursor: concluidas.includes(pagina) ? 'default' : 'pointer', fontFamily: "'Nunito', sans-serif" }}>
          {concluidas.includes(pagina) ? '✓ Página marcada como concluída' : 'Marcar página como concluída'}
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => mudarPagina(Math.max(0, pagina - 1))} disabled={pagina === 0} style={{ flex: 1, padding: '13px', borderRadius: 13, border: '1.5px solid #EDE9FF', background: '#fff', color: CORES.muted, fontWeight: 800, cursor: pagina === 0 ? 'not-allowed' : 'pointer', opacity: pagina === 0 ? 0.5 : 1 }}>← Anterior</button>
          <button onClick={() => mudarPagina(Math.min(paginas.length - 1, pagina + 1))} disabled={pagina === paginas.length - 1} style={{ flex: 1, padding: '13px', borderRadius: 13, border: 'none', background: item.color, color: '#fff', fontWeight: 800, cursor: pagina === paginas.length - 1 ? 'not-allowed' : 'pointer', opacity: pagina === paginas.length - 1 ? 0.5 : 1 }}>Próxima →</button>
        </div>
        {percentual === 100 && <button onClick={() => navegar('exercise')} style={{ padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.teal}, #00A88F)`, color: '#fff', border: 'none', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>✅ Fazer exercícios sobre este conteúdo</button>}
      </div>
    </div>);
}
function TelaVideoaulas({ navegar, definirVideoSelecionado }) {
    const [filtro, definirFiltro] = useState('Todos');
    const filtrados = VIDEOAULAS.filter(v => filtro === 'Todos' || v.subject === filtro);
    const topicos = [...new Set(filtrados.map(v => v.topic))];
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, padding: '60px 24px 20px' }}>
        <BotaoVoltar navegar={navegar} dest="materials"/>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 900, margin: 0 }}>🎥 Videoaulas</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', margin: '4px 0 0' }}>Aprenda assistindo</p>
      </div>
      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Todos', 'Português', 'Matemática'].map(f => (<button key={f} onClick={() => definirFiltro(f)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 99, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", border: `1.5px solid ${filtro === f ? CORES.violet : '#DDD8F0'}`, background: filtro === f ? CORES.violet : '#fff', color: filtro === f ? '#fff' : CORES.muted }}>
              {f}
            </button>))}
        </div>
        {topicos.map(topic => (<div key={topic} className="anim-fadeup">
            <p style={{ fontWeight: 800, fontSize: '13px', color: CORES.text, margin: '4px 0 8px' }}>{filtro === 'Todos' ? (filtrados.find(v => v.topic === topic)?.subject ?? '') + ' — ' : ''}{topic}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filtrados.filter(v => v.topic === topic).map(video => (<button key={video.id} onClick={() => { definirVideoSelecionado(video); navegar('mat-player'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: 16, background: '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 12px rgba(108,58,255,0.08)', fontFamily: "'Nunito', sans-serif", transition: 'transform 0.15s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: video.watched ? '#F0FDF4' : '#F0EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    {video.watched ? '✅' : '▶️'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: CORES.text, fontSize: '13px', margin: '0 0 3px' }}>{video.title}</p>
                    <p style={{ color: CORES.muted, fontSize: '11px', margin: '0 0 6px' }}>{video.teacher} · {video.duration}</p>
                    {video.progresso > 0 && <BarraProgresso value={video.progresso} color={CORES.violet} height={4}/>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={CORES.muted} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>))}
            </div>
          </div>))}
      </div>
    </div>);
}
function TelaPlayerVideo({ navegar, video }) {
    const v = video ?? VIDEOAULAS[0];
    const [reproduzindo, definirReproduzindo] = useState(false);
    const [progresso, definirProgresso] = useState(v.progresso);
    const [concluido, definirConcluido] = useState(v.watched);
    useEffect(() => {
        if (!reproduzindo)
            return;
        const t = setInterval(() => definirProgresso(p => { const np = Math.min(p + 1, 100); if (np === 100) {
          definirReproduzindo(false);
          definirConcluido(true);
        } return np; }), 200);
        return () => clearInterval(t);
    }, [reproduzindo]);
    const [minutosDuracao, segundosDuracao] = v.duration.split(':').map(Number);
    const segundosDecorridos = Math.floor((progresso / 100) * (minutosDuracao * 60 + segundosDuracao));
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Player area */}
      <div style={{ background: '#0f0a2e', paddingTop: '52px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 60, left: 16, zIndex: 2 }}>
          <button onClick={() => navegar('mat-videos')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '5px 10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>← Voltar</button>
        </div>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => definirReproduzindo(!reproduzindo)}>
            <span style={{ fontSize: '28px' }}>{reproduzindo ? '⏸' : '▶️'}</span>
          </div>
          {/* Fake video overlay */}
          <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>{Math.floor(segundosDecorridos / 60)}:{String(segundosDecorridos % 60).padStart(2, '0')}</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>{v.duration}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 3 }}>
              <div style={{ width: `${progresso}%`, height: '100%', background: CORES.violet, borderRadius: 99 }}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="anim-fadeup">
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', background: '#F0EBFF', color: CORES.violet, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>{v.subject}</span>
            <span style={{ fontSize: '10px', background: '#F5F3FF', color: CORES.muted, padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>{v.topic}</span>
          </div>
          <h2 style={{ fontWeight: 900, color: CORES.text, fontSize: '18px', margin: '0 0 4px' }}>{v.title}</h2>
          <p style={{ color: CORES.muted, fontSize: '12px', margin: 0 }}>{v.teacher} · {v.duration}</p>
        </div>

        <div className="anim-fadeup anim-delay-1" style={{ background: '#fff', borderRadius: 16, padding: '14px', boxShadow: '0 2px 12px rgba(108,58,255,0.08)' }}>
          <p style={{ fontWeight: 800, color: CORES.text, fontSize: '12px', margin: '0 0 8px' }}>Progresso da aula</p>
          <BarraProgresso value={progresso} color={CORES.violet} height={8}/>
          <p style={{ color: CORES.muted, fontSize: '11px', margin: '6px 0 0', textAlign: 'right' }}>{progresso}% concluído</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="anim-fadeup anim-delay-2">
          <button onClick={() => definirReproduzindo(!reproduzindo)} style={{ padding: '15px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, color: '#fff', border: 'none', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", boxShadow: `0 6px 20px rgba(108,58,255,0.3)` }}>
            {reproduzindo ? '⏸ Pausar' : '▶ Continuar assistindo'}
          </button>
          {(concluido || progresso === 100) && (<button onClick={() => navegar('exercise')} style={{ padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${CORES.teal}, #00A88F)`, color: '#fff', border: 'none', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
              ✅ Marcar como concluído e fazer exercícios
            </button>)}
        </div>
      </div>
    </div>);
}
function TelaApostilas({ navegar, definirApostilaSelecionada }) {
    const [filtro, definirFiltro] = useState('Todos');
    const filtrados = APOSTILAS.filter(a => filtro === 'Todos' || a.subject === filtro);
    return (<div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ background: `linear-gradient(135deg, ${CORES.teal}, #00A88F)`, padding: '60px 24px 20px' }}>
        <BotaoVoltar navegar={navegar} dest="materials"/>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 900, margin: 0 }}>📄 Apostilas</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', margin: '4px 0 0' }}>Material de apoio completo</p>
      </div>
      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Todos', 'Português', 'Matemática'].map(f => (<button key={f} onClick={() => definirFiltro(f)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 99, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", border: `1.5px solid ${filtro === f ? CORES.teal : '#DDD8F0'}`, background: filtro === f ? CORES.teal : '#fff', color: filtro === f ? '#fff' : CORES.muted }}>
              {f}
            </button>))}
        </div>
        {filtrados.map((ap, i) => (<div key={ap.id} className={`anim-fadeup anim-delay-${i}`} style={{ background: '#fff', borderRadius: 18, padding: '18px', boxShadow: '0 4px 16px rgba(0,201,167,0.10)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: 48, height: 60, borderRadius: 10, background: ap.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0, border: `2px solid ${ap.color}20` }}>{ap.emoji}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '10px', background: ap.bg, color: ap.color, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>{ap.subject}</span>
                <p style={{ fontWeight: 800, color: CORES.text, fontSize: '14px', margin: '4px 0 2px', lineHeight: 1.3 }}>{ap.title}</p>
                <p style={{ color: CORES.muted, fontSize: '12px', margin: '0 0 6px', lineHeight: 1.4 }}>{ap.desc}</p>
                <p style={{ color: CORES.muted, fontSize: '11px', margin: 0 }}>{ap.pages} páginas</p>
              </div>
            </div>
            {ap.progresso > 0 && (<div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: CORES.muted, fontWeight: 600 }}>Progresso de leitura</span>
                  <span style={{ fontSize: '11px', color: ap.color, fontWeight: 700 }}>{ap.progresso}%</span>
                </div>
                <BarraProgresso value={ap.progresso} color={ap.color} height={6}/>
              </div>)}
            <button onClick={() => { definirApostilaSelecionada(ap); navegar('mat-apostila-reader'); }} style={{ width: '100%', padding: '12px', borderRadius: 12, background: ap.bg, border: `1.5px solid ${ap.color}30`, color: ap.color, fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
              {ap.progresso > 0 ? '📖 Continuar leitura' : '📄 Abrir apostila'}
            </button>
          </div>))}
      </div>
    </div>);
}
const ScreenHeader = ({ title, subtitle, navegar, dest = 'home' }) => (<div style={{ background: `linear-gradient(135deg, ${CORES.violet}, #9B5DE5)`, padding: '58px 20px 20px', color: '#fff' }}>
    <button onClick={() => navegar(dest)} style={{ background: 'rgba(255,255,255,.16)', border: 0, color: '#fff', borderRadius: 10, padding: '6px 12px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>← Voltar</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, margin: '14px 0 2px' }}>{title}</h2>
    {subtitle && <p style={{ margin: 0, color: 'rgba(255,255,255,.75)', fontSize: 12 }}>{subtitle}</p>}
  </div>);
function TelaPlanoEstudos({ navegar }) {
    const tarefas = [['🔢', 'Matemática', 'Frações', '20 min'], ['📚', 'Português', 'Interpretação de texto', '15 min'], ['🎯', 'Revisão', 'Questões que você errou', '10 min']];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="📅 Plano de estudos" subtitle="Uma rotina simples para você evoluir todos os dias" navegar={navegar}/><div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ background: '#fff', borderRadius: 18, padding: 16, boxShadow: '0 4px 16px rgba(108,58,255,.08)' }}><p style={{ fontWeight: 900, margin: '0 0 5px', color: CORES.text }}>Meta de hoje</p><p style={{ fontSize: 12, color: CORES.muted, margin: '0 0 10px' }}>35 minutos de estudo</p><BarraProgresso value={58}/><p style={{ fontSize: 11, color: CORES.violet, fontWeight: 800, margin: '7px 0 0' }}>20 de 35 minutos</p></div>
    {tarefas.map((t, i) => <button key={t[1]} onClick={() => i === 2 ? navegar('review-errors') : navegar('exercise')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 15, borderRadius: 16, border: '1.5px solid #EDE9FF', background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}><span style={{ fontSize: 25 }}>{t[0]}</span><span style={{ flex: 1 }}><b style={{ display: 'block', fontSize: 13, color: CORES.text }}>{t[1]} · {t[2]}</b><small style={{ color: CORES.muted }}>{t[3]}</small></span><span style={{ color: CORES.violet, fontWeight: 900 }}>→</span></button>)}
  </div></div>;
}
function TelaSequencia({ navegar }) {
    const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="🔥 Sua sequência" subtitle="Não deixe o hábito parar" navegar={navegar}/><div style={{ padding: 20 }}><div style={{ background: '#fff', borderRadius: 20, padding: 20, textAlign: 'center', boxShadow: '0 4px 18px rgba(108,58,255,.08)' }}><div style={{ fontSize: 60 }}>🔥</div><h1 style={{ margin: '5px 0', fontSize: 38, color: CORES.violet }}>7 dias</h1><p style={{ color: CORES.muted, fontSize: 13 }}>Você está estudando há uma semana seguida!</p><div style={{ display: 'flex', gap: 7, marginTop: 20 }}>{dias.map((d, i) => <div key={i} style={{ flex: 1 }}><div style={{ height: 40, borderRadius: 12, background: i < 5 ? '#FFF3D6' : '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{i < 5 ? '🔥' : '·'}</div><small style={{ color: CORES.muted }}>{d}</small></div>)}</div><button onClick={() => navegar('focus')} style={{ marginTop: 20, width: '100%', padding: 14, border: 0, borderRadius: 13, background: CORES.violet, color: '#fff', fontWeight: 900, cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}>Estudar agora 🚀</button></div></div></div>;
}
function TelaRanking({ navegar }) {
    const pessoas = [['🥇', 'Ana', '1.850'], ['🥈', 'João', '1.620'], ['🥉', 'Gustavo', '1.480'], ['4º', 'Pedro', '1.320'], ['5º', 'Lucas', '1.210']];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="🏆 Ranking semanal" subtitle="Compare seu progresso com a turma" navegar={navegar}/><div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>{pessoas.map((p, i) => <div key={p[1]} style={{ display: 'flex', alignItems: 'center', padding: 14, borderRadius: 15, background: i === 2 ? '#F0EBFF' : '#fff', border: i === 2 ? `1.5px solid ${CORES.violet}` : '1px solid #EDE9FF' }}><b style={{ width: 35, fontSize: 18 }}>{p[0]}</b><span style={{ flex: 1, fontWeight: 800, color: CORES.text }}>{p[1]}{p[1] === 'Gustavo' && <small style={{ display: 'block', color: CORES.violet }}>Você</small>}</span><b style={{ color: CORES.yellow }}>⭐ {p[2]}</b></div>)}<div style={{ background: '#FFF8E1', borderRadius: 15, padding: 14, fontSize: 12, color: '#8A6200', fontWeight: 700 }}>🎯 Faltam 140 pontos para você chegar ao 2º lugar.</div></div></div>;
}
function TelaDesafioDiario({ navegar }) {
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="⚡ Desafio do dia" subtitle="Ganhe XP respondendo 5 questões" navegar={navegar}/><div style={{ padding: 20 }}><div style={{ background: '#fff', borderRadius: 20, padding: 22, boxShadow: '0 4px 18px rgba(108,58,255,.08)', textAlign: 'center' }}><div style={{ fontSize: 52 }}>🎯</div><h2 style={{ color: CORES.text, margin: '8px 0' }}>Desafio relâmpago</h2><p style={{ color: CORES.muted, fontSize: 13, lineHeight: 1.6 }}>Resolva 5 questões de Matemática. Complete o desafio para ganhar <b style={{ color: CORES.yellow }}>+50 XP</b>.</p><div style={{ background: '#F5F3FF', borderRadius: 12, padding: 12, textAlign: 'left', marginTop: 15 }}><b style={{ fontSize: 12, color: CORES.text }}>Recompensa</b><p style={{ margin: '4px 0 0', fontSize: 13, color: CORES.violet, fontWeight: 900 }}>⭐ +50 XP · 🏆 progresso de conquista</p></div><button onClick={() => navegar('exercise')} style={{ marginTop: 18, width: '100%', padding: 15, border: 0, borderRadius: 14, background: `linear-gradient(135deg,${CORES.violet},#9B5DE5)`, color: '#fff', fontWeight: 900, cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}>Começar desafio 🚀</button></div></div></div>;
}
function TelaRevisaoErros({ navegar }) {
    const erros = [['🔢', 'Frações', '2 erros'], ['📊', 'Porcentagem', '3 erros'], ['📐', 'Equações', '1 erro']];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="📕 Revisar meus erros" subtitle="Transforme seus erros em aprendizado" navegar={navegar}/><div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>{erros.map(e => <button key={e[1]} onClick={() => navegar('exercise')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 15, borderRadius: 16, border: '1px solid #FCA5A5', background: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}><span style={{ fontSize: 25 }}>{e[0]}</span><span style={{ flex: 1 }}><b style={{ display: 'block', color: CORES.text }}>{e[1]}</b><small style={{ color: CORES.red }}>{e[2]} para revisar</small></span><span>→</span></button>)}<div style={{ marginTop: 6, padding: 15, borderRadius: 15, background: '#F0FDF4', color: '#16734A', fontSize: 12, fontWeight: 700 }}>💡 Dica: revisar uma questão errada logo após o exercício ajuda a identificar onde está a dificuldade.</div></div></div>;
}
function TelaFoco({ navegar }) {
    const [segundos, definirSegundos] = useState(25 * 60);
    const [executando, definirExecutando] = useState(false);
    useEffect(() => { if (!executando)
      return; const id = setInterval(() => definirSegundos(v => { if (v <= 1) {
        definirExecutando(false);
        return 0;
      } return v - 1; }), 1000); return () => clearInterval(id); }, [executando]);
    const minutosFormatados = String(Math.floor(segundos / 60)).padStart(2, '0'), segundosFormatados = String(segundos % 60).padStart(2, '0');
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="🎯 Modo foco" subtitle="Estude sem distrações" navegar={navegar}/><div style={{ padding: 20 }}><div style={{ background: '#fff', borderRadius: 22, padding: 24, textAlign: 'center', boxShadow: '0 4px 18px rgba(108,58,255,.08)' }}><div style={{ fontSize: 58 }}>🧠</div><p style={{ fontWeight: 800, color: CORES.muted, margin: '4px 0' }}>Matemática · Frações</p><div style={{ fontSize: 52, fontWeight: 900, color: CORES.violet, letterSpacing: 2, margin: '18px 0' }}>{minutosFormatados}:{segundosFormatados}</div><p style={{ fontSize: 12, color: CORES.muted }}>Meta: 25 minutos</p><button onClick={() => definirExecutando(!executando)} style={{ width: '100%', padding: 15, border: 0, borderRadius: 14, background: executando ? CORES.orange : CORES.violet, color: '#fff', fontWeight: 900, cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}>{executando ? '⏸ Pausar' : '▶ Iniciar foco'}</button><button onClick={() => { definirSegundos(25 * 60); definirExecutando(false); }} style={{ marginTop: 9, width: '100%', padding: 12, borderRadius: 12, border: '1.5px solid #EDE9FF', background: '#fff', color: CORES.muted, fontWeight: 800, cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}>Reiniciar</button></div></div></div>;
}
function TelaFavoritos({ navegar }) {
    const favoritos = [['📖', 'Gramática Essencial', 'Livro'], ['▶️', 'Exercícios resolvidos', 'Videoaula'], ['📄', 'Interpretação de Texto', 'Apostila']];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="❤️ Meus favoritos" subtitle="Materiais salvos para estudar depois" navegar={navegar}/><div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>{favoritos.map(f => <button key={f[1]} onClick={() => navegar('materials')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 15, border: 0, borderRadius: 16, background: '#fff', boxShadow: '0 3px 12px rgba(108,58,255,.07)', textAlign: 'left', cursor: 'pointer', fontFamily: "'Nunito',sans-serif" }}><span style={{ fontSize: 26 }}>{f[0]}</span><span style={{ flex: 1 }}><b style={{ display: 'block', color: CORES.text }}>{f[1]}</b><small style={{ color: CORES.muted }}>{f[2]}</small></span><span style={{ color: CORES.red }}>♥</span></button>)}</div></div>;
}
function TelaNotificacoes({ navegar }) {
    const notificacoes = [['🔥', 'Sua sequência está em risco!', 'Estude hoje para manter seus 7 dias.'], ['🏆', 'Nova conquista disponível', 'Responda mais 40 questões para desbloquear.'], ['📚', 'Novo material', 'Uma nova apostila de Matemática foi adicionada.'], ['⭐', 'Você ganhou XP', '+30 XP pela última sessão de estudos.']];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="🔔 Notificações" subtitle="Tudo que aconteceu por aqui" navegar={navegar}/><div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>{notificacoes.map(numero => <div key={numero[1]} style={{ display: 'flex', gap: 12, padding: 14, borderRadius: 15, background: '#fff', boxShadow: '0 2px 10px rgba(108,58,255,.06)' }}><span style={{ fontSize: 24 }}>{numero[0]}</span><div><b style={{ fontSize: 13, color: CORES.text }}>{numero[1]}</b><p style={{ fontSize: 11, color: CORES.muted, margin: '4px 0 0', lineHeight: 1.4 }}>{numero[2]}</p></div></div>)}</div></div>;
}
function TelaHistorico({ navegar }) {
    const itens = [['Hoje', 'Matemática', '20 questões', '80%'], ['Hoje', 'Português', '10 questões', '70%'], ['Ontem', 'Matemática', '15 questões', '67%'], ['28/08', 'Português', '20 questões', '85%']];
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="📅 Histórico" subtitle="Veja tudo que você já estudou" navegar={navegar}/><div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>{itens.map((x, i) => <div key={i} style={{ background: '#fff', borderRadius: 15, padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 42, height: 42, borderRadius: 12, background: i % 2 ? '#FFF0EA' : '#F0EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{i % 2 ? '📚' : '🔢'}</div><div style={{ flex: 1 }}><small style={{ color: CORES.muted }}>{x[0]}</small><b style={{ display: 'block', fontSize: 13, color: CORES.text }}>{x[1]} · {x[2]}</b></div><b style={{ color: CORES.green }}>{x[3]}</b></div>)}</div></div>;
}
function TelaConfiguracaoQuiz({ navegar, quantidadeQuiz, definirQuantidadeQuiz }) {
    const [nivel, setLevel] = useState('Médio');
    const quantidade = quantidadeQuiz;
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="🧩 Configurar quiz" subtitle="Escolha como quer praticar" navegar={navegar}/><div style={{ padding: 20 }}><div style={{ background: '#fff', borderRadius: 18, padding: 18, boxShadow: '0 4px 16px rgba(108,58,255,.08)' }}><b style={{ color: CORES.text }}>Dificuldade</b><div style={{ display: 'flex', gap: 8, margin: '12px 0 20px' }}>{['Fácil', 'Médio', 'Difícil'].map(v => <button key={v} onClick={() => setLevel(v)} style={{ flex: 1, padding: 11, borderRadius: 12, border: `1.5px solid ${nivel === v ? CORES.violet : '#EDE9FF'}`, background: nivel === v ? '#F0EBFF' : '#fff', color: nivel === v ? CORES.violet : CORES.muted, fontWeight: 800, cursor: 'pointer' }}>{v}</button>)}</div><b style={{ color: CORES.text }}>Quantidade</b><div style={{ display: 'flex', gap: 8, margin: '12px 0 20px' }}>{[5, 10, 20].map(v => <button key={v} onClick={() => definirQuantidadeQuiz(v)} style={{ flex: 1, padding: 11, borderRadius: 12, border: `1.5px solid ${quantidade === v ? CORES.violet : '#EDE9FF'}`, background: quantidade === v ? '#F0EBFF' : '#fff', color: quantidade === v ? CORES.violet : CORES.muted, fontWeight: 800, cursor: 'pointer' }}>{v}</button>)}</div><div style={{ padding: 12, background: '#F5F3FF', borderRadius: 12, fontSize: 12, color: CORES.muted }}>Selecionado: <b style={{ color: CORES.violet }}>{nivel} · {quantidade} questões</b></div><button onClick={() => navegar('exercise')} style={{ marginTop: 16, width: '100%', padding: 15, border: 0, borderRadius: 14, background: CORES.violet, color: '#fff', fontWeight: 900, cursor: 'pointer' }}>Começar quiz 🚀</button></div></div></div>;
}
function TelaConfiguracoes({ navegar, dark, setDark, sound, setSound }) {
    const Toggle = ({ on, setOn }) => <button onClick={() => setOn(!on)} style={{ width: 44, height: 25, borderRadius: 99, border: 0, background: on ? CORES.violet : '#DDD8F0', padding: 3, cursor: 'pointer' }}><span style={{ display: 'block', width: 19, height: 19, borderRadius: '50%', background: '#fff', transform: `translateX(${on ? 19 : 0}px)`, transition: '.2s' }}/></button>;
    return <div style={{ flex: 1, overflowY: 'auto' }}><ScreenHeader title="⚙️ Configurações" subtitle="Personalize sua experiência" navegar={navegar} dest="profile"/><div style={{ padding: 20 }}><div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 16px rgba(108,58,255,.08)' }}>{[['🌙', 'Modo escuro', dark, setDark], ['🔊', 'Sons', sound, setSound]].map(x => <div key={x[1]} style={{ display: 'flex', alignItems: 'center', padding: 16, borderBottom: '1px solid #F5F3FF' }}><span style={{ fontSize: 20, marginRight: 12 }}>{x[0]}</span><span style={{ flex: 1, fontWeight: 700, color: CORES.text, fontSize: 13 }}>{x[1]}</span><Toggle on={x[2]} setOn={x[3]}/></div>)}<button onClick={() => navegar('notifications')} style={{ width: '100%', padding: 16, border: 0, borderBottom: '1px solid #F5F3FF', background: '#fff', textAlign: 'left', fontWeight: 700, cursor: 'pointer' }}>🔔 Preferências de notificações <span style={{ float: 'right' }}>→</span></button><button onClick={() => navegar('profile')} style={{ width: '100%', padding: 16, border: 0, background: '#fff', textAlign: 'left', fontWeight: 700, cursor: 'pointer' }}>🔒 Privacidade <span style={{ float: 'right' }}>→</span></button></div></div></div>;
}
export default function Aplicativo() {
    const [screen, setScreen] = useState('splash');
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [quantidadeQuiz, definirQuantidadeQuiz] = useState(10);
    const [streak] = useState(7);
    const [livroSelecionado, definirLivroSelecionado] = useState(null);
    const [apostilaSelecionada, definirApostilaSelecionada] = useState(null);
    const [videoSelecionado, definirVideoSelecionado] = useState(null);
    const [materiaSelecionada, definirMateriaSelecionada] = useState('matematica');
    const [profile, setProfile] = useState(carregarPerfil);
    const [account, setAccount] = useState(carregarConta);
    const [mensagemLogin, definirMensagemLogin] = useState('');
    const [dark, setDark] = useState(() => localStorage.getItem('educamais-dark') === 'true');
    const [sound, setSound] = useState(() => localStorage.getItem('educamais-sound') !== 'false');
    function salvarPerfil(nextProfile) {
      setProfile(nextProfile);
      localStorage.setItem('educamais-profile', JSON.stringify(nextProfile));
    }
    function criarConta(newAccount) {
      setAccount(newAccount);
      localStorage.setItem('educamais-account', JSON.stringify(newAccount));
      definirMensagemLogin('Conta criada com sucesso! Entre usando o e-mail e a senha cadastrados.');
      navegar('login');
    }
    function navegar(s) {
      if (s === 'exercise' && !['correct', 'wrong'].includes(screen)) {
        setQIndex(0);
        setScore({ correct: 0, total: 0 });
      }
        if (s === 'correct')
            setScore(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
        if (s === 'wrong')
            setScore(prev => ({ ...prev, total: prev.total + 1 }));
        window.scrollTo(0, 0);
        setScreen(s);
    }
    const mostrarNavegacaoInferior = ['home', 'subjects', 'materials', 'performance', 'profile'].includes(screen);
    return (<EstruturaCelular dark={dark}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {screen === 'splash' && <TelaAbertura onDone={() => navegar('login')}/>}
        {screen === 'login' && <TelaLogin navegar={navegar} account={account} mensagemSucesso={mensagemLogin} limparSucesso={() => definirMensagemLogin('')}/>}
        {screen === 'register' && <TelaCadastro navegar={navegar} aoCriar={criarConta}/>} 
        {screen === 'forgot-password' && <TelaEsqueciSenha navegar={navegar}/>} 
        {screen === 'home' && <TelaInicio navegar={navegar} streak={streak}/>}
        {screen === 'subjects' && <TelaMaterias navegar={navegar} definirMateriaSelecionada={definirMateriaSelecionada}/>}
       {screen === 'content' && <TelaConteudo navegar={navegar} materiaSelecionada={materiaSelecionada}/>}
        {screen === 'exercise' && <TelaExercicio navegar={navegar} qIndex={qIndex} materiaSelecionada={materiaSelecionada} quantidadeQuiz={quantidadeQuiz}/>} 
        {screen === 'correct' && <TelaRespostaCorreta navegar={navegar} qIndex={qIndex} setQIndex={setQIndex} materiaSelecionada={materiaSelecionada} quantidadeQuiz={quantidadeQuiz}/>} 
        {screen === 'wrong' && <TelaRespostaIncorreta navegar={navegar} qIndex={qIndex} setQIndex={setQIndex} materiaSelecionada={materiaSelecionada} quantidadeQuiz={quantidadeQuiz}/>} 
        {screen === 'result' && <TelaResultado navegar={navegar} setQIndex={setQIndex} score={score}/>}
        {screen === 'profile' && <TelaPerfil navegar={navegar} profile={profile}/>} 
        {screen === 'materials' && <TelaCentralMateriais navegar={navegar}/>}
        {screen === 'mat-books' && <TelaLivros navegar={navegar} definirLivroSelecionado={definirLivroSelecionado}/>}
        {screen === 'mat-book-detail' && <TelaDetalheLivro navegar={navegar} book={livroSelecionado}/>}
        {screen === 'mat-book-reader' && <TelaLeitor navegar={navegar} material={livroSelecionado} tipo="livro"/>}
        {screen === 'mat-videos' && <TelaVideoaulas navegar={navegar} definirVideoSelecionado={definirVideoSelecionado}/>}
        {screen === 'mat-player' && <TelaPlayerVideo navegar={navegar} video={videoSelecionado}/>}
        {screen === 'mat-apostilas' && <TelaApostilas navegar={navegar} definirApostilaSelecionada={definirApostilaSelecionada}/>} 
        {screen === 'mat-apostila-reader' && <TelaLeitor navegar={navegar} material={apostilaSelecionada} tipo="apostila"/>}
        {screen === 'premium' && <TelaPremium navegar={navegar}/>}
        {screen === 'study-plan' && <TelaPlanoEstudos navegar={navegar}/>}
        {screen === 'streak' && <TelaSequencia navegar={navegar}/>}
        {screen === 'performance' && <TelaDesempenho navegar={navegar}/>} 
        {screen === 'ranking' && <TelaRanking navegar={navegar}/>}
        {screen === 'edit-profile' && <TelaEdicaoPerfil navegar={navegar} profile={profile} onSave={salvarPerfil}/>} 
        {screen === 'daily-challenge' && <TelaDesafioDiario navegar={navegar}/>}
        {screen === 'review-errors' && <TelaRevisaoErros navegar={navegar}/>} 
        {screen === 'focus' && <TelaFoco navegar={navegar}/>}
        {screen === 'favorites' && <TelaFavoritos navegar={navegar}/>}
        {screen === 'notifications' && <TelaNotificacoes navegar={navegar}/>}
        {screen === 'history' && <TelaHistorico navegar={navegar}/>}
        {screen === 'quiz-settings' && <TelaConfiguracaoQuiz navegar={navegar} quantidadeQuiz={quantidadeQuiz} definirQuantidadeQuiz={definirQuantidadeQuiz}/>} 
        {screen === 'settings' && <TelaConfiguracoes navegar={navegar} dark={dark} setDark={value => { setDark(value); localStorage.setItem('educamais-dark', String(value)); }} sound={sound} setSound={value => { setSound(value); localStorage.setItem('educamais-sound', String(value)); }}/>} 
      </div>
      {mostrarNavegacaoInferior && <NavegacaoInferior screen={screen} navegar={navegar}/>}
    </EstruturaCelular>);
}


