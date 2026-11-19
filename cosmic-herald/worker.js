/**
 * COSMIC HERALD — draft-only Cloudflare Worker
 * Required secrets: OPENAI_API_KEY, HERALD_ADMIN_TOKEN
 * Required variable: ALLOWED_ORIGIN=https://ccconsciousness.github.io
 * Optional: OPENAI_MODEL (default gpt-4.1-mini)
 * Do not commit credentials or expose the admin token in public source.
 */
const JSON_HEADERS={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const json=(data,status=200,origin="")=>new Response(JSON.stringify(data),{status,headers:{...JSON_HEADERS,...(origin?{"access-control-allow-origin":origin,"vary":"Origin"}:{})}});
function authorized(req,env){const auth=req.headers.get("Authorization")||"";return !!env.HERALD_ADMIN_TOKEN&&auth===`Bearer ${env.HERALD_ADMIN_TOKEN}`;}
const SYSTEM=`You are COSMIC HERALD, a disclosed AI editorial assistant for the developing Church of Cosmic Consciousness (CCC). Draft original Facebook posts for human approval only. Never publish or send messages. Voice: warm, artistic, evidence-conscious; integrate scientific precision, spiritual inquiry, respectful comparative religion and poetic expression. Registers: exoteric (accessible), mesoteric (comparative), esoteric (advanced nondual inquiry). Core doctrine: the Absolute is beyond the distinction between consciousness and matter. Motto: One Reality. Infinite Expressions. No Fundamental Division. Never confuse metaphysical claims with established science, never fabricate quotes, citations, miracles, or empirical results. CCC is not yet a registered DBA, nonprofit, or confirmed tax-exempt church. Do not solicit donations, claim tax deductibility, promise outcomes, or imply an existing temple. Do not collect personal data. Write 120-220 words, with a meaningful reflective question and a few relevant hashtags. Return only the finished post.`;
export default {async fetch(request,env){
 const origin=request.headers.get("Origin")||"";
 const allowed=env.ALLOWED_ORIGIN||"https://ccconsciousness.github.io";
 const cors=origin===allowed?origin:"";
 if(request.method==="OPTIONS"){
   if(!cors)return new Response(null,{status:403});
   return new Response(null,{status:204,headers:{"access-control-allow-origin":cors,"access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"Authorization, Content-Type","access-control-max-age":"600","vary":"Origin"}});
 }
 const url=new URL(request.url);
 if(url.pathname==="/health"&&request.method==="GET")return json({service:"cosmic-herald",status:"configured",mode:"draft-only"},200,cors);
 if(url.pathname!=="/draft"||request.method!=="POST")return json({error:"Not found"},404,cors);
 if(origin&&origin!==allowed)return json({error:"Origin not permitted"},403);
 if(!authorized(request,env))return json({error:"Unauthorized"},401,cors);
 if(!env.OPENAI_API_KEY)return json({error:"Model provider not configured"},503,cors);
 if(Number(request.headers.get("content-length")||0)>16000)return json({error:"Request too large"},413,cors);
 let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,cors)}
 const topic=String(body.topic||"").slice(0,180).trim();
 const context=String(body.context||"").slice(0,800).trim();
 const register=["exoteric","mesoteric","esoteric"].includes(body.register)?body.register:"exoteric";
 const expression=["balanced","scientific","spiritual","religious","artistic"].includes(body.expression)?body.expression:"balanced";
 if(!topic)return json({error:"Topic required"},400,cors);
 try{
  const response=await fetch("https://api.openai.com/v1/responses",{
   method:"POST",headers:{"Authorization":`Bearer ${env.OPENAI_API_KEY}`,"Content-Type":"application/json"},
   body:JSON.stringify({model:env.OPENAI_MODEL||"gpt-4.1-mini",store:false,max_output_tokens:700,
    input:[{role:"system",content:SYSTEM},{role:"user",content:`Create one original draft. Topic: ${topic}\nContext: ${context}\nTeaching register: ${register}\nExpression: ${expression}.`}]})
  });
  const data=await response.json().catch(()=>({}));
  if(!response.ok)return json({error:"Model request failed",status:response.status},502,cors);
  const result=(data.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==="output_text").map(c=>c.text).join("\n").trim();
  if(!result)return json({error:"No draft returned"},502,cors);
  return json({draft:result,mode:"draft-only",human_review_required:true},200,cors);
 }catch{return json({error:"Upstream service unavailable"},502,cors)}
}};
