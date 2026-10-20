import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import {createClient} from 'npm:@supabase/supabase-js@2.78.0'
const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Content-Type':'application/json'}
Deno.serve(async(req)=>{
  if(req.method==='OPTIONS')return new Response('ok',{headers:cors})
  try{
    const auth=req.headers.get('Authorization'); if(!auth)throw new Error('Oturum gerekli')
    const supabase=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_ANON_KEY')!,{global:{headers:{Authorization:auth}}})
    const token=auth.replace('Bearer ',''); const {data:{user}}=await supabase.auth.getUser(token); if(!user)throw new Error('Geçersiz oturum')
    const key=Deno.env.get('XAI_API_KEY'); if(!key)throw new Error('XAI_API_KEY henüz eklenmedi')
    const {workspaceId,message,history=[],context={}}=await req.json(); if(!workspaceId||!message||String(message).length>8000)throw new Error('Geçersiz istek')
    const {data:member}=await supabase.from('studio_members').select('role').eq('workspace_id',workspaceId).eq('user_id',user.id).maybeSingle(); if(!member)throw new Error('Bu çalışma alanına erişiminiz yok')
    const since=new Date(Date.now()-86400000).toISOString(); const {count}=await supabase.from('studio_ai_usage').select('*',{count:'exact',head:true}).eq('workspace_id',workspaceId).gte('created_at',since); if((count||0)>=100)throw new Error('Günlük AI kullanım sınırına ulaşıldı')
    const system=`Sen 90+ Studio içindeki Türkçe futbol YouTube içerik asistanısın. Kanal yüz göstermeden, tek anlatıcıyla hikâye, karşılaştırma ve Shorts üretir. Net, enerjik ve uygulanabilir cevap ver. Doğrulanmamış futbol bilgilerini gerçek gibi sunma; teyit edilmesi gereken noktaları [TEYİT] olarak işaretle. Telifli maç görüntüsü kullanmayı önermeden, özgün anlatım ve yapay görsel odaklı çalış. Kullanıcı isterse çıktıyı başlık, kanca, sahne, seslendirme, Grok görsel promptu ve final sorusu olarak yapılandır. Proje bağlamı: ${JSON.stringify(context).slice(0,20000)}`
    const messages=[{role:'system',content:system},...history.slice(-10).map((x:any)=>({role:x.role==='ai'?'assistant':'user',content:String(x.text).slice(0,4000)})),{role:'user',content:String(message)}]
    const x=await fetch('https://api.x.ai/v1/chat/completions',{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:'grok-4.7',messages,temperature:.7,max_tokens:2200})})
    const raw=await x.text(); if(!x.ok)throw new Error(`Grok API: ${x.status} ${raw.slice(0,300)}`)
    const data=JSON.parse(raw); await supabase.from('studio_ai_usage').insert({workspace_id:workspaceId,user_id:user.id,operation:'chat'}); return new Response(JSON.stringify({text:data.choices?.[0]?.message?.content||'Yanıt alınamadı'}),{headers:cors})
  }catch(e){return new Response(JSON.stringify({error:e instanceof Error?e.message:String(e)}),{status:400,headers:cors})}
})
