// ===== EDIT YOUR TEXTS HERE =====
const CFG = {
  search: "Love you chinni paapu 🩵",
  code: "9",
  birthday: "2026-12-09T00:00:00",
  photos: [
    {src:"photos/1.jpg", t:"babyy", d:"my favourite person"},
    {src:"photos/2.jpg", t:"sweety", d:"that smile 🥹"},
    {src:"photos/3.jpg", t:"hotty", d:"how are you real"},
    {src:"photos/4.jpg", t:"cutie", d:"stop being this cute"},
    {src:"photos/5.jpg", t:"i love you 😘", d:"always and forever"}
  ],
  reasons: [
    "I don't have reason to love you i love you without any reson babee ",
    "Youuu queeny ",
    "Youuuuuuuuu babyy youu😜",
    "U",
    "You",
    "Youuuuuuuuuuuuuuuuuu🩷",
    "Youuuuuuuu"
  ],
  letter: "Hyy birday gurlll\n\nAdvance happiest birthday my gubulu 🌍\n\nYour eyes make my soul calm, your voice makes my heart calm, you make me calm.\n\nI love youuuuuuuu ❤️",
};
// =================================

const $=s=>document.querySelector(s);
const saved=new Set();
let pins=[];

function buildPins(){
  const p=[];
  p.push({cat:"Birthday",html:`<div class="pin card c1"><div class="ico">🎂</div><div class="big" style="font-size:21px;overflow-wrap:anywhere">Advance happiest birthday<br>babyyyyyyy</div><div class="tag">From your hubby</div></div>`,open:()=>`<h2>🎂 Advance happiest birthday babyyyyyyy</h2><p>From your hubby 🩷</p>`});
  p.push({cat:"Birthday",html:`<div class="pin card c3"><div class="ico">⏳</div><div class="big" id="miniCount">--</div><div class="tag">days to your birthday</div></div>`,open:()=>`<h2>⏳ Countdown to 9 Dec</h2><div class="big-count" id="bigCount"></div><p style="margin-top:12px">Advance happiest birthday goluuuu ♥️</p>`});
  CFG.photos.forEach((ph,i)=>p.push({cat:"Us",html:`<div class="pin"><img src="${ph.src}" loading="lazy" onerror="this.parentNode.style.display='none'"><div class="cap">${ph.t}<small>Saved from Duduu's heart</small></div></div>`,open:()=>`<img src="${ph.src}"><h2>${ph.t}</h2><p>${ph.d}</p>`}));
  p.push({cat:"Reasons",html:`<div class="pin card c2"><div class="ico">💌</div><div class="big">Reasons I love you</div><div class="tag">tap to open</div></div>`,open:()=>`<h2>💌 Reasons I love you</h2>`+CFG.reasons.map(r=>`<div class="reason">${r}</div>`).join("")});
  p.push({cat:"Letter",html:`<div class="pin card c4"><div class="ico">✉️</div><div class="big">A letter for you</div><div class="tag">open when you're ready</div></div>`,open:()=>`<h2>✉️ For my babyy</h2><p>${CFG.letter}</p>`});
  p.push({cat:"Birthday",html:`<div class="pin card c6"><div class="ico">🎁</div><div class="big">Wish board</div><div class="tag">make a wish</div></div>`,open:()=>`<h2>🎁 Make a wish</h2><p>Close your eyes, make a wish, then tap Save. I'll make it come true. 🥹</p>`});
  p.push({cat:"Birthday",html:`<div class="pin card c5"><div class="ico">🎟️</div><div class="big" style="font-size:24px">Scratch me</div><div class="tag">a surprise is hiding</div></div>`,open:()=>`<h2>🎟️ Scratch to reveal</h2><div class="scratch"><div class="scr-msg">Surprise! 🎉<br>You scratched your way to my heart.<br>I choose you today, tomorrow<br>and every birthday ahead 🩷</div><canvas id="scr"></canvas></div>`,after:()=>{
    const c=document.getElementById("scr");if(!c)return;
    const w=c.parentNode.offsetWidth,h=c.parentNode.offsetHeight;
    c.width=w;c.height=h;
    const x=c.getContext("2d");
    const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,"#ff8fa3");g.addColorStop(1,"#e60023");
    x.fillStyle=g;x.fillRect(0,0,w,h);
    x.fillStyle="rgba(255,255,255,.9)";x.font="700 20px sans-serif";x.textAlign="center";
    x.fillText("Scratch here 🩷",w/2,h/2+7);
    x.globalCompositeOperation="destination-out";
    let down=false,done=false;
    const pos=e=>{const r=c.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return[t.clientX-r.left,t.clientY-r.top]};
    const check=()=>{const d=x.getImageData(0,0,w,h).data;let n=0;for(let i=3;i<d.length;i+=64)if(d[i]===0)n++;if(n/(d.length/64)>0.5){done=true;c.style.transition="opacity .6s";c.style.opacity=0;setTimeout(()=>c.remove(),700);}};
    const move=e=>{if(!down||done)return;e.preventDefault();const[a,b]=pos(e);x.beginPath();x.arc(a,b,26,0,7);x.fill();check();};
    c.addEventListener("touchstart",e=>{down=true;move(e)},{passive:false});
    c.addEventListener("touchmove",move,{passive:false});
    c.addEventListener("touchend",()=>down=false);
    c.addEventListener("mousedown",e=>{down=true;move(e)});
    c.addEventListener("mousemove",move);
    window.addEventListener("mouseup",()=>down=false);
  }});
  p.push({cat:"Letter",html:`<div class="pin card c3"><div class="ico">✨</div><div class="big" style="font-size:22px">The end of the surprise,<br>the start of your new life</div><div class="tag">tap to open</div></div>`,open:()=>`<h2>✨ A new beginning</h2><p>This is the end of the surprise, but the start of your new life, your new beginning. I hope all your dreams come true. 🩷

Love youu 🩷

- Your husband</p>`});
  return p;
}

function renderTabs(){
  const cats=["All","Birthday","Us","Reasons","Letter"];
  $("#tabs").innerHTML=cats.map((c,i)=>`<button class="tab ${i?'':'on'}" data-c="${c}">${c}</button>`).join("");
  document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("on"));
    b.classList.add("on");renderBoard(b.dataset.c);
  });
}
function renderBoard(cat="All"){
  const list=pins.filter(x=>cat==="All"||x.cat===cat);
  $("#board").innerHTML=list.map((x,i)=>x.html.replace('class="pin',`style="animation-delay:${i*70}ms" class="pin`)).join("");
  document.querySelectorAll("#board > .pin").forEach((el,i)=>el.onclick=()=>openPin(list[i]));
  tick();
}
let current=null;
function openPin(p){
  current=p;
  $("#modalBody").innerHTML=p.open();
  $("#save").classList.remove("done");$("#save").textContent="❤️ Save";
  $("#savedCount").textContent=saved.size?`${saved.size} saved`:"";
  $("#modal").classList.remove("hidden");tick();if(p.after)p.after();
}
$("#close").onclick=()=>$("#modal").classList.add("hidden");
$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.add("hidden")};
$("#save").onclick=e=>{
  saved.add(current);$("#save").textContent="✓ Saved to Bubuu's board";$("#save").classList.add("done");
  $("#savedCount").textContent=`${saved.size} saved`;
  const r=e.target.getBoundingClientRect();
  for(let i=0;i<8;i++){const h=document.createElement("div");h.className="heart";h.textContent=["❤️","🩷","💕"][i%3];
    h.style.left=(r.left+Math.random()*r.width)+"px";h.style.top=r.top+"px";h.style.animationDelay=(i*80)+"ms";
    document.body.appendChild(h);setTimeout(()=>h.remove(),1800);}
};
function tick(){
  const d=new Date(CFG.birthday)-new Date();
  const left=Math.max(0,d);
  const D=Math.floor(left/864e5),H=Math.floor(left/36e5)%24,M=Math.floor(left/6e4)%60,S=Math.floor(left/1e3)%60;
  const m=$("#miniCount");if(m)m.textContent=D;
  const b=$("#bigCount");if(b)b.innerHTML=[[D,"days"],[H,"hrs"],[M,"min"],[S,"sec"]].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
}
setInterval(tick,1000);

function unlock(){
  $("#lock").classList.add("hidden");$("#app").classList.remove("hidden");
  $("#searchTxt").textContent=CFG.search;
  pins=buildPins();renderTabs();renderBoard();
}
$("#code").oninput=e=>{
  if(e.target.value===CFG.code)unlock();
  else if(e.target.value){$("#err").textContent="Wrong code 😜";e.target.value="";}
};
$("#mic").onclick=()=>{
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){$("#err").textContent="Voice not supported, use the code";return;}
  const r=new SR();r.lang="en-IN";
  r.onresult=e=>{const t=e.results[0][0].transcript.toLowerCase();
    if(t.includes("love you")||t.includes("i love"))unlock();
    else $("#err").textContent="I heard \""+t+"\" 😜 try again";};
  r.onerror=()=>$("#err").textContent="Mic problem, use the code";
  r.start();$("#err").textContent="Listening... 👂";
};

// ===== intro page =====
(function(){
  const num=$("#num"), no=$("#no");
  let n=0;
  const iv=setInterval(()=>{
    n++; num.textContent=n;
    if(n>=18){
      clearInterval(iv);
      num.parentNode.classList.add("pop");
      setTimeout(()=>$("#t1").classList.add("show"),400);
      setTimeout(()=>$("#t2").classList.add("show"),1500);
      setTimeout(()=>$("#btns").classList.add("show"),2400);
    }
  },130);
  $("#yes").onclick=()=>{
    $("#intro").classList.add("hidden");
    no.classList.add("hidden");
    unlock();
  };
  no.addEventListener("click",e=>{
    e.preventDefault();
    if(no.parentNode!==document.body){document.body.appendChild(no);no.style.position="fixed";}
    const w=no.offsetWidth,h=no.offsetHeight;
    no.style.left=(10+Math.random()*(innerWidth-w-20))+"px";
    no.style.top=(10+Math.random()*(innerHeight-h-20))+"px";
  });
})();
