/* ============================================================
   KASHTON'S GRIDIRON — game.js  (PART 1 of 2)
   Paste PART 1 then PART 2 back-to-back into game.js.
   PART 2 begins exactly where this ends (after the App hooks).
   ============================================================ */
const {useState,useEffect,useCallback}=React;
const ROSTER_URL="players.json";
const CAP=100000000;
function val(r,p){const b={myth:40000,legendary:8000,ultra:3500,epic:1500,rare:300,common:50};return Math.round((b[r]||50)*p)}
function salary(c){return c.value*1000}
function mp(v){return Math.round(v*2.5)}
const RC={
 myth:{label:"LEGEND",bg:"linear-gradient(135deg,#0a0012,#1a0533,#6b21a8,#a855f7,#fbbf24,#a855f7,#1a0533)",border:"#f0abfc",glow:"#e879f9"},
 legendary:{label:"LEGENDARY",bg:"linear-gradient(150deg,#78350f,#b45309,#f59e0b,#fde68a)",border:"#FFB800",glow:"#FFB800"},
 ultra:{label:"ULTRA RARE",bg:"linear-gradient(150deg,#164e1a,#15803d,#4ade80,#bbf7d0)",border:"#4ade80",glow:"#22c55e"},
 epic:{label:"EPIC",bg:"linear-gradient(150deg,#3b0764,#7e22ce,#c084fc)",border:"#C084FC",glow:"#A855F7"},
 rare:{label:"RARE",bg:"linear-gradient(150deg,#1e3a5f,#2563eb,#93c5fd)",border:"#60A5FA",glow:"#3B82F6"},
 common:{label:"COMMON",bg:"linear-gradient(150deg,#1f2937,#374151,#6b7280)",border:"#9CA3AF",glow:"#6B7280"}
};
const RO={myth:0,legendary:1,ultra:2,epic:3,rare:4,common:5};
const TS={ARI:"ari",ATL:"atl",BAL:"bal",BUF:"buf",CAR:"car",CHI:"chi",CIN:"cin",CLE:"cle",DAL:"dal",DEN:"den",DET:"det",GB:"gb",HOU:"hou",IND:"ind",JAX:"jax",KC:"kc",LV:"lv",LAC:"lac",LAR:"lar",MIA:"mia",MIN:"min",NE:"ne",NO:"no",NYG:"nyg",NYJ:"nyj",PHI:"phi",PIT:"pit",SF:"sf",SEA:"sea",TB:"tb",TEN:"ten",WAS:"wsh"};
function logo(t){const s=TS[t];return s?"https://a.espncdn.com/i/teamlogos/nfl/500/"+s+".png":null}
function TeamArt({team,size,glow}){const[ok,setOk]=useState(true);const u=logo(team);if(!u||!ok)return React.createElement("span",{style:{fontSize:size,filter:"drop-shadow(0 0 "+glow+")"}},"🏈");return React.createElement("img",{src:u,alt:"",onError:()=>setOk(false),style:{width:size*1.6,height:size*1.6,objectFit:"contain",filter:"drop-shadow(0 0 "+glow+")"}})}
const LS=[
 {id:"QB1",label:"QB",pos:["QB"],icon:"🏈"},{id:"RB1",label:"RB1",pos:["RB"],icon:"💨"},{id:"RB2",label:"RB2",pos:["RB"],icon:"💨"},
 {id:"WR1",label:"WR1",pos:["WR"],icon:"⚡"},{id:"WR2",label:"WR2",pos:["WR"],icon:"⚡"},{id:"WR3",label:"WR3",pos:["WR"],icon:"⚡"},
 {id:"TE1",label:"TE",pos:["TE"],icon:"🎯"},{id:"FLEX",label:"FLEX",pos:["RB","WR","TE"],icon:"🔄"},{id:"OT1",label:"OT",pos:["OT","G","C"],icon:"💪"},
 {id:"DE1",label:"DE1",pos:["DE","LB"],icon:"🛡️"},{id:"DE2",label:"DE2",pos:["DE","LB"],icon:"🛡️"},{id:"DT1",label:"DT",pos:["DT","DE"],icon:"🦾"},
 {id:"LB1",label:"LB1",pos:["LB"],icon:"🔥"},{id:"LB2",label:"LB2",pos:["LB"],icon:"🔥"},
 {id:"CB1",label:"CB1",pos:["CB"],icon:"🔒"},{id:"CB2",label:"CB2",pos:["CB"],icon:"🔒"},
 {id:"S1",label:"S1",pos:["S","CB"],icon:"👁️"},{id:"S2",label:"S2",pos:["S","CB"],icon:"👁️"},{id:"K1",label:"K",pos:["K"],icon:"🦵"}
];
const PT=[
 {id:"starter",name:"Starter Pack",emoji:"🏈",cost:0,desc:"Beginner pack",color:"#6B7280",border:"#9CA3AF",rates:[{r:"rare",c:.45},{r:"common",c:1}],n:5},
 {id:"standard",name:"NFL Pack",emoji:"🏈",cost:500,desc:"5 cards mixed",color:"#FFB800",border:"#FFB800",rates:[{r:"legendary",c:.01},{r:"ultra",c:.04},{r:"epic",c:.13},{r:"rare",c:.45},{r:"common",c:1}],n:5},
 {id:"gold",name:"Gold Pack",emoji:"🥇",cost:1200,desc:"Guaranteed Rare+",color:"#f59e0b",border:"#FFB800",rates:[{r:"legendary",c:.03},{r:"ultra",c:.10},{r:"epic",c:.28},{r:"rare",c:1}],n:5},
 {id:"elite",name:"Elite Pack",emoji:"💎",cost:2500,desc:"Guaranteed Epic+",color:"#a855f7",border:"#C084FC",rates:[{r:"legendary",c:.06},{r:"ultra",c:.20},{r:"epic",c:1}],n:5},
 {id:"ultimate",name:"Ultimate Pack",emoji:"👑",cost:5000,desc:"Guaranteed Ultra+",color:"#f59e0b",border:"#4ade80",rates:[{r:"myth",c:.01},{r:"legendary",c:.12},{r:"ultra",c:1}],n:5},
 {id:"legend",name:"Legends Pack",emoji:"⭐",cost:2500,desc:"1 guaranteed Legend",color:"#e879f9",border:"#f0abfc",rates:[{r:"myth",c:.25},{r:"legendary",c:.45},{r:"ultra",c:.70},{r:"epic",c:1}],n:5,lg:true},
 {id:"mega",name:"Mega Pack",emoji:"🎰",cost:3500,desc:"12 cards mixed!",color:"#fb923c",border:"#fdba74",rates:[{r:"legendary",c:.04},{r:"ultra",c:.14},{r:"epic",c:.32},{r:"rare",c:.68},{r:"common",c:1}],n:12}
];
const CHAL=[
 {id:"std",name:"Standard",desc:"Full $100M cap",cap:CAP,maxOvr:99},
 {id:"budget",name:"Budget",desc:"$80M cap",cap:80000000,maxOvr:99},
 {id:"underdog",name:"Underdog",desc:"No player above 90 OVR",cap:CAP,maxOvr:90},
 {id:"shoestring",name:"Shoestring",desc:"$60M cap, max 93 OVR",cap:60000000,maxOvr:93}
];
const SEASON=[
 {wk:1,opp:"Practice Squad",tgt:1500,reward:600},{wk:2,opp:"Backup Brigade",tgt:1560,reward:700},
 {wk:3,opp:"Wild Card Wolves",tgt:1620,reward:850},{wk:4,opp:"Division Rivals",tgt:1680,reward:1000},
 {wk:5,opp:"Playoff Hopefuls",tgt:1730,reward:1200},{wk:6,opp:"Conference Kings",tgt:1780,reward:1500},
 {wk:7,opp:"All-Pro Squad",tgt:1820,reward:1800},{wk:8,opp:"Hall of Famers",tgt:1860,reward:2200},
 {wk:9,opp:"Dream Team",tgt:1900,reward:2800},{wk:10,opp:"THE GOATS",tgt:1950,reward:4000}
];
const ACH=[
 {id:"first_pack",name:"First Rip",desc:"Open your first pack",coins:200},
 {id:"first_legend",name:"Legend Hunter",desc:"Pull a LEGEND card",coins:1000},
 {id:"got_99",name:"Perfect Specimen",desc:"Own a 99 OVR player",coins:1500},
 {id:"coll_10",name:"Getting Started",desc:"Own 10% of all players",coins:500},
 {id:"coll_25",name:"Serious Collector",desc:"Own 25% of all players",coins:1500},
 {id:"coll_50",name:"Hall of Fame Curator",desc:"Own 50% of all players",coins:4000},
 {id:"legal_team",name:"Cap Wizard",desc:"Field a legal lineup",coins:800},
 {id:"stack3",name:"Team Chemistry",desc:"3+ starters from one team",coins:1000},
 {id:"season_w1",name:"Season Opener",desc:"Win a season game",coins:600},
 {id:"season_w5",name:"Playoff Bound",desc:"Win 5 season games",coins:2000},
 {id:"season_champ",name:"CHAMPION",desc:"Beat THE GOATS (Week 10)",coins:6000},
 {id:"streak7",name:"Dedicated GM",desc:"7-day login streak",coins:2500}
];
function eP(p){let r=p.rarity;if(r==="epic"&&p.prestige>=1.5)r="ultra";const v=val(r,p.prestige);return{...p,rarity:r,value:v,marketPrice:mp(v),ovr:p.ovr||70,uid:p.name+p.team}}
function eL(p){const v=val("myth",p.prestige);return{...p,rarity:"myth",value:v,marketPrice:mp(v),ovr:p.ovr||95,uid:p.name+p.team+"L"}}
function fmt(n){if(n>=1e6)return(n/1e6).toFixed(1)+"M";if(n>=1e3)return(n/1e3).toFixed(n%1e3===0?0:1)+"K";return String(n)}
function fmtSal(n){if(n>=1e6)return"$"+(n/1e6).toFixed(1)+"M";if(n>=1e3)return"$"+(n/1e3).toFixed(0)+"K";return"$"+n}
function grade(s,m){const p=m?s/m:0;if(p>=.95)return["A+","#4ade80"];if(p>=.88)return["A","#4ade80"];if(p>=.80)return["B","#a3e635"];if(p>=.70)return["C","#FFB800"];if(p>=.55)return["D","#fb923c"];return["F","#ef4444"]}
function today(){return new Date().toISOString().slice(0,10)}
function daysBetween(a,b){return Math.round((new Date(b)-new Date(a))/86400000)}
const SK="kashton-gridiron-v1";
const DS={coins:8000,pi:{starter:3,standard:0,gold:0,elite:0,ultimate:0,legend:1,mega:0},col:[],lu:{},chal:"std",lastClaim:"",streak:0,seasonWk:1,seasonWins:0,ach:[]};

function Card({card,rev,onClick,sz,badge}){
 sz=sz||"md";const c=RC[card.rarity]||RC.common;
 const im=card.rarity==="myth",il=card.rarity==="legendary",iu=card.rarity==="ultra",ie=card.rarity==="epic",ir=card.rarity==="rare";
 const w=sz==="sm"?118:148,h=sz==="sm"?180:230;
 const ga=im?"gM":il?"gL":iu?"gU":ie?"gE":ir?"gR":"none";
 return React.createElement("div",{onClick,style:{width:w,flexShrink:0,cursor:onClick?"pointer":"default"}},
  React.createElement("div",{style:{width:"100%",height:h,borderRadius:12,overflow:"hidden",position:"relative",background:rev?c.bg:"linear-gradient(140deg,#0d1117,#161b22,#0d1117)",border:"2px solid "+(rev?c.border:"#21262d"),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"8px 8px 9px",animation:rev?"cFlip .4s ease both,"+ga+" 2.2s ease-in-out .5s infinite":"bP 2.8s ease-in-out infinite"}},
   !rev&&React.createElement("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}},React.createElement("div",{style:{fontSize:36}},"🏈"),React.createElement("div",{style:{fontSize:7,letterSpacing:3,color:"#3d4451"}},"TAP TO REVEAL")),
   rev&&React.createElement(React.Fragment,null,
    (im||il||iu)&&React.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,.18) 50%,transparent 65%)",backgroundSize:"300% 100%",animation:"shimmer 2.2s linear infinite"}}),
    React.createElement("div",{style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:1}},
     React.createElement("div",{style:{fontSize:6,letterSpacing:1.5,fontWeight:700,padding:"2px 5px",borderRadius:3,color:im?"#000":"#fff",background:im?"linear-gradient(90deg,#f59e0b,#e879f9,#60A5FA)":c.glow,animation:im?"rb 4s linear infinite":"none"}},c.label),
     React.createElement("div",{style:{fontSize:14,fontWeight:700,color:im?"#fde68a":c.border,lineHeight:1}},card.ovr,React.createElement("span",{style:{fontSize:6,opacity:.7}}," OVR"))),
    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},im?React.createElement("span",{style:{fontSize:26,filter:"drop-shadow(0 0 16px "+c.glow+")"}},"⭐"):React.createElement(TeamArt,{team:card.team,size:sz==="sm"?20:24,glow:(il?12:8)+"px "+c.glow})),
    React.createElement("div",{style:{textAlign:"center",width:"100%",zIndex:1}},
     React.createElement("div",{style:{fontSize:card.name.length>18?(sz==="sm"?7:8.5):card.name.length>14?(sz==="sm"?8:10):(sz==="sm"?10:12),fontWeight:700,color:im?"#fde68a":"#F1F5F9",lineHeight:1.15}},card.name),
     React.createElement("div",{style:{fontSize:7,color:c.border+"cc",letterSpacing:2,marginTop:1}},card.pos+" · "+card.team)),
    React.createElement("div",{style:{marginTop:2,padding:"3px 8px",borderRadius:14,background:"rgba(0,0,0,.4)",border:"1px solid "+c.border+"44",fontSize:sz==="sm"?9:10,fontWeight:700,color:"#fde68a"}},fmtSal(salary(card))),
    badge&&React.createElement("div",{style:{position:"absolute",top:4,right:4,background:badge.bg,borderRadius:10,padding:"2px 6px",fontSize:7,color:"#fff",letterSpacing:1}},badge.text)
   )
  )
 );
}
function Slot({slot,card,onClick}){
 const c=card?RC[card.rarity]||RC.common:null;
 return React.createElement("div",{onClick:()=>onClick(slot),style:{width:90,height:118,borderRadius:10,cursor:"pointer",border:"1.5px solid "+(c?c.border+"77":"#21262d"),background:c?c.bg:"rgba(255,255,255,.02)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0}},
  card?React.createElement(React.Fragment,null,
   React.createElement("div",{style:{fontSize:6,color:c.border}},"OVR "+card.ovr),
   React.createElement("div",null,card.rarity==="myth"?React.createElement("span",{style:{fontSize:20}},"⭐"):React.createElement(TeamArt,{team:card.team,size:16,glow:"6px "+c.glow})),
   React.createElement("div",{style:{fontSize:card.name.length>14?7:8.5,fontWeight:700,color:"#F1F5F9",textAlign:"center",lineHeight:1.2,padding:"0 4px"}},card.name),
   React.createElement("div",{style:{fontSize:7,color:c.border+"cc"}},slot.label+" · "+fmtSal(salary(card)))
  ):React.createElement(React.Fragment,null,
   React.createElement("div",{style:{fontSize:20,opacity:.3}},slot.icon),
   React.createElement("div",{style:{fontSize:9,color:"#374151",letterSpacing:2}},slot.label),
   React.createElement("div",{style:{fontSize:7,color:"#21262d"}},"EMPTY")
  )
 );
}

function App(){
 /* ===== ALL HOOKS FIRST — never conditional, never after a return ===== */
 const[ALL,setALL]=useState(null);
 const[err,setErr]=useState(null);
 const[coins,setCoins]=useState(DS.coins);
 const[pi,setPi]=useState(DS.pi);
 const[col,setCol]=useState(DS.col);
 const[lu,setLu]=useState(DS.lu);
 const[chal,setChal]=useState("std");
 const[lastClaim,setLastClaim]=useState("");
 const[streak,setStreak]=useState(0);
 const[seasonWk,setSeasonWk]=useState(1);
 const[seasonWins,setSeasonWins]=useState(0);
 const[ach,setAch]=useState([]);
 const[scr,setScr]=useState("home");
 const[oc,setOc]=useState([]);
 const[rev,setRev]=useState([]);
 const[allR,setAllR]=useState(false);
 const[toast,setToast]=useState(null);
 const[sortBy,setSortBy]=useState("ovr");
 const[filterR,setFilterR]=useState("all");
 const[sellMode,setSellMode]=useState(false);
 const[mf,setMf]=useState("all");
 const[msq,setMsq]=useState("");
 const[lp,setLp]=useState(null);
 const[apt,setApt]=useState("standard");
 const[shk,setShk]=useState(false);
 const[loaded,setLoaded]=useState(false);
 const[tradeOut,setTradeOut]=useState([]);
 const[tradeCash,setTradeCash]=useState(0);
 const[tradeCode,setTradeCode]=useState("");
 const[importCode,setImportCode]=useState("");
 const[cmpA,setCmpA]=useState("");
 const[cmpB,setCmpB]=useState("");
 const unlock=useCallback((id)=>{setAch(prev=>{if(prev.indexOf(id)>=0)return prev;const a=ACH.find(x=>x.id===id);if(a){setCoins(c=>c+a.coins);setTimeout(()=>{setToast({m:"🏆 "+a.name+" · +🪙"+fmt(a.coins),c:"#fbbf24"});setTimeout(()=>setToast(null),2600)},300)}return prev.concat([id])})},[]);
 useEffect(()=>{fetch(ROSTER_URL).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(d=>{setALL([].concat((d.active||[]).map(eP),(d.legends||[]).map(eL)))}).catch(e=>setErr(e.message))},[]);
 useEffect(()=>{try{const r=localStorage.getItem(SK);if(r){const s=JSON.parse(r);setCoins(s.coins==null?DS.coins:s.coins);setPi(s.pi||DS.pi);setCol(s.col||[]);setLu(s.lu||{});setChal(s.chal||"std");setLastClaim(s.lastClaim||"");setStreak(s.streak||0);setSeasonWk(s.seasonWk||1);setSeasonWins(s.seasonWins||0);setAch(s.ach||[])}}catch(e){}setLoaded(true)},[]);
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem(SK,JSON.stringify({coins,pi,col,lu,chal,lastClaim,streak,seasonWk,seasonWins,ach}))}catch(e){}},[coins,pi,col,lu,chal,lastClaim,streak,seasonWk,seasonWins,ach,loaded]);
 // achievement-watch effects (always run; guarded internally)
 const CHx=CHAL.find(c=>c.id===chal)||CHAL[0];
 const fX=LS.map(sl=>lu[sl.id]?col.find(x=>x.uid===lu[sl.id]):null).filter(Boolean);
 const capX=fX.reduce((s,c)=>s+salary(c),0);
 const tcX={};fX.forEach(c=>{tcX[c.team]=(tcX[c.team]||0)+1});
 const stackX=fX.length?Math.max.apply(null,Object.keys(tcX).map(k=>tcX[k])):0;
 const legalX=fX.length===LS.length&&capX<=CHx.cap;
 const ownX=new Set(col.map(c=>c.name+c.team)).size;
 const totX=ALL?new Set(ALL.map(c=>c.name+c.team)).size:0;
 const pctX=totX?Math.round(ownX/totX*100):0;
 useEffect(()=>{if(legalX)unlock("legal_team");if(stackX>=3)unlock("stack3")},[legalX,stackX,unlock]);
 useEffect(()=>{if(pctX>=10)unlock("coll_10");if(pctX>=25)unlock("coll_25");if(pctX>=50)unlock("coll_50")},[pctX,unlock]);
 /* ===== END OF HOOKS — PART 2 CONTINUES FROM HERE ===== *//* ============================================================
   PART 2 of 2 — paste this DIRECTLY AFTER Part 1
   (right where Part 1 ends, after the "END OF HOOKS" comment)
   ============================================================ */

 const sT=(m,c)=>{setToast({m:m,c:c||"#FFB800"});setTimeout(()=>setToast(null),2600)};
 const CH=CHAL.find(c=>c.id===chal)||CHAL[0];
 const A2=ALL||[];

 const PL={myth:A2.filter(c=>c.rarity==="myth"),legendary:A2.filter(c=>c.rarity==="legendary"),ultra:A2.filter(c=>c.rarity==="ultra"),epic:A2.filter(c=>c.rarity==="epic"),rare:A2.filter(c=>c.rarity==="rare"),common:A2.filter(c=>c.rarity==="common")};
 const roll=(rates)=>{const r=Math.random();for(let i=0;i<rates.length;i++){const x=rates[i];if(r<x.c){const p=PL[x.r];if(p&&p.length)return p[Math.floor(Math.random()*p.length)]}}const p=PL.common.length?PL.common:A2;return p[Math.floor(Math.random()*p.length)]};
 const rollPack=(id)=>{const p=PT.find(x=>x.id===id);if(!p)return[];const c=[];if(p.lg&&PL.myth.length)c.push(Object.assign({},PL.myth[Math.floor(Math.random()*PL.myth.length)],{uid:Math.random()}));for(let i=c.length;i<p.n;i++)c.push(Object.assign({},roll(p.rates),{uid:Math.random()}));return c};
 const openPack=(id)=>{if((pi[id]||0)<1){sT("No packs!","#ef4444");return}setPi(Object.assign({},pi,{[id]:(pi[id]||0)-1}));setOc(rollPack(id));setRev([]);setAllR(false);setApt(id);setShk(true);setScr("opening");setTimeout(()=>setShk(false),1100);unlock("first_pack")};
 const buyPack=(id)=>{const p=PT.find(x=>x.id===id);if(!p||!p.cost)return;if(coins<p.cost){sT("Not enough coins!","#ef4444");return}setCoins(coins-p.cost);setPi(Object.assign({},pi,{[id]:(pi[id]||0)+1}));sT(p.name+" added! 📦",p.color)};
 const revCard=(i)=>{if(rev.indexOf(i)>=0)return;const n=rev.concat([i]);setRev(n);if(oc[i].rarity==="myth")unlock("first_legend");if(oc[i].ovr>=99)unlock("got_99");if(n.length===oc.length)setTimeout(()=>setAllR(true),600)};
 const revAll=()=>{oc.forEach((_,i)=>setTimeout(()=>{setRev(r=>r.indexOf(i)>=0?r:r.concat([i]));if(oc[i].rarity==="myth")unlock("first_legend");if(oc[i].ovr>=99)unlock("got_99")},i*160));setTimeout(()=>setAllR(true),oc.length*160+600)};
 const collect=()=>{setCol(col.concat(oc.map(x=>Object.assign({},x,{uid:x.uid||Math.random()}))));setOc([]);setRev([]);setAllR(false);setScr("home")};
 const sellCard=(uid)=>{const c=col.find(x=>x.uid===uid);if(!c)return;const nlu=Object.assign({},lu);Object.keys(nlu).forEach(k=>{if(nlu[k]===uid)delete nlu[k]});setLu(nlu);setCoins(coins+c.value);setCol(col.filter(y=>y.uid!==uid));sT("Sold "+c.name+" · 🪙"+fmt(c.value),RC[c.rarity]?RC[c.rarity].border:"#FFB800")};
 const buyMkt=(card)=>{if(coins<card.marketPrice){sT("Not enough coins!","#ef4444");return}setCoins(coins-card.marketPrice);setCol(col.concat([Object.assign({},card,{uid:Math.random()})]));sT("Bought "+card.name+"!",RC[card.rarity]?RC[card.rarity].border:"#FFB800")};
 const slotClick=(s)=>{setLp(s);setScr("pick")};
 const assign=(uid)=>{if(!lp)return;const c=col.find(x=>x.uid===uid);if(!c)return;if(c.ovr>CH.maxOvr){sT("Player over OVR limit ("+CH.maxOvr+")","#ef4444");return}const nlu=Object.assign({},lu);Object.keys(nlu).forEach(k=>{if(nlu[k]===uid)delete nlu[k]});nlu[lp.id]=uid;let used=0;LS.forEach(sl=>{const u=nlu[sl.id];if(u){const cc=col.find(x=>x.uid===u);if(cc)used+=salary(cc)}});if(used>CH.cap){sT("Over the cap! "+fmtSal(used)+" / "+fmtSal(CH.cap),"#ef4444");return}setLu(nlu);setLp(null);setScr("lineup")};
 const clearSlot=(id)=>{const nlu=Object.assign({},lu);delete nlu[id];setLu(nlu)};

 const makeTradeCode=()=>{const o=tradeOut.map(u=>{const c=col.find(x=>x.uid===u);return c?{n:c.name,t:c.team,p:c.pos,r:c.rarity,pr:c.prestige,ov:c.ovr}:null}).filter(Boolean);return btoa(JSON.stringify({give:o,cash:tradeCash}))};
 const proposeTrade=()=>{if(!tradeOut.length&&!tradeCash){sT("Add cards or cash first","#ef4444");return}setTradeCode(makeTradeCode());sT("Trade code generated — send it!","#4ade80")};
 const acceptTrade=()=>{try{const d=JSON.parse(atob(importCode.trim()));const got=(d.give||[]).map(x=>({name:x.n,team:x.t,pos:x.p,rarity:x.r,prestige:x.pr,ovr:x.ov,value:val(x.r,x.pr),marketPrice:mp(val(x.r,x.pr)),uid:Math.random()}));setCol(col.concat(got));sT("Received "+got.length+" card(s)!","#4ade80");setImportCode("")}catch(e){sT("Invalid trade code","#ef4444")}};
 const lineupCode=()=>{const o=LS.map(sl=>{const u=lu[sl.id];if(!u)return null;const c=col.find(x=>x.uid===u);return c?{s:sl.id,ov:c.ovr,n:c.name,t:c.team}:null}).filter(Boolean);return btoa(JSON.stringify(o))};
 const decodeLineup=(code)=>{try{const a=JSON.parse(atob(code.trim()));const base=a.reduce((s,x)=>s+x.ov,0);const tc={};a.forEach(x=>{tc[x.t]=(tc[x.t]||0)+1});const ch=Object.keys(tc).reduce((s,k)=>s+(tc[k]>=3?(tc[k]-2)*5:0),0);return{n:a.length,score:base+ch,base:base,chem:ch}}catch(e){return null}};

 const claimable=lastClaim!==today();
 const nextReward=400+((lastClaim&&daysBetween(lastClaim,today())===1?streak+1:1))*150;
 const claimDaily=()=>{const t=today();let ns=1;if(lastClaim){const d=daysBetween(lastClaim,t);if(d===0){sT("Already claimed today","#ef4444");return}else if(d===1)ns=streak+1;else ns=1}const reward=400+ns*150;setCoins(coins+reward);setStreak(ns);setLastClaim(t);sT("Day "+ns+" · +🪙"+fmt(reward),"#fbbf24");if(ns%5===0){setPi(Object.assign({},pi,{gold:(pi.gold||0)+1}));setTimeout(()=>sT("🎁 Bonus Gold Pack!","#FFB800"),900)}if(ns>=7)unlock("streak7")};

 const sc=col.slice().sort((a,b)=>sortBy==="ovr"?b.ovr-a.ovr:sortBy==="rarity"?RO[a.rarity]-RO[b.rarity]||b.ovr-a.ovr:sortBy==="sal"?salary(b)-salary(a):sortBy==="team"?a.team.localeCompare(b.team):a.pos.localeCompare(b.pos));
 const fc=filterR==="all"?sc:filterR==="legend"?sc.filter(c=>c.rarity==="myth"):sc.filter(c=>c.rarity===filterR);
 const luCards=LS.map(sl=>({sl:sl,c:lu[sl.id]?col.find(x=>x.uid===lu[sl.id]):null}));
 const filled=luCards.filter(x=>x.c);
 const capUsed=filled.reduce((s,x)=>s+salary(x.c),0);
 const baseScore=filled.reduce((s,x)=>s+x.c.ovr,0);
 const teamCount={};filled.forEach(x=>{teamCount[x.c.team]=(teamCount[x.c.team]||0)+1});
 const chemBonus=Object.keys(teamCount).reduce((s,k)=>s+(teamCount[k]>=3?(teamCount[k]-2)*5:0),0);
 const teamScore=baseScore+chemBonus;
 const maxPossible=LS.length*99;
 const gr=grade(teamScore,maxPossible);const gL=gr[0],gC=gr[1];
 const legal=filled.length===LS.length&&capUsed<=CH.cap;
 const rc=col.reduce((a,c)=>{a[c.rarity]=(a[c.rarity]||0)+1;return a},{});
 const uniqueOwned=new Set(col.map(c=>c.name+c.team)).size;
 const totalPlayers=A2.length?new Set(A2.map(c=>c.name+c.team)).size:0;
 const collPct=totalPlayers?Math.round(uniqueOwned/totalPlayers*100):0;
 const mkC=A2.filter(c=>{if(mf!=="all"&&c.rarity!==mf)return false;if(msq&&c.name.toLowerCase().indexOf(msq.toLowerCase())<0&&c.team.toLowerCase().indexOf(msq.toLowerCase())<0)return false;return true}).sort((a,b)=>b.ovr-a.ovr);
 const elig=lp?col.filter(c=>lp.pos.indexOf(c.pos)>=0&&c.ovr<=CH.maxOvr).sort((a,b)=>b.ovr-a.ovr):[];
 const pt=PT.find(p=>p.id===apt)||PT[1];
 const curWeek=SEASON.find(w=>w.wk===seasonWk);
 const playSeason=()=>{if(!legal){sT("Need a legal lineup first!","#ef4444");return}if(!curWeek){sT("Season complete! 🏆","#fbbf24");return}if(teamScore>=curWeek.tgt){setCoins(coins+curWeek.reward);setSeasonWins(seasonWins+1);unlock("season_w1");if(seasonWins+1>=5)unlock("season_w5");if(seasonWk>=10)unlock("season_champ");if(seasonWk<10)setSeasonWk(seasonWk+1);sT("WIN! "+teamScore+" beat "+curWeek.tgt+" · +🪙"+fmt(curWeek.reward),"#4ade80")}else{sT("LOSS. Need "+curWeek.tgt+", had "+teamScore+". Rebuild!","#ef4444")}};
 const resetSeason=()=>{setSeasonWk(1);setSeasonWins(0);sT("Season reset","#FFB800")};
 const NAV=[{id:"home",l:"PACKS",i:"📦"},{id:"binder",l:"BINDER",i:"📂"},{id:"lineup",l:"TEAM",i:"🏟️"},{id:"season",l:"SEASON",i:"🏆"},{id:"market",l:"MARKET",i:"🏪"},{id:"trade",l:"TRADE",i:"🔄"},{id:"vs",l:"VS",i:"⚔️"},{id:"more",l:"MORE",i:"📊"}];

 // ---- RENDER (single return; loading/error handled inside) ----
 if(err)return React.createElement("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,padding:24,textAlign:"center",background:"#000308"}},React.createElement("div",{style:{fontSize:18,color:"#ef4444",letterSpacing:2}},"COULD NOT LOAD ROSTER"),React.createElement("div",{style:{fontSize:12,color:"#9CA3AF",maxWidth:420}},"Needs players.json + game.js + logo.png next to index.html. Error: "+err));
 if(!ALL||!loaded)return React.createElement("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,background:"#000308"}},React.createElement("img",{src:"logo.png",alt:"Kashton's Gridiron",onError:e=>{e.target.style.display="none"},style:{width:"min(70vw,360px)",height:"auto",animation:"bP 2s ease-in-out infinite"}}),React.createElement("div",{style:{color:"#ef4444",letterSpacing:4,fontSize:14}},"LOADING…"));

 return React.createElement("div",{style:{minHeight:"100vh",background:"radial-gradient(ellipse at 15% 10%,#1a0800 0%,#05050f 50%,#000308 100%)",position:"relative",overflowX:"hidden"}},
  toast&&React.createElement("div",{style:{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",zIndex:200,background:"rgba(0,0,0,.96)",border:"1px solid "+toast.c+"55",borderRadius:12,padding:"11px 22px",fontSize:12,letterSpacing:1.5,color:toast.c,boxShadow:"0 0 18px "+toast.c+"44",animation:"tI .3s ease both",whiteSpace:"nowrap"}},toast.m),
  React.createElement("div",{style:{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(3,4,10,.94)",backdropFilter:"blur(14px)",borderBottom:"1px solid #FFB80020",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 16px"}},
   React.createElement("div",{style:{display:"flex",alignItems:"center",gap:9}},React.createElement("img",{src:"logo.png",alt:"Kashton's Gridiron",onError:e=>{e.target.style.display="none"},style:{height:38,width:"auto",filter:"drop-shadow(0 0 8px #ef444455)"}})),
   React.createElement("div",{style:{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",background:"rgba(255,184,0,.1)",border:"1px solid #FFB80044",borderRadius:18}},React.createElement("span",{style:{fontSize:12}},"🪙"),React.createElement("span",{style:{fontSize:13,fontWeight:700,color:"#FFB800"}},fmt(coins)))),
  React.createElement("div",{style:{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"rgba(3,4,10,.96)",backdropFilter:"blur(14px)",borderTop:"1px solid #21262d",display:"flex",justifyContent:"space-around",padding:"8px 0 10px",overflowX:"auto"}},
   NAV.map(n=>React.createElement("button",{key:n.id,onClick:()=>setScr(n.id),style:{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"4px 8px",color:scr===n.id?"#FFB800":"#374151"}},React.createElement("span",{style:{fontSize:17}},n.i),React.createElement("span",{style:{fontSize:7,letterSpacing:1}},n.l)))),
  React.createElement("div",{style:{paddingTop:54,paddingBottom:66,minHeight:"100vh"}},

   scr==="home"&&React.createElement("div",{style:{padding:"18px 16px",maxWidth:900,margin:"0 auto"}},
    React.createElement("div",{style:{background:claimable?"linear-gradient(135deg,#78350f,#FFB80033)":"rgba(255,255,255,.03)",border:"1px solid "+(claimable?"#FFB800":"#21262d"),borderRadius:14,padding:14,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}},
     React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"#FFB800",letterSpacing:2}},"🔥 DAILY STREAK: "+streak+" DAY"+(streak===1?"":"S")),React.createElement("div",{style:{fontSize:9,color:"#9CA3AF",marginTop:3}},claimable?"Claim today's reward — every 5th day = bonus pack!":"Come back tomorrow to keep your streak alive")),
     React.createElement("button",{onClick:claimDaily,disabled:!claimable,style:{background:claimable?"linear-gradient(135deg,#92400e,#fbbf24)":"#0d1117",border:"none",borderRadius:10,color:claimable?"#000":"#374151",padding:"10px 22px",fontSize:12,fontWeight:700,letterSpacing:2,cursor:claimable?"pointer":"not-allowed"}},claimable?"CLAIM 🪙"+fmt(nextReward):"CLAIMED ✓")),
    React.createElement("div",{style:{marginBottom:14,textAlign:"center"}},React.createElement("div",{style:{fontSize:11,letterSpacing:4,color:"#374151"}},"PACK SHOP · "+A2.length+" PLAYERS")),
    React.createElement("div",{style:{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}},
     PT.map(p=>{const co=(pi[p.id]||0)>0,cb=coins>=p.cost;return React.createElement("div",{key:p.id,style:{background:"rgba(255,255,255,.03)",border:"1px solid "+p.border+"44",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:10,minWidth:200,maxWidth:240}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},React.createElement("div",{style:{fontSize:32}},p.emoji),React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:700,color:p.color,letterSpacing:2}},p.name),React.createElement("div",{style:{fontSize:10,color:"#4a5568",marginTop:2}},p.desc))),
      React.createElement("div",{style:{display:"flex",gap:8,alignItems:"center"}},p.cost>0&&React.createElement("div",{style:{fontSize:11,color:"#FFB800"}},"🪙 "+fmt(p.cost)),(pi[p.id]||0)>0&&React.createElement("div",{style:{fontSize:10,color:"#4ade80"}},"("+pi[p.id]+" stock)")),
      React.createElement("div",{style:{display:"flex",gap:8}},
       React.createElement("button",{onClick:()=>openPack(p.id),disabled:!co,style:{flex:1,background:co?"linear-gradient(135deg,"+p.color+"88,"+p.color+")":"#0d1117",border:"none",borderRadius:8,color:co?"#fff":"#21262d",padding:"8px 0",fontSize:11,fontWeight:700,letterSpacing:1.5,cursor:co?"pointer":"not-allowed"}},co?"OPEN ("+pi[p.id]+")":"NO STOCK"),
       p.cost>0&&React.createElement("button",{onClick:()=>buyPack(p.id),disabled:!cb,style:{background:cb?"rgba(255,255,255,.08)":"transparent",border:"1px solid "+(cb?p.border+"66":"#21262d"),borderRadius:8,color:cb?p.color:"#374151",padding:"8px 12px",fontSize:10,cursor:cb?"pointer":"not-allowed"}},"BUY")))}))),

   scr==="opening"&&React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"calc(100vh - 120px)"}},
    React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:24}},
     React.createElement("div",{style:{fontSize:13,letterSpacing:4,color:pt.color}},shk?"Shaking...":"CLICK TO OPEN"),
     React.createElement("div",{onClick:!shk?()=>setScr("reveal"):undefined,style:{width:175,height:240,background:"linear-gradient(160deg,#0d1117,"+pt.color+"22,#0d1117)",border:"3px solid "+pt.border,borderRadius:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,cursor:shk?"default":"pointer",boxShadow:"0 0 44px "+pt.color+"44",position:"relative"}},
      React.createElement("div",{style:{fontSize:56}},pt.emoji),React.createElement("div",{style:{fontSize:14,letterSpacing:3,color:pt.color,fontWeight:700}},pt.name.toUpperCase()),React.createElement("div",{style:{fontSize:9,letterSpacing:2,color:"#4a5568"}},pt.n+" CARDS"),
      !shk&&React.createElement("div",{style:{position:"absolute",bottom:12,fontSize:9,letterSpacing:2,color:pt.color}},"CLICK TO RIP OPEN")))),

   scr==="reveal"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 12px",gap:18}},
    React.createElement("div",{style:{fontSize:10,letterSpacing:4,color:"#374151"}},"TAP CARDS TO REVEAL"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}},oc.map((c,i)=>React.createElement(Card,{key:c.uid||i,card:c,rev:rev.indexOf(i)>=0,onClick:()=>revCard(i)}))),
    allR&&React.createElement("div",{style:{textAlign:"center"}},React.createElement("button",{onClick:collect,style:{background:"linear-gradient(135deg,#92400e,#d97706,#fbbf24)",border:"none",borderRadius:10,color:"#000",padding:"13px 36px",fontSize:15,fontWeight:700,letterSpacing:3,cursor:"pointer",boxShadow:"0 0 22px #FFB80066"}},"ADD TO BINDER →")),
    !allR&&React.createElement("button",{onClick:revAll,style:{background:"transparent",border:"1px solid #21262d",borderRadius:8,color:"#374151",padding:"9px 22px",fontSize:10,letterSpacing:2,cursor:"pointer"}},"REVEAL ALL")),

   scr==="binder"&&React.createElement("div",{style:{padding:16,maxWidth:1080,margin:"0 auto"}},
    React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}},
     React.createElement("div",null,React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800"}},"MY BINDER"),React.createElement("div",{style:{fontSize:9,color:"#374151",marginTop:2}},col.length+" cards · "+collPct+"% collected")),
     React.createElement("button",{onClick:()=>setSellMode(!sellMode),style:{background:sellMode?"#ef444415":"transparent",border:"1px solid "+(sellMode?"#ef4444":"#21262d"),borderRadius:6,color:sellMode?"#ef4444":"#4a5568",padding:"5px 12px",fontSize:9,letterSpacing:2}},sellMode?"EXIT SELL":"SELL MODE")),
    React.createElement("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}},
     React.createElement("span",{style:{fontSize:8,letterSpacing:2,color:"#21262d"}},"FILTER:"),
     [["all","ALL"],["myth","LEGEND"],["legendary","LEG"],["ultra","ULTRA"],["epic","EPIC"],["rare","RARE"],["common","COM"]].map(kv=>React.createElement("button",{key:kv[0],onClick:()=>setFilterR(kv[0]),style:{background:filterR===kv[0]?((RC[kv[0]]&&RC[kv[0]].border)||"#FFB800")+"18":"transparent",border:"1px solid "+(filterR===kv[0]?(RC[kv[0]]&&RC[kv[0]].border)||"#FFB800":"#21262d"),borderRadius:6,color:filterR===kv[0]?(RC[kv[0]]&&RC[kv[0]].border)||"#FFB800":"#374151",padding:"3px 10px",fontSize:9}},kv[1])),
     React.createElement("span",{style:{fontSize:8,letterSpacing:2,color:"#21262d",marginLeft:8}},"SORT:"),
     [["ovr","OVR"],["rarity","RAR"],["sal","SAL"],["team","TEAM"],["pos","POS"]].map(kv=>React.createElement("button",{key:kv[0],onClick:()=>setSortBy(kv[0]),style:{background:sortBy===kv[0]?"#FFB80018":"transparent",border:"1px solid "+(sortBy===kv[0]?"#FFB800":"#21262d"),borderRadius:6,color:sortBy===kv[0]?"#FFB800":"#374151",padding:"3px 10px",fontSize:9}},kv[1]))),
    fc.length===0?React.createElement("div",{style:{textAlign:"center",padding:"60px 0",color:"#21262d",fontSize:12,letterSpacing:3}},"NO CARDS YET"):
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},fc.map(c=>React.createElement("div",{key:c.uid,style:{display:"flex",flexDirection:"column",gap:4}},
     React.createElement(Card,{card:c,rev:true}),
     sellMode&&Object.keys(lu).map(k=>lu[k]).indexOf(c.uid)<0&&React.createElement("button",{onClick:()=>sellCard(c.uid),style:{width:"100%",background:"rgba(0,0,0,.5)",border:"1px solid "+(RC[c.rarity]?RC[c.rarity].border:"#888")+"44",borderRadius:6,color:RC[c.rarity]?RC[c.rarity].border:"#888",fontSize:9,padding:"5px 0"}},"SELL · 🪙"+fmt(c.value)),
     sellMode&&Object.keys(lu).map(k=>lu[k]).indexOf(c.uid)>=0&&React.createElement("div",{style:{textAlign:"center",fontSize:8,color:"#374151",padding:"5px 0"}},"IN LINEUP"))))),

   scr==="lineup"&&React.createElement("div",{style:{padding:16,maxWidth:900,margin:"0 auto"}},
    React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800",marginBottom:4}},"MY TEAM"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:10}},React.createElement("span",{style:{fontSize:8,letterSpacing:2,color:"#21262d"}},"MODE:"),
     CHAL.map(c=>React.createElement("button",{key:c.id,onClick:()=>setChal(c.id),title:c.desc,style:{background:chal===c.id?"#FFB80018":"transparent",border:"1px solid "+(chal===c.id?"#FFB800":"#21262d"),borderRadius:6,color:chal===c.id?"#FFB800":"#374151",padding:"3px 10px",fontSize:9}},c.name))),
    React.createElement("div",{style:{fontSize:9,color:"#4a5568",marginBottom:10}},CH.desc),
    React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14,marginBottom:14}},
     React.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:6}},React.createElement("span",{style:{color:capUsed>CH.cap?"#ef4444":"#9CA3AF"}},"CAP: "+fmtSal(capUsed)+" / "+fmtSal(CH.cap)),React.createElement("span",{style:{color:gC,fontWeight:700}},"SCORE "+teamScore+" · "+gL)),
     React.createElement("div",{style:{height:8,background:"#0d1117",borderRadius:4,overflow:"hidden"}},React.createElement("div",{style:{height:"100%",width:Math.min(100,capUsed/CH.cap*100)+"%",background:capUsed>CH.cap?"#ef4444":"linear-gradient(90deg,#4ade80,#FFB800)",transition:"width .3s"}})),
     React.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:8,color:"#4a5568",marginTop:6}},React.createElement("span",null,filled.length+"/"+LS.length+" slots"+(chemBonus?" · +"+chemBonus+" chemistry":"")),React.createElement("span",{style:{color:legal?"#4ade80":"#ef4444"}},legal?"✓ LEGAL LINEUP":"✗ "+(filled.length<LS.length?"INCOMPLETE":"OVER CAP")))),
    [{t:"OFFENSE",ids:["QB1","RB1","RB2","WR1","WR2","WR3","TE1","FLEX","OT1"]},{t:"DEFENSE",ids:["DE1","DE2","DT1","LB1","LB2","CB1","CB2","S1","S2"]},{t:"SPECIAL",ids:["K1"]}].map(g=>
     React.createElement("div",{key:g.t,style:{marginBottom:16}},React.createElement("div",{style:{fontSize:10,letterSpacing:3,color:"#374151",marginBottom:8}},g.t),React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},LS.filter(s=>g.ids.indexOf(s.id)>=0).map(sl=>{const u=lu[sl.id];const c=u?col.find(x=>x.uid===u):null;return React.createElement("div",{key:sl.id,style:{position:"relative"}},React.createElement(Slot,{slot:sl,card:c,onClick:slotClick}),c&&React.createElement("button",{onClick:()=>clearSlot(sl.id),style:{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:9,background:"#ef4444",border:"none",color:"#fff",fontSize:10,cursor:"pointer"}},"×"))}))))),

   scr==="pick"&&lp&&React.createElement("div",{style:{padding:16,maxWidth:900,margin:"0 auto"}},
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14}},React.createElement("button",{onClick:()=>{setLp(null);setScr("lineup")},style:{background:"transparent",border:"1px solid #21262d",borderRadius:6,color:"#4a5568",padding:"5px 12px",fontSize:10,letterSpacing:2}},"← BACK"),React.createElement("div",null,React.createElement("div",{style:{fontSize:14,fontWeight:700,color:"#FFB800",letterSpacing:3}},"CHOOSE "+lp.label),React.createElement("div",{style:{fontSize:9,color:"#374151"}},"Sorted by OVR · Room: "+fmtSal(Math.max(0,CH.cap-capUsed))))),
    elig.length===0?React.createElement("div",{style:{textAlign:"center",padding:"60px 0",color:"#21262d",fontSize:12,letterSpacing:3}},"NO ELIGIBLE CARDS"):
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},elig.map(c=>React.createElement("div",{key:c.uid,style:{display:"flex",flexDirection:"column",gap:4}},React.createElement(Card,{card:c,rev:true,onClick:()=>assign(c.uid)}),React.createElement("button",{onClick:()=>assign(c.uid),style:{width:"100%",background:(RC[c.rarity]?RC[c.rarity].border:"#888")+"18",border:"1px solid "+(RC[c.rarity]?RC[c.rarity].border:"#888")+"55",borderRadius:6,color:RC[c.rarity]?RC[c.rarity].border:"#888",fontSize:9,padding:"5px 0"}},"SELECT"))))),

   scr==="season"&&React.createElement("div",{style:{padding:16,maxWidth:760,margin:"0 auto"}},
    React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800",marginBottom:4}},"SOLO SEASON"),
    React.createElement("div",{style:{fontSize:9,color:"#4a5568",marginBottom:16}},"Beat each opponent's target with your legal lineup. Win → coins + advance."),
    React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #FFB80044",borderRadius:12,padding:16,marginBottom:14,textAlign:"center"}},
     curWeek?React.createElement(React.Fragment,null,
      React.createElement("div",{style:{fontSize:10,color:"#9CA3AF",letterSpacing:2}},"WEEK "+curWeek.wk+" OF 10"),
      React.createElement("div",{style:{fontSize:22,fontWeight:700,color:"#FFB800",margin:"6px 0"}},curWeek.opp),
      React.createElement("div",{style:{fontSize:11,color:"#9CA3AF"}},"Target Score"),
      React.createElement("div",{style:{fontSize:24,fontWeight:700,color:"#ef4444"}},curWeek.tgt),
      React.createElement("div",{style:{fontSize:10,color:"#4ade80",marginTop:4}},"Reward: 🪙"+fmt(curWeek.reward)),
      React.createElement("div",{style:{margin:"14px 0",fontSize:13}},React.createElement("span",{style:{color:"#9CA3AF"}},"Your team: "),React.createElement("span",{style:{color:teamScore>=curWeek.tgt?"#4ade80":"#ef4444",fontWeight:700,fontSize:20}},teamScore),!legal&&React.createElement("div",{style:{color:"#ef4444",fontSize:10,marginTop:4}},"⚠ Not a legal lineup yet")),
      React.createElement("button",{onClick:playSeason,style:{background:legal?"linear-gradient(135deg,#92400e,#fbbf24)":"#0d1117",border:"none",borderRadius:10,color:legal?"#000":"#374151",padding:"12px 30px",fontSize:13,fontWeight:700,letterSpacing:2,cursor:legal?"pointer":"not-allowed"}},"PLAY WEEK "+curWeek.wk)
     ):React.createElement(React.Fragment,null,
      React.createElement("div",{style:{fontSize:30}},"🏆"),React.createElement("div",{style:{fontSize:18,fontWeight:700,color:"#fbbf24",margin:"8px 0"}},"SEASON COMPLETE!"),React.createElement("div",{style:{fontSize:11,color:"#9CA3AF"}},"You conquered all 10 weeks. Champion!"),
      React.createElement("button",{onClick:resetSeason,style:{marginTop:14,background:"rgba(255,255,255,.08)",border:"1px solid #FFB80044",borderRadius:8,color:"#FFB800",padding:"9px 20px",fontSize:11}},"NEW SEASON"))),
    React.createElement("div",{style:{fontSize:10,color:"#9CA3AF",marginBottom:8}},"Wins: "+seasonWins),
    React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:6}},SEASON.map(w=>React.createElement("div",{key:w.wk,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderRadius:8,background:w.wk<seasonWk?"#15803d22":w.wk===seasonWk?"#FFB80018":"rgba(255,255,255,.02)",border:"1px solid "+(w.wk<seasonWk?"#4ade8044":w.wk===seasonWk?"#FFB80055":"#21262d")}},
     React.createElement("span",{style:{fontSize:10,color:w.wk<seasonWk?"#4ade80":w.wk===seasonWk?"#FFB800":"#4a5568"}},(w.wk<seasonWk?"✓ ":"")+"WK"+w.wk+" · "+w.opp),
     React.createElement("span",{style:{fontSize:10,color:"#9CA3AF"}},"Tgt "+w.tgt+" · 🪙"+fmt(w.reward)))))),

   scr==="market"&&React.createElement("div",{style:{padding:16,maxWidth:1080,margin:"0 auto"}},
    React.createElement("div",{style:{marginBottom:12}},React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800"}},"CARD MARKET"),React.createElement("div",{style:{fontSize:9,color:"#374151",marginTop:2}},"Buy any card · 🪙"+fmt(coins))),
    React.createElement("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}},
     React.createElement("input",{value:msq,onChange:e=>setMsq(e.target.value),placeholder:"Search...",style:{background:"rgba(255,255,255,.05)",border:"1px solid #21262d",borderRadius:8,color:"#F1F5F9",padding:"6px 12px",fontSize:11,outline:"none",width:200}}),
     [["all","ALL"],["myth","LEGEND"],["legendary","LEG"],["ultra","ULTRA"],["epic","EPIC"],["rare","RARE"],["common","COM"]].map(kv=>React.createElement("button",{key:kv[0],onClick:()=>setMf(kv[0]),style:{background:mf===kv[0]?((RC[kv[0]]&&RC[kv[0]].border)||"#FFB800")+"18":"transparent",border:"1px solid "+(mf===kv[0]?(RC[kv[0]]&&RC[kv[0]].border)||"#FFB800":"#21262d"),borderRadius:6,color:mf===kv[0]?(RC[kv[0]]&&RC[kv[0]].border)||"#FFB800":"#374151",padding:"3px 10px",fontSize:9}},kv[1]))),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},mkC.slice(0,80).map((c,i)=>{const own=col.some(x=>x.name===c.name&&x.team===c.team),ca=coins>=c.marketPrice;return React.createElement("div",{key:c.uid||i,style:{display:"flex",flexDirection:"column",gap:4}},React.createElement(Card,{card:c,rev:true,sz:"sm",badge:own?{text:"OWNED",bg:"#374151"}:null}),React.createElement("button",{onClick:()=>buyMkt(c),disabled:!ca,style:{width:"100%",background:ca?(RC[c.rarity]?RC[c.rarity].border:"#888")+"18":"transparent",border:"1px solid "+(ca?(RC[c.rarity]?RC[c.rarity].border:"#888")+"55":"#21262d"),borderRadius:6,color:ca?(RC[c.rarity]?RC[c.rarity].border:"#888"):"#374151",fontSize:8,padding:"5px 0",cursor:ca?"pointer":"not-allowed"}},ca?"BUY 🪙"+fmt(c.marketPrice):"🪙"+fmt(c.marketPrice)))}))),

   scr==="trade"&&React.createElement("div",{style:{padding:16,maxWidth:900,margin:"0 auto"}},
    React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800",marginBottom:4}},"TRADE CENTER"),
    React.createElement("div",{style:{fontSize:9,color:"#4a5568",marginBottom:16}},"Build an offer → generate a code → other player pastes it to receive."),
    React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14,marginBottom:16}},
     React.createElement("div",{style:{fontSize:11,color:"#FFB800",letterSpacing:2,marginBottom:8}},"SEND CARDS ("+tradeOut.length+")"),
     React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,maxHeight:200,overflowY:"auto"}},col.length===0?React.createElement("div",{style:{fontSize:10,color:"#374151"}},"No cards to trade."):col.map(c=>{const on=tradeOut.indexOf(c.uid)>=0;return React.createElement("div",{key:c.uid,onClick:()=>setTradeOut(on?tradeOut.filter(x=>x!==c.uid):tradeOut.concat([c.uid])),style:{cursor:"pointer",opacity:on?1:.5,outline:on?"2px solid "+(RC[c.rarity]?RC[c.rarity].border:"#888"):"none",borderRadius:8}},React.createElement(Card,{card:c,rev:true,sz:"sm"}))})),
     React.createElement("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:10}},React.createElement("span",{style:{fontSize:10,color:"#9CA3AF"}},"Add coins:"),React.createElement("input",{type:"number",value:tradeCash,onChange:e=>setTradeCash(Math.max(0,Math.min(coins,+e.target.value||0))),style:{background:"rgba(255,255,255,.05)",border:"1px solid #21262d",borderRadius:6,color:"#F1F5F9",padding:"5px 10px",fontSize:11,width:120}}),React.createElement("span",{style:{fontSize:9,color:"#374151"}},"(have 🪙"+fmt(coins)+")")),
     React.createElement("button",{onClick:proposeTrade,style:{background:"linear-gradient(135deg,#92400e,#fbbf24)",border:"none",borderRadius:8,color:"#000",padding:"9px 20px",fontSize:11,fontWeight:700,letterSpacing:2}},"GENERATE TRADE CODE"),
     tradeCode&&React.createElement("div",{style:{marginTop:10}},React.createElement("div",{style:{fontSize:8,color:"#4a5568",marginBottom:4}},"Copy & send this code:"),React.createElement("textarea",{readOnly:true,value:tradeCode,onClick:e=>e.target.select(),style:{width:"100%",height:60,background:"#0d1117",border:"1px solid #FFB80044",borderRadius:6,color:"#4ade80",fontSize:9,padding:8,resize:"none"}}))),
    React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14}},
     React.createElement("div",{style:{fontSize:11,color:"#4ade80",letterSpacing:2,marginBottom:8}},"RECEIVE A TRADE"),
     React.createElement("textarea",{value:importCode,onChange:e=>setImportCode(e.target.value),placeholder:"Paste a trade code here...",style:{width:"100%",height:60,background:"#0d1117",border:"1px solid #21262d",borderRadius:6,color:"#F1F5F9",fontSize:9,padding:8,resize:"none",marginBottom:10}}),
     React.createElement("button",{onClick:acceptTrade,style:{background:"#4ade8022",border:"1px solid #4ade8066",borderRadius:8,color:"#4ade80",padding:"9px 20px",fontSize:11,fontWeight:700,letterSpacing:2}},"ACCEPT & ADD CARDS"))),

   scr==="vs"&&React.createElement("div",{style:{padding:16,maxWidth:760,margin:"0 auto"}},
    React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800",marginBottom:4}},"HEAD TO HEAD"),
    React.createElement("div",{style:{fontSize:9,color:"#4a5568",marginBottom:16}},"Copy your team code, share, paste both to see who wins."),
    React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14,marginBottom:14}},React.createElement("div",{style:{fontSize:10,color:"#FFB800",marginBottom:6}},"YOUR TEAM CODE"),React.createElement("textarea",{readOnly:true,value:legal?lineupCode():"(complete a legal lineup first)",onClick:e=>legal&&e.target.select(),style:{width:"100%",height:50,background:"#0d1117",border:"1px solid #FFB80044",borderRadius:6,color:legal?"#4ade80":"#374151",fontSize:9,padding:8,resize:"none"}})),
    [["A",cmpA,setCmpA],["B",cmpB,setCmpB]].map(t=>React.createElement("div",{key:t[0],style:{marginBottom:12}},React.createElement("div",{style:{fontSize:10,color:"#9CA3AF",marginBottom:4}},"TEAM "+t[0]+" CODE"),React.createElement("textarea",{value:t[1],onChange:e=>t[2](e.target.value),placeholder:"Paste team "+t[0]+" code...",style:{width:"100%",height:48,background:"#0d1117",border:"1px solid #21262d",borderRadius:6,color:"#F1F5F9",fontSize:9,padding:8,resize:"none"}}))),
    (function(){const A=cmpA&&decodeLineup(cmpA),B=cmpB&&decodeLineup(cmpB);if(!A||!B)return React.createElement("div",{style:{fontSize:10,color:"#374151",textAlign:"center",padding:20}},"Paste both codes to compare");const win=A.score>B.score?"A":B.score>A.score?"B":"TIE";return React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #FFB80044",borderRadius:12,padding:16,textAlign:"center"}},
     React.createElement("div",{style:{display:"flex",justifyContent:"space-around",marginBottom:12}},
      React.createElement("div",null,React.createElement("div",{style:{fontSize:9,color:"#9CA3AF"}},"TEAM A"),React.createElement("div",{style:{fontSize:28,fontWeight:700,color:win==="A"?"#4ade80":"#9CA3AF"}},A.score),React.createElement("div",{style:{fontSize:8,color:"#4a5568"}},A.base+" + "+A.chem+" chem")),
      React.createElement("div",{style:{fontSize:20,color:"#374151",alignSelf:"center"}},"VS"),
      React.createElement("div",null,React.createElement("div",{style:{fontSize:9,color:"#9CA3AF"}},"TEAM B"),React.createElement("div",{style:{fontSize:28,fontWeight:700,color:win==="B"?"#4ade80":"#9CA3AF"}},B.score),React.createElement("div",{style:{fontSize:8,color:"#4a5568"}},B.base+" + "+B.chem+" chem"))),
     React.createElement("div",{style:{fontSize:14,fontWeight:700,letterSpacing:3,color:"#FFB800"}},win==="TIE"?"🤝 TIE GAME":"🏆 TEAM "+win+" WINS"))})()),

   scr==="more"&&React.createElement("div",{style:{padding:16,maxWidth:760,margin:"0 auto"}},
    React.createElement("div",{style:{fontSize:18,fontWeight:700,letterSpacing:4,color:"#FFB800",marginBottom:12}},"STATS & ACHIEVEMENTS"),
    React.createElement("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:16,marginBottom:16}},
     React.createElement("div",{style:{fontSize:11,color:"#9CA3AF",marginBottom:6}},"COLLECTION PROGRESS"),
     React.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}},React.createElement("span",{style:{color:"#FFB800",fontWeight:700}},uniqueOwned+" / "+totalPlayers+" players"),React.createElement("span",{style:{color:"#4ade80",fontWeight:700}},collPct+"%")),
     React.createElement("div",{style:{height:10,background:"#0d1117",borderRadius:5,overflow:"hidden"}},React.createElement("div",{style:{height:"100%",width:collPct+"%",background:"linear-gradient(90deg,#4ade80,#FFB800)",transition:"width .4s"}})),
     React.createElement("div",{style:{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}},Object.keys(RC).map(r=>rc[r]?React.createElement("div",{key:r,style:{fontSize:9,color:RC[r].border}},RC[r].label+": "+rc[r]):null)),
     React.createElement("div",{style:{fontSize:10,color:"#9CA3AF",marginTop:10}},"Season: Week "+seasonWk+" · "+seasonWins+" wins · Streak: "+streak+" days")),
    React.createElement("div",{style:{fontSize:11,color:"#9CA3AF",marginBottom:8,letterSpacing:2}},"ACHIEVEMENTS ("+ach.length+"/"+ACH.length+")"),
    React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:6}},ACH.map(a=>{const got=ach.indexOf(a.id)>=0;return React.createElement("div",{key:a.id,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:8,background:got?"#15803d22":"rgba(255,255,255,.02)",border:"1px solid "+(got?"#4ade8044":"#21262d"),opacity:got?1:.65}},
     React.createElement("div",null,React.createElement("div",{style:{fontSize:11,fontWeight:700,color:got?"#4ade80":"#9CA3AF"}},(got?"✓ ":"🔒 ")+a.name),React.createElement("div",{style:{fontSize:9,color:"#4a5568",marginTop:2}},a.desc)),
     React.createElement("div",{style:{fontSize:10,color:got?"#fbbf24":"#374151",fontWeight:700}},"🪙"+fmt(a.coins)))})))

  )
 );
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
