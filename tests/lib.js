/* shared helpers for the Playwright runs: browser, base URL, output folder, optional local fonts */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const OUT=process.env.VESTIGES_OUT||path.join(__dirname,'out');fs.mkdirSync(OUT,{recursive:true});
const BASE=process.env.VESTIGES_URL||'http://localhost:8765';
async function launch(){const o={};if(process.env.PW_CHROMIUM)o.executablePath=process.env.PW_CHROMIUM;return chromium.launch(o);}
/* offline runs: VESTIGES_FONTS=/path/to/fonts (a fonts.css plus the woff2 files) replaces Google Fonts; otherwise the page loads them from the network */
async function fonts(p){const dir=process.env.VESTIGES_FONTS;if(!dir)return;const css=fs.readFileSync(path.join(dir,'fonts.css'),'utf8');
 await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({status:200,contentType:'text/css',body:css,headers:{'access-control-allow-origin':'*'}}));
 await p.route('https://fonts.gstatic.com/**',r=>r.abort());
 await p.route('http://fontlocal.test/**',r=>{const f=path.join(dir,decodeURIComponent(new (globalThis.URL)(r.request().url()).pathname));try{r.fulfill({status:200,contentType:f.endsWith('woff2')?'font/woff2':'font/woff',body:fs.readFileSync(f),headers:{'access-control-allow-origin':'*'}});}catch(e){r.abort();}});}
module.exports={OUT,URL:BASE,launch,fonts};
