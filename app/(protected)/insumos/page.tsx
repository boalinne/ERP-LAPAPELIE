'use client';
import { useEffect, useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabaseClient';

export default function Page(){
  const supabase = createSupabaseBrowser();
  const [rows, setRows] = useState<any[]>([]);
  useEffect(()=>{ supabase.from('erp.items').select('*').then(({data})=>setRows(data||[])); },[]);
  return (
    <section style={{padding:24}}>
      <h1 style={{fontSize:20, fontWeight:600}}>Insumos</h1>
      <div style={{marginTop:12, overflow:'auto', background:'#fff', border:'1px solid #e2e8f0', borderRadius:16}}>
        <table style={{width:'100%', fontSize:14, borderCollapse:'collapse'}}>
          <thead style={{background:'#f8fafc'}}>
            <tr>
              {['code','description','unit_cost','min_stock'].map(h=><th key={h} style={{textAlign:'left', padding:'10px 12px', borderBottom:'1px solid #e2e8f0'}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td style={{padding:'10px 12px', borderTop:'1px solid #e2e8f0'}}>{r.code}</td>
                <td style={{padding:'10px 12px', borderTop:'1px solid #e2e8f0'}}>{r.description}</td>
                <td style={{padding:'10px 12px', borderTop:'1px solid #e2e8f0'}}>R$ {Number(r.unit_cost).toFixed(2)}</td>
                <td style={{padding:'10px 12px', borderTop:'1px solid #e2e8f0'}}>{Number(r.min_stock||0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
