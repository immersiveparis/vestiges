const {chromium}=require('playwright');const L=require('./lib');(async()=>{const loc=process.argv[2]||'fr-FR',w=+(process.argv[3]||1440),h=+(process.argv[4]||900),tag=loc.slice(0,2)+w;
const b=await L.launch();
const p=await b.newPage({viewport:{width:w,height:h},locale:loc,hasTouch:w<500});const errs=[];p.on('pageerror',e=>errs.push(e.message+' | '+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
await L.fonts(p);await p.goto(L.URL+'/index.html?lang='+loc.slice(0,2)+'&playtest=1');await p.waitForTimeout(900);
const W=t=>p.waitForTimeout(t);const shot=async n=>{const m=await p.evaluate(()=>[...document.querySelectorAll('.spr:not([hidden]) .page, #psheet:not([hidden]) .page')].map(e=>e.scrollHeight+'/'+e.clientHeight).join(' '));console.log('M',n,m);await p.screenshot({path:`${L.OUT}/dg-${tag}-${n}.png`,fullPage:w<500});};
const dsk=async(x,y)=>p.evaluate(([x,y])=>{const d=document.querySelector('#desk'),r=d.getBoundingClientRect(),W=parseFloat(d.style.width),H=parseFloat(d.style.height);return [r.left+x*r.width/W,r.top+y*r.height/H];},[x,y]);
const see=async y=>{if(w>=860)return;await p.evaluate(y=>{const sh=document.querySelector('#psheet'),d=document.querySelector('#desk');if(!sh||!d)return;const k=d.getBoundingClientRect().width/parseFloat(d.style.width);sh.scrollTop=Math.max(0,y*k-380);},y);await W(150);};
const drag=async(fx,fy,tx,ty,steps)=>{await see((fy+ty)/2);const a=await dsk(fx,fy),c=await dsk(tx,ty);await p.mouse.move(a[0],a[1]);await p.mouse.down();await p.mouse.move((a[0]+c[0])/2,(a[1]+c[1])/2,{steps:steps||6});await p.mouse.move(c[0],c[1],{steps:steps||6});await W(450);await p.mouse.up();await W(400);};
const st=id=>p.evaluate(id=>JSON.parse(JSON.stringify(__dg.tdSt(id))),id);const msg=async()=>(await p.textContent('#dkMsg')).trim().slice(0,90);
const state=()=>p.evaluate(()=>JSON.stringify(Object.assign(__dg.dgState(),{t:__dg.dgS().t,slot:__dg.dgS().slot,obs:__dg.dgS().obs.length})));
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="dogger"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);await p.click("#atlCard .ac-go");await W(3200);await p.click('#pclose');await W(600);
await p.click('#envbtn');await W(900);await p.click('#envlay');await W(1900);await shot('t0');
// 1. flip the bone
let d=await st('bone');{const pt=await dsk(d.x+60,d.y+40);await p.mouse.click(pt[0],pt[1]);await W(120);await p.mouse.click(pt[0],pt[1]);}await W(500);console.log('bone',await msg(),await p.evaluate(()=>__dg.tdSt('bone').f));
// 2. bone date sheet onto the band
d=await st('bdate');const lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));
await drag(d.x+40,d.y+30,lay.W/2,lay.band.y+20);console.log('band',await state(),'|',await msg());await shot('t1');
// 3. overlay: scale, rotate, place
await p.mouse.click(...(await dsk((await st('overlay')).x+150,(await st('overlay')).y+20)));await W(300);
{const cs0=(await st('chart')).s;await p.$eval('#dkTools input[data-a="s"]',(e,v)=>{e.value=v;e.dispatchEvent(new Event('input'))},(0.8125*cs0).toFixed(2));}
for(let k=0;k<6;k++){await p.click('#dkTools [data-a="rr"]');await W(60);}
let O=await st('overlay'),C=await st('chart');
const want=await p.evaluate(([C,O])=>{const DG=__dg;const tf=(d,p)=>{const a=d.r*Math.PI/180;return [d.x+(p[0]*Math.cos(a)-p[1]*Math.sin(a))*d.s,d.y+(p[0]*Math.sin(a)+p[1]*Math.cos(a))*d.s];};const a=tf(C,DG.dgChPt(DG.DGLM.A)),oa=DG.dgOvPt(DG.DGLM.A),ar=O.r*Math.PI/180;return [a[0]-(oa[0]*Math.cos(ar)-oa[1]*Math.sin(ar))*O.s,a[1]-(oa[0]*Math.sin(ar)+oa[1]*Math.cos(ar))*O.s];},[C,O]);
console.log('overlay now',O.x,O.y,O.r,O.s,'want',want.map(v=>v.toFixed(1)));
const grab=[O.x+20,O.y+20];await drag(grab[0],grab[1],grab[0]+(want[0]-O.x)+5,grab[1]+(want[1]-O.y)-4,10);
console.log('geo',await state(),'|',await msg());await shot('t2');
// 4. core page
await p.click('#pclose');await W(700);await p.click('.spr[data-n="2"] .dogear.next');await W(1400);await p.click('#openCore');await W(900);
const core=await st('core');const tags={s_osl:0.70,s_shell:0.80,s_mud:1.10,s_peat:1.60};
const cs=core.s;for(const id of ['s_shell','s_peat','s_mud','s_osl']){const sd=await st(id);const ty=core.y+(30+tags[id]*290)*cs;await drag(sd.x+30,sd.y+30,core.x+90*cs,ty-(56*sd.s-30));console.log(id,await msg());}
await shot('c1');
// loupe on rework, mud, peat
const lp=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.dgS().clp)));let cur=[lp.x+70,lp.y+70];
for(const [k,x,y] of [['rework',90,262],['mud',90,370],['peat',90,490],['six',90,205]]){const t=[core.x+x*cs,core.y+y*cs];await drag(cur[0],cur[1],t[0],t[1]);cur=t;await W(500);console.log('lens',k,await msg());}
await shot('c2');
// wrong attach test: drag s_osl to depth 1.5 → bounce
{const sd=await st('s_osl');await drag(sd.x+20,sd.y+20,core.x+90*cs,core.y+(30+1.5*290)*cs-(56*sd.s-20));console.log('wrong',await msg());}
{const sd=await st('s_osl');await drag(sd.x+20,sd.y+20,core.x+90*cs,core.y+(30+0.7*290)*cs-(56*sd.s-20));console.log('re',await msg());}
// 5. back to table, wrong sheet then right sheet in slot
await p.click('#pclose');await W(700);await p.click('.tab[data-to="2"]');await W(1400);await p.click('#openTable');await W(1200);await shot('t3');
let sh=await st('s_shell');await drag(sh.x+30,sh.y+30,lay.slot.x+lay.slot.w/2-(75*sh.s-30),lay.slot.y+lay.slot.h/2-(56*sh.s-30));console.log('shell',await state(),'|',await msg());await shot('t4');
let mu=await st('s_mud');await drag(mu.x+30,mu.y+30,lay.slot.x+lay.slot.w/2-(75*mu.s-30),lay.slot.y+lay.slot.h/2-(56*mu.s-30));console.log('mud',await state(),'|',await msg());await shot('t5');
await W(3200);await shot('land');await W(3200);await shot('land2');
console.log('cur',await p.evaluate(()=>__dg.cur()));
await p.click('#cmpb button[data-t="13500"]');await W(400);await shot('land3');
console.log('log',await p.evaluate(()=>vestigesLog().map(x=>x.ev).join(',')));
console.log('errs',errs);await b.close();})();
