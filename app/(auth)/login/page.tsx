'use client';
import { createSupabaseBrowser } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function Page(){
  const supabase = createSupabaseBrowser();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function sendMagicLink(e: React.FormEvent){
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin }});
    if(!error) setSent(true);
    else alert(error.message);
  }

  return (
    <main style={{minHeight:'100vh', display:'grid', placeItems:'center', padding:24}}>
      <div style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:24, width:360}}>
        <h1 style={{fontSize:20, fontWeight:600, marginBottom:12}}>Entrar</h1>
        {sent ? (
          <p>Pronto! Olhe seu e-mail e clique no link para entrar.</p>
        ) : (
          <form onSubmit={sendMagicLink}>
            <input
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{width:'100%', padding:'10px 12px', border:'1px solid #cbd5e1', borderRadius:8}}
            />
            <button type="submit" style={{marginTop:12, padding:'10px 12px', width:'100%', borderRadius:8, background:'#111827', color:'#fff'}}>
              Enviar link de acesso
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
