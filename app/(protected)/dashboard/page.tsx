'use client';
import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabaseClient';

export default function Page(){
  const supabase = createSupabaseBrowser();
  const [suggested, setSuggested] = useState<number|null>(null);

  useEffect(()=>{
    supabase.from('erp.v_price').select('*').limit(1).then(({data, error})=>{
      if (error) console.error(error);
      const p = data?.[0];
      if(!p) return;
      const cost = Number(p.material_cost||0) + Number(p.labor_cost||0);
      // ((custo/(1-margem)) + taxa_fixa) / (1 - taxa_%)
      const price = ((cost / (1 - Number(p.target_margin||0))) + Number(p.fee_fixed||0)) / (1 - Number(p.fee_percent||0));
      setSuggested(price);
    });
  },[]);

  return (
    <section style={{padding:24}}>
      <h1 style={{fontSize:20, fontWeight:600}}>Dashboard</h1>
      <div style={{marginTop:12, display:'grid', gap:12}}>
        <div style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:16}}>
          <div style={{fontSize:14, color:'#64748b'}}>Preço Sugerido (exemplo)</div>
          <div style={{fontSize:20, fontWeight:600}}>
            {suggested === null ? '—' : `R$ ${suggested.toFixed(2)}`}
          </div>
        </div>
      </div>
    </section>
  );
}
