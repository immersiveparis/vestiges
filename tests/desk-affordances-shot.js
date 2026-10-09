const {chromium}=require('playwright');const L=require('./lib');(async()=>{const loc=process.argv[2]||'fr-FR',w=+(process.argv[3]||1440),h=+(process.argv[4]||900),tag=loc.slice(0,2)+w;
const b=await L.launch();const p=await b.newPage({viewport:{width:w,height:h},locale:loc,hasTouch:w<500});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await L.fonts(p);await p.goto(L.URL+'/index.html?lang='+loc.slice(0,2)+'&playtest=1');await p.waitForTimeout(800);const W=t=>p.waitForTimeout(t);
const dsk=async(x,y)=>p.evaluate(([x,y])=>{const d=document.querySelector('#desk'),r=d.getBoundingClientRect(),W=parseFloat(d.style.width),H=parseFloat(d.style.height);return [r.left+x*r.width/W,r.top+y*r.height/H];},[x,y]);
const st=id=>p.evaluate(id=>JSON.parse(JSON.stringify(__dg.tdSt(id))),id);
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="malte"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);await p.click("#atlCard .ac-go");await W(3200);await p.click('#pclose');await W(600);
await p.click('#envbtn');await W(900);await p.click('#envlay');await W(1200);
/* select plate 2, drag it toward the lightbox and stop mid-way to show the halo */
const d=await st('pl2');const a=await dsk(d.x+60,d.y+60);const lay=await p.evaluate(()=>JSON.parse(JSON.stringify(__dg.TD().lay)));const c=await dsk(lay.lb.x+lay.lb.w/2-50,lay.lb.y+lay.lb.h/2-40);
await p.mouse.move(a[0],a[1]);await p.mouse.down();await p.mouse.move(a[0]+3,a[1]+3);await p.mouse.move(c[0],c[1],{steps:10});await W(300);await p.screenshot({path:`${L.OUT}/td-${tag}-drag.png`});
await p.mouse.up();await W(500);await p.screenshot({path:`${L.OUT}/td-${tag}-sel.png`});
console.log('before undo',await st('pl2'));await p.click('#dkUndo');await W(500);console.log('after undo',await st('pl2'),'msg',(await p.textContent('#dkMsg')).trim().slice(0,60));await p.screenshot({path:`${L.OUT}/td-${tag}-undo.png`});
console.log('errs',errs);await b.close();})();
