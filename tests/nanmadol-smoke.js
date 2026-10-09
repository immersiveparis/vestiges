const {chromium}=require('playwright');const L=require('./lib');(async()=>{const b=await L.launch();
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
await L.fonts(p);await p.goto(L.URL+'/index.html?lang=fr');await p.waitForTimeout(800);
const W=t=>p.waitForTimeout(t);const shot=async n=>{const m=await p.evaluate(()=>[...document.querySelectorAll('.spr:not([hidden]) .page, #psheet:not([hidden]) .page')].map(e=>e.scrollHeight+'/'+e.clientHeight).join(' '));console.log('M',n,m);await p.screenshot({path:`${L.OUT}/nm-${n}.png`});};
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="nanmadol"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);await p.click("#atlCard .ac-go");await W(3000);if(await p.$('#pclose:not([hidden])')){await p.click('#pclose').catch(()=>{});await W(500);}
await shot('1');await p.click('.spr[data-n="1"] .dogear.next');await W(1300);
const n=await p.$$eval('.spr:not([hidden]) .hot',x=>x.length);for(let i=0;i<n;i++){await p.click(`.spr:not([hidden]) .hot >> nth=${i}`);await W(200);await p.click('#paste');await W(700);}
await shot('2');await p.click('.spr[data-n="2"] .dogear.next');await W(1300);await p.click('.obj >> nth=0');await W(300);await p.click('.obj >> nth=3');await W(500);await shot('3');
await p.click('.spr[data-n="3"] .dogear.next');await W(1300);await shot('4');
await p.click('#mUnder');await p.$eval('#logs',(e,v)=>{e.value=v;e.dispatchEvent(new Event('input'))},'14');for(let k=0;k<12;k++){await p.click('#goRaft');await W(3300);const ok=await p.$eval('.spr[data-n="4"] .dogear.next',e=>!e.hidden);if(ok)break;}
await shot('4b');await p.click('.spr[data-n="4"] .dogear.next');await W(1300);await shot('5');
console.log('errs',errs);await b.close();})();
