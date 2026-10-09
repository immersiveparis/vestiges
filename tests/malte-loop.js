const {chromium}=require('playwright');const L=require('./lib');(async()=>{const loc=process.argv[2]||'fr-FR',w=+(process.argv[3]||1440),h=+(process.argv[4]||900),tag=loc.slice(0,2)+w;
const b=await L.launch();
const p=await b.newPage({viewport:{width:w,height:h},locale:loc,hasTouch:w<500});const errs=[];p.on('pageerror',e=>errs.push(e.message+' | '+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
await L.fonts(p);await p.goto(L.URL+'/index.html?lang='+loc.slice(0,2)+'&playtest=1');await p.waitForTimeout(900);
const W=t=>p.waitForTimeout(t);const shot=async n=>{const m=await p.evaluate(()=>[...document.querySelectorAll('.spr:not([hidden]) .page, #psheet:not([hidden]) .page')].map(e=>e.scrollHeight+'/'+e.clientHeight).join(' '));console.log('M',n,m);await p.screenshot({path:`${L.OUT}/mt-${tag}-${n}.png`,fullPage:w<500});};
const dsk=async(x,y)=>p.evaluate(([x,y])=>{const d=document.querySelector('#desk'),r=d.getBoundingClientRect(),W=parseFloat(d.style.width),H=parseFloat(d.style.height);return [r.left+x*r.width/W,r.top+y*r.height/H];},[x,y]);
const see=async y=>{if(w>=860)return;await p.evaluate(y=>{const sh=document.querySelector('#psheet'),d=document.querySelector('#desk');if(!sh||!d)return;const k=d.getBoundingClientRect().width/parseFloat(d.style.width);sh.scrollTop=Math.max(0,y*k-380);},y);await W(150);};
const drag=async(fx,fy,tx,ty,steps)=>{await see((fy+ty)/2);const a=await dsk(fx,fy),c=await dsk(tx,ty);await p.mouse.move(a[0],a[1]);await p.mouse.down();await p.mouse.move(a[0]+2,a[1]+2);await p.mouse.move((a[0]+c[0])/2,(a[1]+c[1])/2,{steps:steps||6});await p.mouse.move(c[0],c[1],{steps:steps||6});await W(420);await p.mouse.up();await W(380);};
const st=id=>p.evaluate(id=>JSON.parse(JSON.stringify(__dg.tdSt(id))),id);const msg=async()=>(await p.textContent('#dkMsg')).trim().slice(0,100);
const M=()=>p.evaluate(()=>JSON.parse(JSON.stringify(__dg.mtS())));const sel=async id=>{const d=await st(id);await see(d.y);await p.mouse.click(...(await dsk(d.x+20,d.y+20)));await W(250);};
const tab=async n=>{await p.click(`.tab[data-to="${n}"]`,{position:{x:20,y:12}});await W(1300);};const open=async k=>{await p.click(`[data-open="${k}"]`);await W(1000);};const close=async()=>{await p.click('#pclose');await W(600);};
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="malte"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);await p.click("#atlCard .ac-go");await W(3200);await p.click('#pclose');await W(600);
/* I · darkroom */
await p.click('#envbtn');await W(900);await p.click('#envlay');await W(1200);
let lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
let d=await st('pl1');await drag(d.x+30,d.y+30,lay.lb.x+40,lay.lb.y+60);console.log('light',await msg());
d=await st('pl4');await drag(d.x+30,d.y+30,lay.lb.x+lay.lb.w-200,lay.lb.y+60);console.log('cmp pl1/pl4',await msg());
d=await st('pl2');await drag(d.x+30,d.y+30,lay.lb.x+lay.lb.w-200,lay.lb.y+60);console.log('cmp pl1/pl2',await msg());
d=await st('pl4');await drag(d.x+30,d.y+30,lay.lb.x+lay.lb.w+90,lay.lb.y+lay.lb.h+120);
const lp=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.mtS().lp_lab)));let cur=[lp.x+95,lp.y+95];
d=await st('pl2');{const t=[d.x+110*d.s,d.y+160*d.s];await drag(cur[0],cur[1],t[0],t[1]);cur=t;await W(500);console.log('edge2',await msg());}
await sel('pl2');await p.click('#dkTools [data-a="mirror"]');await W(500);console.log('mirror',await msg(),JSON.stringify((await M()).mir),'solved',(await M()).labSolved);
d=await st('pl3');await sel('pl3');await p.click('#dkTools [data-a="flip"]');await W(400);console.log('flip3 sec',(await M()).sec);await p.click('#dkTools [data-a="flip"]');await W(300);
d=await st('pouch');await see(d.y);await p.mouse.click(...(await dsk(d.x+40,d.y+40)));await W(600);console.log('pouch',await msg());
d=await st('notes');await drag(d.x+30,d.y+30,lay.lb.x+lay.lb.w/2+40,lay.lb.y+lay.lb.h/2+40);console.log('notes',await msg());await shot('lab');await close();
/* II · temple */
await tab(2);await p.click('#mtRibbon');await W(600);await shot('old');await close();await open('temple');lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
const cx=lay.model.x+lay.model.s/2,cy=lay.model.y+lay.model.s/2,R=lay.model.s/2;
d=await st('lamp');{const az=60*Math.PI/180;const tx=cx+(R+60)*Math.sin(az)-38,ty=cy-(R+60)*Math.cos(az)-38;await drag(d.x+38,d.y+38,tx+38,ty+38);}console.log('lamp',await msg());
await sel('lamp');await p.$eval('#dkTools input[data-a="alt"]',e=>{e.value='20';e.dispatchEvent(new Event('input'))});await W(300);console.log('alt20',await msg());
// turntable: rotate from current axis to 90
{const a0=((await M()).axis);const ang=a=>(a-90)*Math.PI/180;const r=R*.9;const from=[cx+r*Math.cos(ang(a0)),cy+r*Math.sin(ang(a0))],to=[cx+r*Math.cos(ang(90)),cy+r*Math.sin(ang(90))];
 await see(from[1]);const A=await dsk(from[0],from[1]);await p.mouse.move(A[0],A[1]);await p.mouse.down();const n=16;for(let i=1;i<=n;i++){const a=a0+(90-a0)*i/n;const pt=await dsk(cx+r*Math.cos(ang(a)),cy+r*Math.sin(ang(a)));await p.mouse.move(pt[0],pt[1]);}await W(200);await p.mouse.up();await W(400);console.log('axis',(await M()).axis,await msg());}
console.log('first',JSON.stringify((await M()).first));await sel('lamp');await p.$eval('#dkTools input[data-a="alt"]',e=>{e.value='1';e.dispatchEvent(new Event('input'))});await W(300);console.log('alt1',await msg());
await p.click('#mtCtl [data-vp="court"]');await W(300);
{const lt=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.mtS().lp_temple)));const v=await st('tview');const t=[v.x+50,v.y+112];await drag(lt.x+95,lt.y+95,t[0],t[1]);await W(500);console.log('mark',await msg(),(await M()).sec);}
await shot('temple');await close();
/* III · horizon */
await tab(3);await open('horizon');lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));await p.click('#mtUnfold');await W(1200);
{const px=a=>lay.pano.x+(a-40)/100*lay.pano.w;const t=await st('tape');const want=px(60)-40*11;await drag(t.x+600,t.y+18,t.x+600+(want-t.x)+3,t.y+18,12);console.log('tape',await msg(),(await M()).hz.ok);
 const sg=await st('sight');await drag(sg.x+32,sg.y+48,px(60),lay.pano.y+lay.pano.h*.6);console.log('sight',await msg(),JSON.stringify(await st('sight')));
 const nt=await st('hnote');await see(nt.y);await p.mouse.click(...(await dsk(nt.x+30,nt.y+30)));await W(300);}
await shot('horizon');await close();
/* IV · sun */
await tab(4);await open('sun');lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
const mach=async(part,from,to,steps)=>{const s=lay.mach.s/520;const c=part==='wheel'?[lay.mach.x+130*s,lay.mach.y+400*s]:[lay.mach.x+260*s,lay.mach.y+230*s];const rad=part==='wheel'?70*s:172*s;const pt=a=>[c[0]+rad*Math.sin(a*Math.PI/180),c[1]-rad*Math.cos(a*Math.PI/180)];
  await see(pt(from)[1]);const A=await dsk(...pt(from));await p.mouse.move(A[0],A[1]);await p.mouse.down();const n=steps||12;for(let i=1;i<=n;i++){const a=from+(to-from)*i/n;const q=await dsk(...pt(a));await p.mouse.move(q[0],q[1]);}await W(150);await p.mouse.up();await W(400);};
console.log('impossible?',await msg());
await mach('wheel',0,359,30);console.log('swing',(await M()).obs.some(o=>o.id==='swing'),await msg());
{const m=await M();await mach('ring',m.ring,0);console.log('ring',(await M()).ring,await msg());}
{let m=await M();const dayA=d=>d/365*360;await mach('wheel',0,dayA(172)-dayA(m.day),24);m=await M();console.log('day',m.day,await msg());await p.click('#mtNote');await W(300);console.log('note1',await msg());
 await mach('wheel',0,dayA(263)-dayA(m.day),24);m=await M();await p.click('#mtNote');await W(300);console.log('note2',m.day,await msg());
 await mach('wheel',0,dayA(355)-dayA(m.day),24);m=await M();await p.click('#mtNote');await W(300);console.log('note3',m.day,await msg());
 for(let k=0;k<3;k++)await mach('wheel',0,359,30);console.log('turns',(await M()).sec,await msg());}
await shot('sun');await close();
/* V · surveyor */
await tab(5);await open('geo');lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
{const g=await st('gplan');await drag(g.x+100,g.y+20,g.x+100,g.y+200,8);console.log('hidden',await msg(),(await M()).sec);
 const G=await st('gplan');const O=await p.evaluate(G=>__dg.tdTf(G,__dg.MTGEO.O),G);
 const place=async(bear)=>{/* move the eye of the sight onto the observation point, then aim with the red handle */
  let s=await st('gsight');let org=await p.evaluate(s=>__dg.tdTf(s,[18,18]),s);await drag(org[0],org[1],org[0]+(O[0]-org[0]),org[1]+(O[1]-org[1]),6);
  s=await st('gsight');org=await p.evaluate(s=>__dg.tdTf(s,[18,18]),s);const h=await p.evaluate(s=>__dg.tdTf(s,[228,18]),s);const r=(bear-90)*Math.PI/180;const tgt=[org[0]+210*Math.cos(r),org[1]+210*Math.sin(r)];
  await see((h[1]+tgt[1])/2);const A=await dsk(h[0],h[1]),B=await dsk(tgt[0],tgt[1]);await p.mouse.move(A[0],A[1]);await p.mouse.down();await p.mouse.move(A[0]+2,A[1]+1);await p.mouse.move(B[0],B[1],{steps:8});await W(200);await p.mouse.up();await W(300);
  const s3=await st('gsight');console.log('aimed r',s3.r.toFixed(1));await p.click('#dkTools [data-a="read"]');await W(400);console.log('read',bear,await msg());};
 await place(57.6);await place(90.4);
 await sel('gcalque');const c=await st('gcalque');const org=await p.evaluate(c=>__dg.tdTf(c,[150,150]),c);await drag(c.x+40,c.y+40,c.x+40+(O[0]-org[0]),c.y+40+(O[1]-org[1]),6);console.log('calque',await msg());}
await shot('geo');await close();
/* VI · four mornings */
await tab(6);await open('final');lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
const machF=async(day)=>{const m=await M();const s=lay.mach.s/520;const c=[lay.mach.x+130*s,lay.mach.y+400*s],rad=70*s;const pt=a=>[c[0]+rad*Math.sin(a*Math.PI/180),c[1]-rad*Math.cos(a*Math.PI/180)];const from=0,to=(day-m.day)/365*360;
  await see(pt(from)[1]);const A=await dsk(...pt(from));await p.mouse.move(A[0],A[1]);await p.mouse.down();for(let i=1;i<=20;i++){const q=await dsk(...pt(from+to*i/20));await p.mouse.move(q[0],q[1]);}await W(150);await p.mouse.up();await W(400);};
const take=async(id,day,cam)=>{const d=await st(id);await drag(d.x+40,d.y+40,lay.frame.x+100,lay.frame.y+90);await machF(day);await p.click(`#fCtl [data-vp="${cam}"]`);await W(200);await p.click('#fTake');await W(500);console.log('take',id,day,cam,'→',await msg());};
await take('pl2',80,'court');await take('pl2',172,'door');await take('pl2',172,'court');await take('pl1',80,'door');await take('pl3',263,'court');await take('pl4',355,'court');
await shot('final');await W(2600);await shot('p6');await W(3500);await shot('p6b');
console.log('cur',await p.evaluate(()=>__dg.cur()),'reveal',(await M()).reveal);
await p.click('#skyFlip');await W(400);await p.click('#mtSir');await W(1000);lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
const slot=async(id,ch,i)=>{const r=await p.evaluate(([ch,i])=>{const el=document.querySelector(`#sb_${ch} .sslot[data-i="${i}"]`),b=document.querySelector('#desk').getBoundingClientRect(),rr=el.getBoundingClientRect(),k=parseFloat(document.querySelector('#desk').style.width)/b.width;return [(rr.left-b.left)*k+rr.width*k/2,(rr.top-b.top)*k+rr.height*k/2];},[ch,i]);const d=await st(id);await drag(d.x+20,d.y+20,r[0]-68+20,r[1]-30+20);console.log('slot',id,ch,i,await msg());};
await slot('c1','c1',0);await slot('c3','c1',1);await slot('c4','c1',2);await slot('c5','c1',3);await slot('c1b','c2',0);await slot('c2','c2',1);await slot('c8','c2',2);await slot('c7','c2',3);await slot('c6','c2',3);
await p.click('#sNeeds [data-need="n4"]');await W(200);await p.click('#sNeeds [data-need="n1"]');await W(200);await p.click('#sNeeds [data-need="n3"]');await W(300);console.log('sirius',await msg(),(await M()).sir.done);
await shot('sirius');await close();await shot('p6c');
const m=await M();console.log('obs',m.obs.map(o=>o.id).join(','));console.log('sec',m.sec.join(','));
console.log('log',await p.evaluate(()=>vestigesLog().map(x=>x.ev).join(',')));
console.log('errs',errs);await b.close();})();
