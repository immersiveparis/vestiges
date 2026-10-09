const {chromium}=require('playwright');const L=require('./lib');(async()=>{const loc='fr-FR',w=1440,h=900;
const b=await L.launch();const p=await b.newPage({viewport:{width:w,height:h},locale:loc});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await L.fonts(p);await p.goto(L.URL+'/index.html?lang=fr&playtest=1');await p.waitForTimeout(800);const W=t=>p.waitForTimeout(t);
const dsk=async(x,y)=>p.evaluate(([x,y])=>{const d=document.querySelector('#desk'),r=d.getBoundingClientRect(),W=parseFloat(d.style.width),H=parseFloat(d.style.height);return [r.left+x*r.width/W,r.top+y*r.height/H];},[x,y]);
const st=id=>p.evaluate(id=>JSON.parse(JSON.stringify(__dg.tdSt(id))),id);
await p.evaluate(()=>{localStorage.clear();document.querySelector('#intro').hidden=true;});await p.click('#cover');await W(2600);
await p.$eval(`#atlMap [data-site="dogger"]`,e=>e.dispatchEvent(new MouseEvent("click",{bubbles:true})));await W(300);await p.click("#atlCard .ac-go");await W(3200);await p.click('#pclose');await W(600);
await p.screenshot({path:L.OUT+'/dg2-p1.png'});
await p.click('#envbtn');await W(900);await p.click('#envlay');await W(1600);
/* drag the overlay near the right place but not exactly, to show the links */
const o=await st('overlay');const c=await st('chart');
const target=await p.evaluate(()=>{const C=__dg.tdSt('chart');return __dg.tdTf(C,__dg.dgChPt(__dg.DGLM.A));});
const oa=await p.evaluate(()=>{const O=__dg.tdSt('overlay');return __dg.tdTf(O,__dg.dgOvPt(__dg.DGLM.A));});
const a=await dsk(o.x+40,o.y+40),d2=await dsk(o.x+40+(target[0]-oa[0])+30,o.y+40+(target[1]-oa[1])+25);
await p.mouse.move(a[0],a[1]);await p.mouse.down();await p.mouse.move(a[0]+2,a[1]+2);await p.mouse.move(d2[0],d2[1],{steps:10});await W(300);await p.screenshot({path:L.OUT+'/dg2-align.png'});await p.mouse.up();await W(400);
await p.click('#pclose');await W(600);await p.click('.tab[data-to="2"]');await W(1200);await p.screenshot({path:L.OUT+'/dg2-p2.png'});
console.log(errs);await b.close();})();
