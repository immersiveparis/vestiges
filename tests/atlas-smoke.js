const {chromium}=require('playwright');const L=require('./lib');(async()=>{const [loc,w,h]=[process.argv[2]||'fr-FR',+(process.argv[3]||1440),+(process.argv[4]||900)];const tag=loc.slice(0,2)+w;
const b=await L.launch();
const p=await b.newPage({viewport:{width:w,height:h},hasTouch:w<500,isMobile:w<500});const errs=[];p.on('pageerror',e=>errs.push(e.message));await L.fonts(p);
await p.goto(L.URL+'/index.html?lang='+loc.slice(0,2));await p.waitForTimeout(800);
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await p.waitForTimeout(2800);
await p.screenshot({path:`atl-${tag}-0.png`,fullPage:w<500});
console.log('card',(await p.textContent('#atlCard')).replace(/\s+/g,' ').slice(0,90));
const pin=async id=>{const r=await p.$eval(`#atlMap .pin[data-case="${id}"] circle[fill="transparent"]`,e=>{const b=e.getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2]});return r;};
if(w>=500){const r=await pin('nanmadol');await p.mouse.move(r[0],r[1]);await p.waitForTimeout(400);await p.screenshot({path:`atl-${tag}-1.png`});
 const g=await pin('gobekli');await p.mouse.move(g[0],g[1]);await p.waitForTimeout(400);await p.screenshot({path:`atl-${tag}-2.png`});
 await p.mouse.move(5,5);await p.waitForTimeout(300);console.log('back',await p.$eval('#atlCard',e=>e.dataset.cur));
 const s=await pin('sacsay');await p.mouse.click(s[0],s[1]);}
else{await p.$eval('#atlMap .pin[data-case="nanmadol"]',e=>e.dispatchEvent(new MouseEvent('click',{bubbles:true})));await p.waitForTimeout(600);console.log('sel',await p.$eval('#atlCard',e=>e.dataset.cur));await p.screenshot({path:`atl-${tag}-1.png`});
 await p.$eval('#atlMap .pin[data-case="sacsay"]',e=>e.dispatchEvent(new MouseEvent('click',{bubbles:true})));await p.waitForTimeout(300);await p.click('#atlCard .ac-go');}
await p.waitForTimeout(3000);console.log('cur',await p.evaluate(()=>[...document.querySelectorAll('.spr')].filter(s=>!s.hidden).map(s=>s.dataset.n).join()));
console.log('errs',errs);await b.close();})();
