const {chromium}=require('playwright');const L=require('./lib');(async()=>{const loc=process.argv[2]||'fr-FR',w=+(process.argv[3]||1440),h=+(process.argv[4]||900),tag=loc.slice(0,2)+w;
const b=await L.launch();const p=await b.newPage({viewport:{width:w,height:h},locale:loc,hasTouch:w<500});
await L.fonts(p);await p.goto(L.URL+'/index.html?lang='+loc.slice(0,2)+'&playtest=1');await p.waitForTimeout(800);const W=t=>p.waitForTimeout(t);
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="malte"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);await p.click("#atlCard .ac-go");await W(3200);await p.click('#pclose');await W(600);
const m=await p.evaluate(()=>[...document.querySelectorAll('.spr:not([hidden]) .page')].map(e=>e.scrollHeight+'/'+e.clientHeight).join(' '));console.log('M p1',m);
await p.screenshot({path:`${L.OUT}/p1-${tag}.png`});
await p.click('#envbtn');await W(900);await p.click('#envlay');await W(1200);await p.screenshot({path:`${L.OUT}/p1-${tag}-lab.png`});
for(const n of [2,3,4,5]){await p.click('.tab[data-to="'+n+'"]',{position:{x:20,y:12}});await W(1300);const m=await p.evaluate(()=>[...document.querySelectorAll('.spr:not([hidden]) .page')].map(e=>e.scrollHeight+'/'+e.clientHeight).join(' '));console.log('M p'+n,m);await p.screenshot({path:`${L.OUT}/p${n}-${tag}.png`});}
await b.close();})();
