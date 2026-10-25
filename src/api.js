const BASE=import.meta.env.VITE_API_BASE_URL||'http://localhost:8080/api'
async function req(path,options={}) {
  const res=await fetch(BASE+path,{...options,headers:{'Content-Type':'application/json',...(options.headers||{})}})
  if(!res.ok){let msg=`Request failed (${res.status})`;try{const b=await res.json();msg=b.message||msg}catch{};throw new Error(msg)}
  return res.status===204?null:res.json()
}
export const api={
 dashboard:()=>req('/dashboard'),members:()=>req('/members'),
 createMember:d=>req('/members',{method:'POST',body:JSON.stringify(d)}),
 plans:()=>req('/plans'),createMembership:d=>req('/memberships',{method:'POST',body:JSON.stringify(d)}),
 renewals:()=>req('/memberships/renewals'),renew:(id,planId)=>req(`/memberships/${id}/renew?planId=${planId}`,{method:'POST'}),
 payments:()=>req('/payments'),createPayment:d=>req('/payments',{method:'POST',body:JSON.stringify(d)})
}
