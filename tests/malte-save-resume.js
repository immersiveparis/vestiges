const {chromium}=require('playwright');const L=require('./lib');(async()=>{const loc=process.argv[2]||'fr-FR',w=+(process.argv[3]||1440),h=+(process.argv[4]||900);
const b=await L.launch();const ctx=await b.newContext({viewport:{width:w,height:h},locale:loc,hasTouch:w<500});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await L.fonts(p);const url=L.URL+'/index.html?lang='+loc.slice(0,2)+'&playtest=1';await p.goto(url);await p.waitForTimeout(800);const W=t=>p.waitForTimeout(t);
const openCase=async()=>{await p.$eval(`#atlMap [data-site="malte"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);const lbl=await p.textContent('#atlCard .ac-go');await p.click("#atlCard .ac-go");await W(3000);if(await p.$('#pclose:not([hidden])'))await p.click('#pclose').catch(()=>{});await W(500);return lbl.trim();};
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
console.log('first open label:',await openCase());
/* play a bit: solve the darkroom via state + save, go to page 3, open horizon, move a doc */
await p.evaluate(()=>{const m=__dg.mtS();m.labSolved=true;m.mir.pl2=0;m.obs.push({id:'mirrored'},{id:'threeLights'});m.sec.push('s1');m.hints.lab=2;});
await p.click('.tab[data-to="3"]',{position:{x:20,y:12}});await W(1300);await p.click('[data-open="horizon"]');await W(1000);
await p.evaluate(()=>{const d=__dg.tdSt('sight');d.x=333;d.y=222;});await p.click('#pclose');await W(600);
await p.click('.tab[data-to="2"]',{position:{x:20,y:12}});await W(1300);
const before=await p.evaluate(()=>{const m=__dg.mtS();return {cur:__dg.cur(),lab:m.labSolved,obs:m.obs.map(o=>o.id),sec:m.sec,hints:m.hints,sight:m.lp.horizon&&m.lp.horizon.sight||(m.poses&&m.poses.horizon),raw:Object.keys(m)};});
console.log('before reload',JSON.stringify({cur:before.cur,lab:before.lab,obs:before.obs,sec:before.sec,hints:before.hints}));
const saved=await p.evaluate(()=>{const o=JSON.parse(localStorage.getItem('ghn-save-malte'));return {cur:o.cur,hasMt:!!o.mt,obs:o.mt&&o.mt.obs.length,poses:o.mt&&o.mt.poses?Object.keys(o.mt.poses):Object.keys(o.mt).filter(k=>/pose|lp|docs/.test(k))};});console.log('saved',JSON.stringify(saved));
/* reload */
await p.reload();await W(900);await p.evaluate(()=>{document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
console.log('resume label:',await openCase());
const after=await p.evaluate(()=>{const m=__dg.mtS();return {cur:__dg.cur(),lab:m.labSolved,obs:m.obs.map(o=>o.id),sec:m.sec,hints:m.hints,mir:m.mir.pl2};});
console.log('after reload',JSON.stringify(after));
await p.click('[data-open="temple"]');await W(1000);console.log('desk opens after resume:',!!(await p.$('#desk')),'tdSt model',JSON.stringify(await p.evaluate(()=>__dg.tdSt('model'))));await p.click('#pclose');await W(500);
await p.click('.tab[data-to="3"]',{position:{x:20,y:12}});await W(1300);await p.click('[data-open="horizon"]');await W(1000);console.log('sight pose restored',JSON.stringify(await p.evaluate(()=>{const d=__dg.tdSt('sight');return [d.x,d.y];})));await p.click('#pclose');await W(500);
/* reset via Rejouer */
await p.click('.tab[data-to="6"]',{position:{x:20,y:12}});await W(1300);await p.click('#mtReplay');await W(2500);
const reset=await p.evaluate(()=>{const m=__dg.mtS();return {cur:__dg.cur(),lab:m.labSolved,obs:m.obs.length,sec:m.sec.length,mir:m.mir.pl2,save:localStorage.getItem('ghn-save-malte')?JSON.parse(localStorage.getItem('ghn-save-malte')).mt.obs.length:'none'};});console.log('after replay',JSON.stringify(reset));
await p.screenshot({path:L.OUT+'/mtsave-'+loc.slice(0,2)+w+'.png'});
console.log('errs',errs);await b.close();})();
