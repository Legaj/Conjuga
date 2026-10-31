// Small, transparent SM-2-style scheduler: interval in days and due timestamps.
export const DAY=86400000;
export function normalizeAnswer(text,{ignoreAccents=false}={}){let out=String(text??'').trim().toLocaleLowerCase('sv-SE').normalize('NFC').replace(/\s+/g,' ');return ignoreAccents?out.normalize('NFD').replace(/[\u0300-\u036f]/g,''):out}
export function getCard(progress,id){return progress?.[id]||null}
export function isDue(progress,id,now=Date.now()){let p=getCard(progress,id);return Boolean(p)&&(!p.due||p.due<=now)}
export function updateCard(old,rating,now=Date.now()){
 const p={...{seen:0,right:0,lapses:0,streak:0,ease:2.5,interval:0,due:0,last:0},...(old||{})};
 const correct=rating!=='again';p.seen++;if(correct)p.right++;else p.lapses++;
 if(rating==='again'){p.streak=0;p.ease=Math.max(1.3,p.ease-.2);p.interval=0;p.due=now+10*60*1000}
 if(rating==='hard'){p.streak++;p.ease=Math.max(1.3,p.ease-.15);p.interval=p.interval===0?1:Math.max(1,Math.round(p.interval*1.2));p.due=now+p.interval*DAY}
 if(rating==='good'){p.streak++;p.interval=p.interval===0?1:p.interval===1?3:Math.max(2,Math.round(p.interval*p.ease));p.due=now+p.interval*DAY}
 if(rating==='easy'){p.streak++;p.ease=Math.min(3.0,p.ease+.15);p.interval=p.interval===0?4:Math.max(5,Math.round(p.interval*p.ease*1.4));p.due=now+p.interval*DAY}
 p.last=now;return p;
}
export function rankPool(items,progress,selection='recommended',now=Date.now()){
 const seeded=items.map((w,i)=>({w,i,p:progress?.[w.id]||null,random:Math.random()}));
 const filtered=seeded.filter(({p})=>selection==='all'||selection==='recommended'||(selection==='new'?!p:selection==='due'?Boolean(p)&&p.due<=now:selection==='weak'?Boolean(p)&&p.seen>0&&p.right/p.seen<.75:true));
 const score=({p,random,w})=>{
   if(!p)return selection==='recommended'?5+random-((w.priority||3)/5)*.6-(w.verifiedORD?1:0):random;
   const overdue=(now-p.due)/DAY;
   const error=1-p.right/Math.max(1,p.seen);
   const priority=(w.priority||3)/5;
   return (overdue>=0?0:12)+Math.max(-5,-overdue*.05)-(error*3)-(priority*.5)-(w.verifiedORD?1.2:0)+random*.5;
 };
 filtered.sort((a,b)=>selection==='all'||selection==='new'?a.random-b.random:score(a)-score(b));
 return filtered.map(x=>x.w)
}
export function statsFor(items,progress,activity,now=Date.now()){
 const ids=new Set(items.map(x=>x.id));const cards=items.map(x=>progress[x.id]).filter(Boolean);
 const due=items.filter(x=>isDue(progress,x.id,now)).length;
 const attempts=cards.reduce((n,p)=>n+p.seen,0);const correct=cards.reduce((n,p)=>n+p.right,0);
 const today=activity.filter(a=>a.t>=new Date(now).setHours(0,0,0,0)&&ids.has(a.id));
 return {learned:cards.length,total:items.length,due,attempts,correct,accuracy:attempts?Math.round(correct*100/attempts):0,today:today.length};
}
