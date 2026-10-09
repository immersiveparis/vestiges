const {chromium}=require('playwright');const L=require('./lib');
(async()=>{const loc=process.argv[2]||'fr-FR',w=+(process.argv[3]||1440),h=+(process.argv[4]||900),tag=loc.slice(0,2)+w;
const b=await L.launch();
const p=await b.newPage({viewport:{width:w,height:h},locale:loc,hasTouch:w<500});const errs=[];p.on('pageerror',e=>errs.push(e.message+' | '+(e.stack||'').split('\n')[1]));
await L.fonts(p);await p.goto(L.URL+'/index.html?lang='+loc.slice(0,2)+'&playtest=1');await p.waitForTimeout(900);
const W=t=>p.waitForTimeout(t);const shot=async n=>{const m=await p.evaluate(()=>[...document.querySelectorAll('.spr:not([hidden]) .page, #psheet:not([hidden]) .page')].map(e=>e.scrollHeight+'/'+e.clientHeight).join(' '));console.log('M',n,m);await p.screenshot({path:`${L.OUT}/v3-${tag}-${n}.png`});};
const dsk=async(x,y)=>p.evaluate(([x,y])=>{const d=document.querySelector('#desk'),r=d.getBoundingClientRect(),W=parseFloat(d.style.width),H=parseFloat(d.style.height);return [r.left+x*r.width/W,r.top+y*r.height/H];},[x,y]);
const st=()=>p.evaluate(()=>window.__st&&window.__st());
const drag=async(fx,fy,tx,ty)=>{const a=await dsk(fx,fy),c=await dsk(tx,ty);await p.mouse.move(a[0],a[1]);await p.mouse.down();await p.mouse.move((a[0]+c[0])/2,(a[1]+c[1])/2,{steps:6});await p.mouse.move(c[0],c[1],{steps:6});await W(500);await p.mouse.up();await W(400);};
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="sacsay"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await p.waitForTimeout(300);await p.click("#atlCard .ac-go");await W(3200);await p.click('#pclose');await W(500);
await p.click('.spr[data-n="1"] .dogear.next');await W(1300);
await p.click('#openDesk');await W(900);await shot('desk0');
const lay=await p.evaluate(()=>JSON.parse(JSON.stringify({W:parseFloat(document.querySelector('#desk').style.width)})));const wide=lay.W>1000;
const P=wide?{face:[30,66],coupe:[440,76],lit:[260,360],calque:[820,380]}:{face:[20,70],coupe:[40,360],lit:[90,660],calque:[300,980]};
const lp0=wide?[1180-170,690-170]:[700-170,1180-170];
// loupe -> face 'tight' (local 196.7,90.4)
let tgt=[P.face[0]+196.7,P.face[1]+90.4];await drag(lp0[0]+70,lp0[1]+70,tgt[0],tgt[1]);console.log('msg1',await p.textContent('#dkMsg'));
// loupe -> face 'pits' (690,330 nat -> 273.1,130.9)
let cur=tgt;tgt=[P.face[0]+273.1,P.face[1]+130.9];await drag(cur[0],cur[1],tgt[0],tgt[1]);console.log('msg2',await p.textContent('#dkMsg'));
// loupe -> coupe 'void' (360,200 nat -> 228,126.3)
cur=tgt;tgt=[P.coupe[0]+228,P.coupe[1]+126.3];await drag(cur[0],cur[1],tgt[0],tgt[1]);await W(2200);console.log('msg3',(await p.textContent('#dkMsg')).slice(0,60));await shot('desk1');
// move loupe away
cur=tgt;await drag(cur[0],cur[1],wide?1100:640,wide?640:1120);
// calque: select, scale 2, rotate 0
await p.mouse.click(...(await dsk(P.calque[0]+60,P.calque[1]+40)));await W(300);
await p.$eval('#dkTools input[data-a="s"]',e=>{e.value='2';e.dispatchEvent(new Event('input'))});
for(let k=0;k<5;k++){await p.click('#dkTools [data-a="rl"]');await W(60);}
// now calque at P.calque with s=2,r=-1? compute where its face0 is vs lit face0
const geo=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('ghn-save-sacsay')||'{}');return s.desk;});console.log('calque',JSON.stringify(geo&&geo.calque));
const C=geo.calque,L=geo.lit||{x:P.lit[0],y:P.lit[1],r:0,s:1};
const target=[L.x+40*L.s,L.y+250*L.s],cf=[C.x+20*C.s*Math.cos(C.r*Math.PI/180)-125*C.s*Math.sin(C.r*Math.PI/180),C.y+20*C.s*Math.sin(C.r*Math.PI/180)+125*C.s*Math.cos(C.r*Math.PI/180)];
const grab=[C.x+60,C.y+40];await drag(grab[0],grab[1],grab[0]+(target[0]-cf[0]),grab[1]+(target[1]-cf[1]));await W(900);
console.log('ov',(await p.textContent('#dkMsg')).slice(0,60));await shot('desk2');
await p.click('#pclose');await W(700);await shot('2');
await p.click('.spr[data-n="2"] .dogear.next');await W(1300);await p.click('.spr[data-n="3"] .dogear.next');await W(1300);await shot('4a');
for(let k=0;k<40;k++){await p.click('#poseBtn');await W(420);const s2=await p.evaluate(()=>({l:document.querySelector('#liftBtn').disabled,p:document.querySelector('#poseBtn').disabled}));if(s2.l&&s2.p)break;
  const xs=await p.evaluate(()=>{const c=document.querySelector('#ateCv');const x=c.getContext('2d');const d=x.getImageData(0,0,c.width,c.height).data;const cols=new Set();for(let y=0;y<c.height;y+=2)for(let i=0;i<c.width;i+=2){const o=(y*c.width+i)*4;if(d[o]>150&&d[o+1]<70&&d[o+2]<70)cols.add(Math.round(i/20)*20);}return [...cols];});
  await p.click('#liftBtn');await W(420);const rr=await p.$eval('#ateCv',c=>{const b=c.getBoundingClientRect();return {l:b.left,t:b.top,s:b.width/c.width}});
  for(const x of xs.sort((a,b)=>a-b).filter((x,i,a)=>i===0||x-a[i-1]>60)) await p.mouse.click(rr.l+x*rr.s, rr.t+300*rr.s);}
console.log('atelier',await p.textContent('#amsg'));await shot('4');
// back to desk: re-read the bevel (330,420 nat -> 130.6,166.6)
await p.click('.tab[data-to="2"]');await W(1400);await p.click('#openDesk');await W(900);
const lpS=await p.evaluate(()=>JSON.parse(localStorage.getItem('ghn-save-sacsay')).lp);
await drag(lpS.x+70,lpS.y+70,P.face[0]+130.6,P.face[1]+166.6);console.log('bevel',await p.textContent('#dkMsg'));await shot('desk3');
await p.click('#pclose');await W(600);
await p.click('.tab[data-to="5"]');await W(1400);await shot('5a');
await p.click('.cc >> nth=1');await p.click('#present');await W(300);console.log('err1',await p.textContent('#dMsg'));
await p.click('.cc >> nth=0');
const pin=async(id,v)=>{const i=await p.evaluate(id=>['tight','pits','void','band','jband','jfull','bevel','pizarro','fawcett','chron'].filter(x=>true).indexOf(id),id);await p.click(`#pins .pcard >> nth=${i} >> button[data-v="${v}"]`);await W(80);};
await pin('fawcett','sup');await p.click('#present');await W(300);console.log('err2',await p.textContent('#dMsg'));await pin('fawcett','sup');
for(const id of ['band','jband','tight','bevel'])await pin(id,'sup');await pin('chron','lim');
await p.click('#present');await W(900);console.log('ok',await p.textContent('#dMsg'));await shot('5b');
await p.click('.spr[data-n="5"] .dogear.next');await W(1400);await shot('6');
const log=await p.evaluate(()=>window.vestigesLog().map(e=>e.ev).join(','));console.log('log',log.slice(0,400));
console.log('errs',errs);await b.close();})();
