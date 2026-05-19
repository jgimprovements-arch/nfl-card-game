/* KASHTON'S GRIDIRON — game.js PART 1 of 2 */
var R=React,ce=R.createElement,F=R.Fragment,us=R.useState,ue=R.useEffect,uc=R.useCallback;
var ROSTER_URL="players.json",CAP=1e8;
function val(r,p){var b={myth:40000,legendary:8000,ultra:3500,epic:1500,rare:300,common:50};return Math.round((b[r]||50)*p)}
function sal(c){return c.value*1000}
function mp(v){return Math.round(v*2.5)}
var RC={
 myth:{label:"LEGEND",bg:"linear-gradient(135deg,#0a0012,#1a0533,#6b21a8,#a855f7,#fbbf24,#a855f7,#1a0533)",border:"#f0abfc",glow:"#e879f9"},
 legendary:{label:"LEGENDARY",bg:"linear-gradient(150deg,#78350f,#b45309,#f59e0b,#fde68a)",border:"#FFB800",glow:"#FFB800"},
 ultra:{label:"ULTRA RARE",bg:"linear-gradient(150deg,#164e1a,#15803d,#4ade80,#bbf7d0)",border:"#4ade80",glow:"#22c55e"},
 epic:{label:"EPIC",bg:"linear-gradient(150deg,#3b0764,#7e22ce,#c084fc)",border:"#C084FC",glow:"#A855F7"},
 rare:{label:"RARE",bg:"linear-gradient(150deg,#1e3a5f,#2563eb,#93c5fd)",border:"#60A5FA",glow:"#3B82F6"},
 common:{label:"COMMON",bg:"linear-gradient(150deg,#1f2937,#374151,#6b7280)",border:"#9CA3AF",glow:"#6B7280"}
};
var RO={myth:0,legendary:1,ultra:2,epic:3,rare:4,common:5};
var TS={ARI:"ari",ATL:"atl",BAL:"bal",BUF:"buf",CAR:"car",CHI:"chi",CIN:"cin",CLE:"cle",DAL:"dal",DEN:"den",DET:"det",GB:"gb",HOU:"hou",IND:"ind",JAX:"jax",KC:"kc",LV:"lv",LAC:"lac",LAR:"lar",MIA:"mia",MIN:"min",NE:"ne",NO:"no",NYG:"nyg",NYJ:"nyj",PHI:"phi",PIT:"pit",SF:"sf",SEA:"sea",TB:"tb",TEN:"ten",WAS:"wsh"};
function tlogo(t){var s=TS[t];return s?"https://a.espncdn.com/i/teamlogos/nfl/500/"+s+".png":null}
function TeamArt(p){var ok=us(true),u=tlogo(p.team);if(!u||!ok[0])return ce("span",{style:{fontSize:p.size,filter:"drop-shadow(0 0 "+p.glow+")"}},"🏈");return ce("img",{src:u,alt:"",onError:function(){ok[1](false)},style:{width:p.size*1.5,height:p.size*1.5,objectFit:"contain",filter:"drop-shadow(0 0 "+p.glow+")"}})}
var LS=[
 {id:"QB1",label:"QB",pos:["QB"],icon:"🏈"},{id:"RB1",label:"RB1",pos:["RB"],icon:"💨"},{id:"RB2",label:"RB2",pos:["RB"],icon:"💨"},
 {id:"WR1",label:"WR1",pos:["WR"],icon:"⚡"},{id:"WR2",label:"WR2",pos:["WR"],icon:"⚡"},{id:"WR3",label:"WR3",pos:["WR"],icon:"⚡"},
 {id:"TE1",label:"TE",pos:["TE"],icon:"🎯"},{id:"FLEX",label:"FLEX",pos:["RB","WR","TE"],icon:"🔄"},{id:"OT1",label:"OT",pos:["OT","G","C"],icon:"💪"},
 {id:"DE1",label:"DE1",pos:["DE","LB"],icon:"🛡️"},{id:"DE2",label:"DE2",pos:["DE","LB"],icon:"🛡️"},{id:"DT1",label:"DT",pos:["DT","DE"],icon:"🦾"},
 {id:"LB1",label:"LB1",pos:["LB"],icon:"🔥"},{id:"LB2",label:"LB2",pos:["LB"],icon:"🔥"},
 {id:"CB1",label:"CB1",pos:["CB"],icon:"🔒"},{id:"CB2",label:"CB2",pos:["CB"],icon:"🔒"},
 {id:"S1",label:"S1",pos:["S","CB"],icon:"👁️"},{id:"S2",label:"S2",pos:["S","CB"],icon:"👁️"},{id:"K1",label:"K",pos:["K"],icon:"🦵"}
];
var PT=[
 {id:"starter",name:"Starter Pack",emoji:"🏈",cost:0,desc:"Beginner pack",color:"#6B7280",border:"#9CA3AF",rates:[{r:"rare",c:.45},{r:"common",c:1}],n:5},
 {id:"standard",name:"NFL Pack",emoji:"🏈",cost:500,desc:"5 cards mixed",color:"#FFB800",border:"#FFB800",rates:[{r:"legendary",c:.01},{r:"ultra",c:.04},{r:"epic",c:.13},{r:"rare",c:.45},{r:"common",c:1}],n:5},
 {id:"gold",name:"Gold Pack",emoji:"🥇",cost:1200,desc:"Guaranteed Rare+",color:"#f59e0b",border:"#FFB800",rates:[{r:"legendary",c:.03},{r:"ultra",c:.10},{r:"epic",c:.28},{r:"rare",c:1}],n:5},
 {id:"elite",name:"Elite Pack",emoji:"💎",cost:2500,desc:"Guaranteed Epic+",color:"#a855f7",border:"#C084FC",rates:[{r:"legendary",c:.06},{r:"ultra",c:.20},{r:"epic",c:1}],n:5},
 {id:"ultimate",name:"Ultimate Pack",emoji:"👑",cost:5000,desc:"Guaranteed Ultra+",color:"#f59e0b",border:"#4ade80",rates:[{r:"myth",c:.01},{r:"legendary",c:.12},{r:"ultra",c:1}],n:5},
 {id:"legend",name:"Legends Pack",emoji:"⭐",cost:2500,desc:"1 guaranteed Legend",color:"#e879f9",border:"#f0abfc",rates:[{r:"myth",c:.25},{r:"legendary",c:.45},{r:"ultra",c:.70},{r:"epic",c:1}],n:5,lg:true},
 {id:"mega",name:"Mega Pack",emoji:"🎰",cost:3500,desc:"12 cards mixed!",color:"#fb923c",border:"#fdba74",rates:[{r:"legendary",c:.04},{r:"ultra",c:.14},{r:"epic",c:.32},{r:"rare",c:.68},{r:"common",c:1}],n:12}
];
var CHAL=[
 {id:"std",name:"Standard",desc:"Full $100M cap",cap:CAP,mo:99},
 {id:"budget",name:"Budget",desc:"$80M cap",cap:8e7,mo:99},
 {id:"underdog",name:"Underdog",desc:"No 90+ OVR",cap:CAP,mo:90},
 {id:"shoe",name:"Shoestring",desc:"$60M cap, max 93 OVR",cap:6e7,mo:93}
];
var SEASON=[
 {wk:1,opp:"Practice Squad",tgt:1500,rw:600},{wk:2,opp:"Backup Brigade",tgt:1560,rw:700},
 {wk:3,opp:"Wild Card Wolves",tgt:1620,rw:850},{wk:4,opp:"Division Rivals",tgt:1680,rw:1000},
 {wk:5,opp:"Playoff Hopefuls",tgt:1730,rw:1200},{wk:6,opp:"Conference Kings",tgt:1780,rw:1500},
 {wk:7,opp:"All-Pro Squad",tgt:1820,rw:1800},{wk:8,opp:"Hall of Famers",tgt:1860,rw:2200},
 {wk:9,opp:"Dream Team",tgt:1900,rw:2800},{wk:10,opp:"THE GOATS",tgt:1950,rw:4000}
];
var ACH=[
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
 {id:"season_champ",name:"CHAMPION",desc:"Beat THE GOATS",coins:6000},
 {id:"streak7",name:"Dedicated GM",desc:"7-day login streak",coins:2500}
];
function eP(p){var r=p.rarity;if(r==="epic"&&p.prestige>=1.5)r="ultra";var v=val(r,p.prestige);return Object.assign({},p,{rarity:r,value:v,marketPrice:mp(v),ovr:p.ovr||70,uid:p.name+p.team})}
function eL(p){var v=val("myth",p.prestige);return Object.assign({},p,{rarity:"myth",value:v,marketPrice:mp(v),ovr:p.ovr||95,uid:p.name+p.team+"L"})}
function fmt(n){if(n>=1e6)return(n/1e6).toFixed(1)+"M";if(n>=1e3)return(n/1e3).toFixed(n%1e3===0?0:1)+"K";return""+n}
function fS(n){if(n>=1e6)return"$"+(n/1e6).toFixed(1)+"M";if(n>=1e3)return"$"+(n/1e3).toFixed(0)+"K";return"$"+n}
function grade(s,m){var p=m?s/m:0;if(p>=.95)return["A+","#4ade80"];if(p>=.88)return["A","#4ade80"];if(p>=.80)return["B","#a3e635"];if(p>=.70)return["C","#FFB800"];if(p>=.55)return["D","#fb923c"];return["F","#ef4444"]}
function tdy(){return new Date().toISOString().slice(0,10)}
function dB(a,b){return Math.round((new Date(b)-new Date(a))/864e5)}
var SK="kashton-gridiron-v2";
var DS={coins:8000,pi:{starter:3,standard:0,gold:0,elite:0,ultimate:0,legend:1,mega:0},col:[],lu:{},chal:"std",lc:"",strk:0,swk:1,sw:0,ach:[]};
/* responsive card width: 2 BIG cards per row on phone, scales up nicely on bigger screens */
function cw(){var vw=window.innerWidth;if(vw<560)return Math.floor((vw-44)/2);if(vw<860)return 168;return 176}

function Card(p){
 var card=p.card,rev=p.rev,onClick=p.onClick,sz=p.sz||"md",badge=p.badge;
 var c=RC[card.rarity]||RC.common;
 var im=card.rarity==="myth",il=card.rarity==="legendary",iu=card.rarity==="ultra",ie=card.rarity==="epic",ir=card.rarity==="rare";
 var base=cw();
 var w=sz==="sm"?Math.round(base*0.82):base,h=Math.round(w*1.46);
 var ga=im?"gM":il?"gL":iu?"gU":ie?"gE":ir?"gR":"none";
 var sf=w/150; // scale factor vs original 150px reference
 var F2=function(n){return Math.max(6,Math.round(n*sf))};
 return ce("div",{onClick:onClick,style:{width:w,flexShrink:0,cursor:onClick?"pointer":"default"}},
  ce("div",{style:{width:"100%",height:h,borderRadius:14,overflow:"hidden",position:"relative",background:rev?c.bg:"linear-gradient(140deg,#0d1117,#161b22,#0d1117)",border:"2px solid "+(rev?c.border:"#21262d"),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:Math.round(10*sf)+"px "+Math.round(9*sf)+"px",animation:rev?"cFlip .4s ease both,"+ga+" 2.2s ease-in-out .5s infinite":"bP 2.8s ease-in-out infinite"}},
   !rev&&ce("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}},ce("div",{style:{fontSize:Math.round(46*sf)}},"🏈"),ce("div",{style:{fontSize:F2(8),letterSpacing:3,color:"#3d4451"}},"TAP TO REVEAL")),
   rev&&ce(F,null,
    (im||il||iu)&&ce("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,.18) 50%,transparent 65%)",backgroundSize:"300% 100%",animation:"shimmer 2.2s linear infinite"}}),
    ce("div",{style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:1}},
     ce("div",{style:{fontSize:F2(7),letterSpacing:1.5,fontWeight:700,padding:"3px 6px",borderRadius:4,color:im?"#000":"#fff",background:im?"linear-gradient(90deg,#f59e0b,#e879f9,#60A5FA)":c.glow,animation:im?"rb 4s linear infinite":"none"}},c.label),
     ce("div",{style:{fontSize:F2(18),fontWeight:700,color:im?"#fde68a":c.border}},card.ovr,ce("span",{style:{fontSize:F2(7),opacity:.7}}," OVR"))),
    ce("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flex:"1 0 auto"}},im?ce("span",{style:{fontSize:Math.round(40*sf),filter:"drop-shadow(0 0 16px "+c.glow+")"}},"⭐"):ce(TeamArt,{team:card.team,size:Math.round(34*sf),glow:(il?12:8)+"px "+c.glow})),
    ce("div",{style:{textAlign:"center",width:"100%",zIndex:1}},
     ce("div",{style:{fontSize:card.name.length>18?F2(11):card.name.length>14?F2(13):F2(15),fontWeight:700,color:im?"#fde68a":"#F1F5F9",lineHeight:1.15}},card.name),
     ce("div",{style:{fontSize:F2(9),color:c.border+"cc",letterSpacing:2,marginTop:2}},card.pos+" · "+card.team)),
    ce("div",{style:{marginTop:3,padding:Math.round(4*sf)+"px "+Math.round(11*sf)+"px",borderRadius:16,background:"rgba(0,0,0,.4)",border:"1px solid "+c.border+"44",fontSize:F2(12),fontWeight:700,color:"#fde68a"}},fS(sal(card))),
    badge&&ce("div",{style:{position:"absolute",top:5,right:5,background:badge.bg,borderRadius:10,padding:"2px 7px",fontSize:F2(8),color:"#fff",letterSpacing:1}},badge.text)
   )
  )
 );
}
function Slot(p){
 var slot=p.slot,card=p.card,onClick=p.onClick;
 var c=card?RC[card.rarity]||RC.common:null;
 var vw=window.innerWidth;
 var w=vw<560?Math.floor((vw-52)/3):104;
 return ce("div",{onClick:function(){onClick(slot)},style:{width:w,height:Math.round(w*1.32),borderRadius:10,cursor:"pointer",border:"1.5px solid "+(c?c.border+"77":"#21262d"),background:c?c.bg:"rgba(255,255,255,.02)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0}},
  card?ce(F,null,
   ce("div",{style:{fontSize:8,color:c.border}},"OVR "+card.ovr),
   ce("div",null,card.rarity==="myth"?ce("span",{style:{fontSize:22}},"⭐"):ce(TeamArt,{team:card.team,size:20,glow:"5px "+c.glow})),
   ce("div",{style:{fontSize:card.name.length>14?8:9.5,fontWeight:700,color:"#F1F5F9",textAlign:"center",lineHeight:1.2,padding:"0 4px"}},card.name),
   ce("div",{style:{fontSize:8,color:c.border+"cc"}},slot.label)
  ):ce(F,null,
   ce("div",{style:{fontSize:24,opacity:.3}},slot.icon),
   ce("div",{style:{fontSize:10,color:"#374151",letterSpacing:1}},slot.label)
  )
 );
}

function App(){
 /* ===== ALL HOOKS — top of component, always run, never conditional ===== */
 var _ALL=us(null),ALL=_ALL[0],setALL=_ALL[1];
 var _err=us(null),err=_err[0],setErr=_err[1];
 var _coins=us(DS.coins),coins=_coins[0],setCoins=_coins[1];
 var _pi=us(DS.pi),pi=_pi[0],setPi=_pi[1];
 var _col=us(DS.col),col=_col[0],setCol=_col[1];
 var _lu=us(DS.lu),lu=_lu[0],setLu=_lu[1];
 var _chal=us("std"),chal=_chal[0],setChal=_chal[1];
 var _lc=us(""),lastClaim=_lc[0],setLC=_lc[1];
 var _strk=us(0),streak=_strk[0],setStrk=_strk[1];
 var _swk=us(1),swk=_swk[0],setSwk=_swk[1];
 var _sw=us(0),sw=_sw[0],setSw=_sw[1];
 var _ach=us([]),ach=_ach[0],setAch=_ach[1];
 var _scr=us("home"),scr=_scr[0],setScr=_scr[1];
 var _oc=us([]),oc=_oc[0],setOc=_oc[1];
 var _rev=us([]),rev=_rev[0],setRev=_rev[1];
 var _allR=us(false),allR=_allR[0],setAllR=_allR[1];
 var _toast=us(null),toast=_toast[0],setToast=_toast[1];
 var _sort=us("ovr"),sortBy=_sort[0],setSortBy=_sort[1];
 var _fR=us("all"),filterR=_fR[0],setFilterR=_fR[1];
 var _sell=us(false),sellMode=_sell[0],setSellMode=_sell[1];
 var _mf=us("all"),mf=_mf[0],setMf=_mf[1];
 var _msq=us(""),msq=_msq[0],setMsq=_msq[1];
 var _lp=us(null),lp=_lp[0],setLp=_lp[1];
 var _apt=us("standard"),apt=_apt[0],setApt=_apt[1];
 var _shk=us(false),shk=_shk[0],setShk=_shk[1];
 var _loaded=us(false),loaded=_loaded[0],setLoaded=_loaded[1];
 var _to=us([]),tradeOut=_to[0],setTO=_to[1];
 var _tc2=us(0),tradeCash=_tc2[0],setTC=_tc2[1];
 var _tcode=us(""),tradeCode=_tcode[0],setTCode=_tcode[1];
 var _ic=us(""),importCode=_ic[0],setIC=_ic[1];
 var _cA=us(""),cmpA=_cA[0],setCmpA=_cA[1];
 var _cB=us(""),cmpB=_cB[0],setCmpB=_cB[1];
 var unlock=uc(function(id){setAch(function(prev){if(prev.indexOf(id)>=0)return prev;var a;for(var i=0;i<ACH.length;i++){if(ACH[i].id===id){a=ACH[i];break}}if(a){setCoins(function(c){return c+a.coins});setTimeout(function(){setToast({m:"🏆 "+a.name+" · +🪙"+fmt(a.coins),c:"#fbbf24"});setTimeout(function(){setToast(null)},2600)},300)}return prev.concat([id])})},[]);
 var sT=function(m,c){setToast({m:m,c:c||"#FFB800"});setTimeout(function(){setToast(null)},2600)};
 /* data load */
 ue(function(){fetch(ROSTER_URL).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(function(d){setALL([].concat((d.active||[]).map(eP),(d.legends||[]).map(eL)))}).catch(function(e){setErr(e.message)})},[]);
 /* save load */
 ue(function(){try{var r=localStorage.getItem(SK);if(r){var s=JSON.parse(r);setCoins(s.coins==null?DS.coins:s.coins);setPi(s.pi||DS.pi);setCol(s.col||[]);setLu(s.lu||{});setChal(s.chal||"std");setLC(s.lc||"");setStrk(s.strk||0);setSwk(s.swk||1);setSw(s.sw||0);setAch(s.ach||[])}}catch(e){}setLoaded(true)},[]);
 /* auto-save */
 ue(function(){if(!loaded)return;try{localStorage.setItem(SK,JSON.stringify({coins:coins,pi:pi,col:col,lu:lu,chal:chal,lc:lastClaim,strk:streak,swk:swk,sw:sw,ach:ach}))}catch(e){}},[coins,pi,col,lu,chal,lastClaim,streak,swk,sw,ach,loaded]);
 /* achievement watchers */
 var CH=CHAL.find(function(c){return c.id===chal})||CHAL[0];
 var fXl=LS.map(function(sl){return lu[sl.id]?col.find(function(x){return x.uid===lu[sl.id]}):null}).filter(Boolean);
 var capX=0;for(var i=0;i<fXl.length;i++)capX+=sal(fXl[i]);
 var tcX={};for(var i=0;i<fXl.length;i++){var t=fXl[i].team;tcX[t]=(tcX[t]||0)+1}
 var stkX=0;var tkeys=Object.keys(tcX);for(var i=0;i<tkeys.length;i++){if(tcX[tkeys[i]]>stkX)stkX=tcX[tkeys[i]]}
 var legX=fXl.length===LS.length&&capX<=CH.cap;
 var ownX=0;var seen={};for(var i=0;i<col.length;i++){var k=col[i].name+col[i].team;if(!seen[k]){seen[k]=1;ownX++}}
 var totX=0;if(ALL){var s2={};for(var i=0;i<ALL.length;i++){var k2=ALL[i].name+ALL[i].team;if(!s2[k2]){s2[k2]=1;totX++}}}
 var pctX=totX?Math.round(ownX/totX*100):0;
 ue(function(){if(legX)unlock("legal_team");if(stkX>=3)unlock("stack3")},[legX,stkX,unlock]);
 ue(function(){if(pctX>=10)unlock("coll_10");if(pctX>=25)unlock("coll_25");if(pctX>=50)unlock("coll_50")},[pctX,unlock]);
 /* ===== END OF ALL HOOKS ===== *//* PART 2 of 2 — paste directly after Part 1 */

 var A2=ALL||[];
 var PL={};["myth","legendary","ultra","epic","rare","common"].forEach(function(r){PL[r]=A2.filter(function(c){return c.rarity===r})});
 var roll=function(rates){var r=Math.random();for(var i=0;i<rates.length;i++){if(r<rates[i].c){var p=PL[rates[i].r];if(p&&p.length)return p[Math.floor(Math.random()*p.length)]}}var p2=PL.common.length?PL.common:A2;return p2[Math.floor(Math.random()*p2.length)]};
 var rollPack=function(id){var p=PT.find(function(x){return x.id===id});if(!p)return[];var c=[];if(p.lg&&PL.myth.length)c.push(Object.assign({},PL.myth[Math.floor(Math.random()*PL.myth.length)],{uid:Math.random()}));for(var i=c.length;i<p.n;i++)c.push(Object.assign({},roll(p.rates),{uid:Math.random()}));return c};
 var openPack=function(id){if((pi[id]||0)<1){sT("No packs!","#ef4444");return}setPi(Object.assign({},pi,function(){var o={};o[id]=(pi[id]||0)-1;return o}()));setOc(rollPack(id));setRev([]);setAllR(false);setApt(id);setShk(true);setScr("opening");setTimeout(function(){setShk(false)},1100);unlock("first_pack")};
 var buyPack=function(id){var p=PT.find(function(x){return x.id===id});if(!p||!p.cost)return;if(coins<p.cost){sT("Not enough coins!","#ef4444");return}setCoins(coins-p.cost);setPi(Object.assign({},pi,function(){var o={};o[id]=(pi[id]||0)+1;return o}()));sT(p.name+" added! 📦",p.color)};
 var revCard=function(i){if(rev.indexOf(i)>=0)return;setRev(rev.concat([i]));if(oc[i].rarity==="myth")unlock("first_legend");if(oc[i].ovr>=99)unlock("got_99");if(rev.length+1===oc.length)setTimeout(function(){setAllR(true)},600)};
 var revAll=function(){oc.forEach(function(_,i){setTimeout(function(){setRev(function(r){return r.indexOf(i)>=0?r:r.concat([i])});if(oc[i].rarity==="myth")unlock("first_legend");if(oc[i].ovr>=99)unlock("got_99")},i*160)});setTimeout(function(){setAllR(true)},oc.length*160+600)};
 var collect=function(){setCol(col.concat(oc.map(function(x){return Object.assign({},x,{uid:x.uid||Math.random()})})));setOc([]);setRev([]);setAllR(false);setScr("home")};
 var sellCard=function(uid){var c=col.find(function(x){return x.uid===uid});if(!c)return;var nlu=Object.assign({},lu);Object.keys(nlu).forEach(function(k){if(nlu[k]===uid)delete nlu[k]});setLu(nlu);setCoins(coins+c.value);setCol(col.filter(function(y){return y.uid!==uid}));sT("Sold "+c.name+" · 🪙"+fmt(c.value),(RC[c.rarity]||{}).border||"#FFB800")};
 var buyMkt=function(card){if(coins<card.marketPrice){sT("Not enough coins!","#ef4444");return}setCoins(coins-card.marketPrice);setCol(col.concat([Object.assign({},card,{uid:Math.random()})]));sT("Bought "+card.name+"!",(RC[card.rarity]||{}).border||"#FFB800")};
 var slotClick=function(s){setLp(s);setScr("pick")};
 var assign=function(uid){if(!lp)return;var c=col.find(function(x){return x.uid===uid});if(!c)return;if(c.ovr>CH.mo){sT("Player over OVR limit ("+CH.mo+")","#ef4444");return}var nlu=Object.assign({},lu);Object.keys(nlu).forEach(function(k){if(nlu[k]===uid)delete nlu[k]});nlu[lp.id]=uid;var used=0;LS.forEach(function(sl){var u=nlu[sl.id];if(u){var cc=col.find(function(x){return x.uid===u});if(cc)used+=sal(cc)}});if(used>CH.cap){sT("Over the cap! "+fS(used)+" / "+fS(CH.cap),"#ef4444");return}setLu(nlu);setLp(null);setScr("lineup")};
 var clearSlot=function(id){var nlu=Object.assign({},lu);delete nlu[id];setLu(nlu)};
 var makeTC=function(){var o=tradeOut.map(function(u){var c=col.find(function(x){return x.uid===u});return c?{n:c.name,t:c.team,p:c.pos,r:c.rarity,pr:c.prestige,ov:c.ovr}:null}).filter(Boolean);return btoa(JSON.stringify({give:o,cash:tradeCash}))};
 var propTrade=function(){if(!tradeOut.length&&!tradeCash){sT("Add cards or cash","#ef4444");return}setTCode(makeTC());sT("Trade code generated!","#4ade80")};
 var acceptTrade=function(){try{var d=JSON.parse(atob(importCode.trim()));var got=(d.give||[]).map(function(x){return{name:x.n,team:x.t,pos:x.p,rarity:x.r,prestige:x.pr,ovr:x.ov,value:val(x.r,x.pr),marketPrice:mp(val(x.r,x.pr)),uid:Math.random()}});setCol(col.concat(got));sT("Received "+got.length+" card(s)!","#4ade80");setIC("")}catch(e){sT("Invalid trade code","#ef4444")}};
 var luCode=function(){var o=LS.map(function(sl){var u=lu[sl.id];if(!u)return null;var c=col.find(function(x){return x.uid===u});return c?{s:sl.id,ov:c.ovr,n:c.name,t:c.team}:null}).filter(Boolean);return btoa(JSON.stringify(o))};
 var decLU=function(code){try{var a=JSON.parse(atob(code.trim()));var base=0;var tc={};for(var i=0;i<a.length;i++){base+=a[i].ov;tc[a[i].t]=(tc[a[i].t]||0)+1}var ch=0;Object.keys(tc).forEach(function(k){if(tc[k]>=3)ch+=(tc[k]-2)*5});return{n:a.length,score:base+ch,base:base,chem:ch}}catch(e){return null}};
 var claimable=lastClaim!==tdy();
 var nxtRw=400+((lastClaim&&dB(lastClaim,tdy())===1?streak+1:1))*150;
 var claimDaily=function(){var t=tdy();var ns=1;if(lastClaim){var d=dB(lastClaim,t);if(d===0){sT("Already claimed","#ef4444");return}else if(d===1)ns=streak+1;else ns=1}var rw=400+ns*150;setCoins(coins+rw);setStrk(ns);setLC(t);sT("Day "+ns+" · +🪙"+fmt(rw),"#fbbf24");if(ns%5===0){setPi(Object.assign({},pi,{gold:(pi.gold||0)+1}));setTimeout(function(){sT("🎁 Bonus Gold Pack!","#FFB800")},900)}if(ns>=7)unlock("streak7")};
 var sc=col.slice().sort(function(a,b){return sortBy==="ovr"?b.ovr-a.ovr:sortBy==="rarity"?RO[a.rarity]-RO[b.rarity]||b.ovr-a.ovr:sortBy==="sal"?sal(b)-sal(a):sortBy==="team"?a.team.localeCompare(b.team):a.pos.localeCompare(b.pos)});
 var fc=filterR==="all"?sc:filterR==="legend"?sc.filter(function(c){return c.rarity==="myth"}):sc.filter(function(c){return c.rarity===filterR});
 var filled=LS.map(function(sl){return{sl:sl,c:lu[sl.id]?col.find(function(x){return x.uid===lu[sl.id]}):null}}).filter(function(x){return x.c});
 var capUsed=0;for(var i=0;i<filled.length;i++)capUsed+=sal(filled[i].c);
 var baseScore=0;for(var i=0;i<filled.length;i++)baseScore+=filled[i].c.ovr;
 var tCnt={};for(var i=0;i<filled.length;i++){var t3=filled[i].c.team;tCnt[t3]=(tCnt[t3]||0)+1}
 var chemB=0;Object.keys(tCnt).forEach(function(k){if(tCnt[k]>=3)chemB+=(tCnt[k]-2)*5});
 var teamScore=baseScore+chemB;
 var gr=grade(teamScore,LS.length*99);var gL=gr[0],gC=gr[1];
 var legal=filled.length===LS.length&&capUsed<=CH.cap;
 var rc={};for(var i=0;i<col.length;i++){var rr=col[i].rarity;rc[rr]=(rc[rr]||0)+1}
 var collPct=pctX;var uniqueOwned=ownX;var totalPlayers=totX;
 var mkC=A2.filter(function(c){if(mf!=="all"&&c.rarity!==mf)return false;if(msq&&c.name.toLowerCase().indexOf(msq.toLowerCase())<0&&c.team.toLowerCase().indexOf(msq.toLowerCase())<0)return false;return true}).sort(function(a,b){return b.ovr-a.ovr});
 var elig=lp?col.filter(function(c){return lp.pos.indexOf(c.pos)>=0&&c.ovr<=CH.mo}).sort(function(a,b){return b.ovr-a.ovr}):[];
 var pt=PT.find(function(p){return p.id===apt})||PT[1];
 var curWeek=SEASON.find(function(w){return w.wk===swk});
 var playSeason=function(){if(!legal){sT("Need a legal lineup!","#ef4444");return}if(!curWeek){sT("Season complete! 🏆","#fbbf24");return}if(teamScore>=curWeek.tgt){setCoins(coins+curWeek.rw);setSw(sw+1);unlock("season_w1");if(sw+1>=5)unlock("season_w5");if(swk>=10)unlock("season_champ");if(swk<10)setSwk(swk+1);sT("WIN! "+teamScore+" beat "+curWeek.tgt+" · +🪙"+fmt(curWeek.rw),"#4ade80")}else{sT("LOSS. Need "+curWeek.tgt+", had "+teamScore,"#ef4444")}};
 var resetSeason=function(){setSwk(1);setSw(0);sT("Season reset","#FFB800")};
 var NAV=[{id:"home",l:"PACKS",i:"📦"},{id:"binder",l:"BINDER",i:"📂"},{id:"lineup",l:"TEAM",i:"🏟️"},{id:"season",l:"SEASON",i:"🏆"},{id:"market",l:"MARKET",i:"🏪"},{id:"trade",l:"TRADE",i:"🔄"},{id:"vs",l:"VS",i:"⚔️"},{id:"more",l:"MORE",i:"📊"}];
 /* mobile helper styles */
 var scrl={overflowY:"auto",WebkitOverflowScrolling:"touch",paddingBottom:16};
 var btn44=function(extra){return Object.assign({minHeight:44,minWidth:44,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,fontSize:13,fontWeight:700,letterSpacing:1.5,border:"none"},extra||{})};
 var fBtn=function(kv,cur,set,rcl){var act=cur===kv[0];return ce("button",{key:kv[0],onClick:function(){set(kv[0])},style:btn44({background:act?((rcl&&rcl.border)||"#FFB800")+"22":"transparent",border:"1px solid "+(act?(rcl&&rcl.border)||"#FFB800":"#21262d"),color:act?(rcl&&rcl.border)||"#FFB800":"#4a5568",padding:"6px 12px",fontSize:12,minHeight:36,minWidth:0})},kv[1])};

 /* ERROR */
 if(err)return ce("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,padding:24,textAlign:"center",background:"#000308"}},ce("div",{style:{fontSize:18,color:"#ef4444",letterSpacing:2}},"COULD NOT LOAD ROSTER"),ce("div",{style:{fontSize:13,color:"#9CA3AF",maxWidth:420,lineHeight:1.6}},"Needs players.json + game.js + logo.png next to index.html. Error: "+err));
 /* LOADING */
 if(!ALL||!loaded)return ce("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,background:"#000308"}},ce("img",{src:"logo.png",alt:"",onError:function(e){e.target.style.display="none"},style:{width:"min(70vw,320px)",height:"auto",animation:"bP 2s ease-in-out infinite"}}),ce("div",{style:{color:"#ef4444",letterSpacing:4,fontSize:15}},"LOADING…"));

 /* ---- MAIN RENDER ---- */
 return ce("div",{style:{height:"100vh",display:"flex",flexDirection:"column",background:"radial-gradient(ellipse at 15% 10%,#1a0800 0%,#05050f 50%,#000308 100%)",position:"relative",overflow:"hidden"}},
  /* toast */
  toast&&ce("div",{style:{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",zIndex:200,background:"rgba(0,0,0,.96)",border:"1px solid "+toast.c+"55",borderRadius:12,padding:"11px 22px",fontSize:13,letterSpacing:1.5,color:toast.c,boxShadow:"0 0 18px "+toast.c+"44",animation:"tI .3s ease both",whiteSpace:"nowrap",maxWidth:"92vw",textAlign:"center"}},toast.m),
  /* HEADER */
  ce("div",{className:"top-bar",style:{flexShrink:0,background:"rgba(3,4,10,.94)",backdropFilter:"blur(14px)",borderBottom:"1px solid #FFB80020",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 16px",zIndex:100}},
   ce("img",{src:"logo.png",alt:"",onError:function(e){e.target.style.display="none"},style:{height:36,width:"auto",filter:"drop-shadow(0 0 8px #ef444455)"}}),
   ce("div",{style:{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",background:"rgba(255,184,0,.1)",border:"1px solid #FFB80044",borderRadius:20}},ce("span",{style:{fontSize:14}},"🪙"),ce("span",{style:{fontSize:15,fontWeight:700,color:"#FFB800"}},fmt(coins)))),
  /* SCROLLABLE CONTENT */
  ce("div",{style:{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"}},

   scr==="home"&&ce("div",{style:{padding:"16px 14px",maxWidth:600,margin:"0 auto"}},
    ce("div",{style:{background:claimable?"linear-gradient(135deg,#78350f,#FFB80033)":"rgba(255,255,255,.03)",border:"1px solid "+(claimable?"#FFB800":"#21262d"),borderRadius:14,padding:14,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}},
     ce("div",null,ce("div",{style:{fontSize:14,fontWeight:700,color:"#FFB800",letterSpacing:2}},"🔥 STREAK: "+streak),ce("div",{style:{fontSize:11,color:"#9CA3AF",marginTop:3}},claimable?"Claim today's reward!":"Come back tomorrow")),
     ce("button",{onClick:claimDaily,disabled:!claimable,style:btn44({background:claimable?"linear-gradient(135deg,#92400e,#fbbf24)":"#0d1117",color:claimable?"#000":"#374151",padding:"10px 22px",cursor:claimable?"pointer":"not-allowed"})},claimable?"CLAIM 🪙"+fmt(nxtRw):"CLAIMED ✓")),
    ce("div",{style:{marginBottom:14,textAlign:"center"}},ce("div",{style:{fontSize:12,letterSpacing:4,color:"#374151"}},A2.length+" PLAYERS")),
    ce("div",{style:{display:"flex",flexDirection:"column",gap:12}},
     PT.map(function(p){var co=(pi[p.id]||0)>0,cb=coins>=p.cost;return ce("div",{key:p.id,style:{background:"rgba(255,255,255,.03)",border:"1px solid "+p.border+"44",borderRadius:14,padding:14,display:"flex",alignItems:"center",gap:12}},
      ce("div",{style:{fontSize:36,flexShrink:0}},p.emoji),
      ce("div",{style:{flex:1,minWidth:0}},
       ce("div",{style:{fontSize:14,fontWeight:700,color:p.color,letterSpacing:1}},p.name),
       ce("div",{style:{fontSize:11,color:"#4a5568",marginTop:2}},p.desc),
       ce("div",{style:{fontSize:11,color:"#FFB800",marginTop:3}},p.cost>0?"🪙 "+fmt(p.cost):"FREE",(pi[p.id]||0)>0?" · "+pi[p.id]+" in stock":"")),
      ce("div",{style:{display:"flex",flexDirection:"column",gap:6,flexShrink:0}},
       ce("button",{onClick:function(){openPack(p.id)},disabled:!co,style:btn44({background:co?"linear-gradient(135deg,"+p.color+"88,"+p.color+")":"#0d1117",color:co?"#fff":"#21262d",padding:"8px 16px",cursor:co?"pointer":"not-allowed"})},co?"OPEN":"—"),
       p.cost>0&&ce("button",{onClick:function(){buyPack(p.id)},disabled:!cb,style:btn44({background:"transparent",border:"1px solid "+(cb?p.border+"66":"#21262d"),color:cb?p.color:"#374151",padding:"8px 16px",fontSize:11,cursor:cb?"pointer":"not-allowed"})},
"BUY")))}))),

   scr==="opening"&&ce("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"70vh"}},
    ce("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:24}},
     ce("div",{style:{fontSize:14,letterSpacing:4,color:pt.color}},shk?"Shaking...":"TAP TO OPEN"),
     ce("div",{onClick:!shk?function(){setScr("reveal")}:undefined,style:{width:200,height:280,background:"linear-gradient(160deg,#0d1117,"+pt.color+"22,#0d1117)",border:"3px solid "+pt.border,borderRadius:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,cursor:shk?"default":"pointer",boxShadow:"0 0 44px "+pt.color+"44"}},
      ce("div",{style:{fontSize:64}},pt.emoji),ce("div",{style:{fontSize:16,letterSpacing:3,color:pt.color,fontWeight:700}},pt.name.toUpperCase()),ce("div",{style:{fontSize:11,color:"#4a5568"}},pt.n+" CARDS")))),

   scr==="reveal"&&ce("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 10px",gap:18}},
    ce("div",{style:{fontSize:12,letterSpacing:4,color:"#374151"}},"TAP CARDS TO REVEAL"),
    ce("div",{style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}},oc.map(function(c,i){return ce(Card,{key:c.uid||i,card:c,rev:rev.indexOf(i)>=0,onClick:function(){revCard(i)}})})),
    allR&&ce("div",{style:{textAlign:"center",marginTop:8}},ce("button",{onClick:collect,style:btn44({background:"linear-gradient(135deg,#92400e,#d97706,#fbbf24)",color:"#000",padding:"14px 36px",fontSize:16,boxShadow:"0 0 22px #FFB80066"})},"ADD TO BINDER →")),
    !allR&&ce("button",{onClick:revAll,style:btn44({background:"transparent",border:"1px solid #21262d",color:"#374151",padding:"10px 24px",fontSize:12})},"REVEAL ALL")),

   scr==="binder"&&ce("div",{style:{padding:"12px 10px"}},
    ce("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}},
     ce("div",null,ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800"}},"BINDER"),ce("div",{style:{fontSize:11,color:"#374151",marginTop:2}},col.length+" cards · "+collPct+"%")),
     ce("button",{onClick:function(){setSellMode(!sellMode)},style:btn44({background:sellMode?"#ef444415":"transparent",border:"1px solid "+(sellMode?"#ef4444":"#21262d"),color:sellMode?"#ef4444":"#4a5568",padding:"8px 14px",fontSize:11})},sellMode?"EXIT SELL":"SELL")),
    ce("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap",overflowX:"auto",WebkitOverflowScrolling:"touch"}},
     [["all","ALL"],["myth","LEG"],["legendary","LGY"],["ultra","ULT"],["epic","EPIC"],["rare","RARE"],["common","COM"]].map(function(kv){return fBtn(kv,filterR,setFilterR,RC[kv[0]])}),
     [["ovr","OVR"],["rarity","RAR"],["sal","$"],["team","TM"]].map(function(kv){return fBtn(kv,sortBy,setSortBy,{border:"#FFB800"})})),
    fc.length===0?ce("div",{style:{textAlign:"center",padding:"60px 0",color:"#21262d",fontSize:14}},"NO CARDS YET"):
    ce("div",{style:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}},fc.map(function(c){return ce("div",{key:c.uid,style:{display:"flex",flexDirection:"column",gap:5,width:cw()}},
     ce(Card,{card:c,rev:true}),
     sellMode&&Object.keys(lu).map(function(k){return lu[k]}).indexOf(c.uid)<0&&ce("button",{onClick:function(){sellCard(c.uid)},style:btn44({width:"100%",background:"rgba(0,0,0,.5)",border:"1px solid "+((RC[c.rarity]||{}).border||"#888")+"44",color:(RC[c.rarity]||{}).border||"#888",fontSize:12,padding:"9px 0"})},"SELL 🪙"+fmt(c.value)))}))),

   scr==="lineup"&&ce("div",{style:{padding:"12px 10px",maxWidth:600,margin:"0 auto"}},
    ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800",marginBottom:4}},"MY TEAM"),
    ce("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}},CHAL.map(function(c){return ce("button",{key:c.id,onClick:function(){setChal(c.id)},style:btn44({background:chal===c.id?"#FFB80022":"transparent",border:"1px solid "+(chal===c.id?"#FFB800":"#21262d"),color:chal===c.id?"#FFB800":"#4a5568",padding:"6px 12px",fontSize:11,minHeight:36,minWidth:0})},c.name)})),
    ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:12,marginBottom:12}},
     ce("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}},ce("span",{style:{color:capUsed>CH.cap?"#ef4444":"#9CA3AF"}},"CAP: "+fS(capUsed)+" / "+fS(CH.cap)),ce("span",{style:{color:gC,fontWeight:700}},teamScore+" · "+gL)),
     ce("div",{style:{height:8,background:"#0d1117",borderRadius:4,overflow:"hidden"}},ce("div",{style:{height:"100%",width:Math.min(100,capUsed/CH.cap*100)+"%",background:capUsed>CH.cap?"#ef4444":"linear-gradient(90deg,#4ade80,#FFB800)",transition:"width .3s"}})),
     ce("div",{style:{display:"flex",justifyContent:"space-between",fontSize:10,color:"#4a5568",marginTop:6}},ce("span",null,filled.length+"/"+LS.length+(chemB?" · +"+chemB+" chem":"")),ce("span",{style:{color:legal?"#4ade80":"#ef4444"}},legal?"✓ LEGAL":"✗ "+(filled.length<LS.length?"INCOMPLETE":"OVER CAP")))),
    [{t:"OFF",ids:["QB1","RB1","RB2","WR1","WR2","WR3","TE1","FLEX","OT1"]},{t:"DEF",ids:["DE1","DE2","DT1","LB1","LB2","CB1","CB2","S1","S2"]},{t:"ST",ids:["K1"]}].map(function(g){return ce("div",{key:g.t,style:{marginBottom:12}},ce("div",{style:{fontSize:11,letterSpacing:3,color:"#374151",marginBottom:6}},g.t),ce("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},LS.filter(function(s){return g.ids.indexOf(s.id)>=0}).map(function(sl){var u=lu[sl.id];var c=u?col.find(function(x){return x.uid===u}):null;return ce("div",{key:sl.id,style:{position:"relative"}},ce(Slot,{slot:sl,card:c,onClick:slotClick}),c&&ce("button",{onClick:function(){clearSlot(sl.id)},style:{position:"absolute",top:-5,right:-5,width:22,height:22,borderRadius:11,background:"#ef4444",border:"none",color:"#fff",fontSize:12,cursor:"pointer"}},"×"))})))})),

   scr==="pick"&&lp&&ce("div",{style:{padding:"12px 10px"}},
    ce("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14}},ce("button",{onClick:function(){setLp(null);setScr("lineup")},style:btn44({background:"transparent",border:"1px solid #21262d",color:"#4a5568",padding:"8px 16px",fontSize:12})},"← BACK"),ce("div",null,ce("div",{style:{fontSize:15,fontWeight:700,color:"#FFB800"}},lp.label),ce("div",{style:{fontSize:11,color:"#374151"}},"Room: "+fS(Math.max(0,CH.cap-capUsed))))),
    ce("div",{style:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}},elig.map(function(c){return ce("div",{key:c.uid,style:{display:"flex",flexDirection:"column",gap:5,width:cw()}},ce(Card,{card:c,rev:true,onClick:function(){assign(c.uid)}}),ce("button",{onClick:function(){assign(c.uid)},style:btn44({width:"100%",background:((RC[c.rarity]||{}).border||"#888")+"18",border:"1px solid "+((RC[c.rarity]||{}).border||"#888")+"55",color:(RC[c.rarity]||{}).border||"#888",fontSize:12,padding:"9px 0"})},"SELECT"))}))),

   scr==="season"&&ce("div",{style:{padding:"12px 14px",maxWidth:600,margin:"0 auto"}},
    ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800",marginBottom:4}},"SOLO SEASON"),
    ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #FFB80044",borderRadius:12,padding:16,marginBottom:14,textAlign:"center"}},
     curWeek?ce(F,null,
      ce("div",{style:{fontSize:11,color:"#9CA3AF",letterSpacing:2}},"WEEK "+curWeek.wk+" OF 10"),
      ce("div",{style:{fontSize:20,fontWeight:700,color:"#FFB800",margin:"6px 0"}},curWeek.opp),
      ce("div",{style:{fontSize:26,fontWeight:700,color:"#ef4444"}},curWeek.tgt),
      ce("div",{style:{fontSize:11,color:"#4ade80",marginTop:4}},"Reward: 🪙"+fmt(curWeek.rw)),
      ce("div",{style:{margin:"14px 0"}},ce("span",{style:{color:"#9CA3AF",fontSize:13}},"Your team: "),ce("span",{style:{color:teamScore>=curWeek.tgt?"#4ade80":"#ef4444",fontWeight:700,fontSize:22}},teamScore),!legal&&ce("div",{style:{color:"#ef4444",fontSize:11,marginTop:4}},"⚠ Not legal yet")),
      ce("button",{onClick:playSeason,style:btn44({background:legal?"linear-gradient(135deg,#92400e,#fbbf24)":"#0d1117",color:legal?"#000":"#374151",padding:"14px 30px",fontSize:15,width:"100%",cursor:legal?"pointer":"not-allowed"})},"PLAY WEEK "+curWeek.wk)
     ):ce(F,null,ce("div",{style:{fontSize:36}},"🏆"),ce("div",{style:{fontSize:18,fontWeight:700,color:"#fbbf24",margin:"8px 0"}},"CHAMPION!"),ce("button",{onClick:resetSeason,style:btn44({background:"rgba(255,255,255,.08)",border:"1px solid #FFB80044",color:"#FFB800",padding:"10px 24px",marginTop:14})},"NEW SEASON"))),
    ce("div",{style:{display:"flex",flexDirection:"column",gap:6}},SEASON.map(function(w){return ce("div",{key:w.wk,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:8,background:w.wk<swk?"#15803d22":w.wk===swk?"#FFB80018":"rgba(255,255,255,.02)",border:"1px solid "+(w.wk<swk?"#4ade8044":w.wk===swk?"#FFB80055":"#21262d")}},ce("span",{style:{fontSize:12,color:w.wk<swk?"#4ade80":w.wk===swk?"#FFB800":"#4a5568"}},(w.wk<swk?"✓ ":"")+"WK"+w.wk+" "+w.opp),ce("span",{style:{fontSize:11,color:"#9CA3AF"}},w.tgt+" · 🪙"+fmt(w.rw)))}))),

   scr==="market"&&ce("div",{style:{padding:"12px 10px"}},
    ce("div",{style:{marginBottom:10}},ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800"}},"MARKET"),ce("div",{style:{fontSize:11,color:"#374151"}},"🪙"+fmt(coins))),
    ce("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}},ce("input",{value:msq,onChange:function(e){setMsq(e.target.value)},placeholder:"Search...",style:{background:"rgba(255,255,255,.05)",border:"1px solid #21262d",borderRadius:8,color:"#F1F5F9",padding:"8px 12px",fontSize:13,outline:"none",flex:1,minWidth:140}}),
     [["all","ALL"],["myth","LEG"],["legendary","LGY"],["epic","EPIC"],["rare","RARE"]].map(function(kv){return fBtn(kv,mf,setMf,RC[kv[0]])})),
    ce("div",{style:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}},mkC.slice(0,60).map(function(c,i){var own=col.some(function(x){return x.name===c.name&&x.team===c.team}),ca=coins>=c.marketPrice;return ce("div",{key:c.uid||i,style:{display:"flex",flexDirection:"column",gap:5,width:cw()}},ce(Card,{card:c,rev:true,badge:own?{text:"OWNED",bg:"#374151"}:null}),ce("button",{onClick:function(){buyMkt(c)},disabled:!ca,style:btn44({width:"100%",background:ca?((RC[c.rarity]||{}).border||"#888")+"18":"transparent",border:"1px solid "+(ca?((RC[c.rarity]||{}).border||"#888")+"55":"#21262d"),color:ca?(RC[c.rarity]||{}).border:"#374151",fontSize:11,padding:"9px 0",cursor:ca?"pointer":"not-allowed"})},ca?"BUY 🪙"+fmt(c.marketPrice):"🪙"+fmt(c.marketPrice)))}))),

   scr==="trade"&&ce("div",{style:{padding:"12px 14px",maxWidth:600,margin:"0 auto"}},
    ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800",marginBottom:12}},"TRADE"),
    ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14,marginBottom:16}},
     ce("div",{style:{fontSize:12,color:"#FFB800",marginBottom:8}},"SEND ("+tradeOut.length+")"),
     ce("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,maxHeight:180,overflowY:"auto"}},col.map(function(c){var on=tradeOut.indexOf(c.uid)>=0;return ce("div",{key:c.uid,onClick:function(){setTO(on?tradeOut.filter(function(x){return x!==c.uid}):tradeOut.concat([c.uid]))},style:{cursor:"pointer",opacity:on?1:.5,outline:on?"2px solid "+((RC[c.rarity]||{}).border||"#888"):"none",borderRadius:8}},ce(Card,{card:c,rev:true,sz:"sm"}))})),
     ce("button",{onClick:propTrade,style:btn44({background:"linear-gradient(135deg,#92400e,#fbbf24)",color:"#000",padding:"10px 24px",width:"100%"})},
"GENERATE CODE"),
     tradeCode&&ce("textarea",{readOnly:true,value:tradeCode,onClick:function(e){e.target.select()},style:{width:"100%",height:60,background:"#0d1117",border:"1px solid #FFB80044",borderRadius:6,color:"#4ade80",fontSize:10,padding:8,marginTop:10,resize:"none"}})),
    ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14}},
     ce("div",{style:{fontSize:12,color:"#4ade80",marginBottom:8}},"RECEIVE"),
     ce("textarea",{value:importCode,onChange:function(e){setIC(e.target.value)},placeholder:"Paste trade code...",style:{width:"100%",height:60,background:"#0d1117",border:"1px solid #21262d",borderRadius:6,color:"#F1F5F9",fontSize:10,padding:8,marginBottom:10,resize:"none"}}),
     ce("button",{onClick:acceptTrade,style:btn44({background:"#4ade8022",border:"1px solid #4ade8066",color:"#4ade80",padding:"10px 24px",width:"100%"})},"ACCEPT"))),

   scr==="vs"&&ce("div",{style:{padding:"12px 14px",maxWidth:600,margin:"0 auto"}},
    ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800",marginBottom:12}},"HEAD TO HEAD"),
    ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:14,marginBottom:12}},ce("div",{style:{fontSize:11,color:"#FFB800",marginBottom:4}},"YOUR CODE"),ce("textarea",{readOnly:true,value:legal?luCode():"(need legal lineup)",onClick:function(e){legal&&e.target.select()},style:{width:"100%",height:50,background:"#0d1117",border:"1px solid #FFB80044",borderRadius:6,color:legal?"#4ade80":"#374151",fontSize:10,padding:8,resize:"none"}})),
    [["A",cmpA,setCmpA],["B",cmpB,setCmpB]].map(function(t){return ce("div",{key:t[0],style:{marginBottom:10}},ce("div",{style:{fontSize:11,color:"#9CA3AF",marginBottom:4}},"TEAM "+t[0]),ce("textarea",{value:t[1],onChange:function(e){t[2](e.target.value)},placeholder:"Paste code...",style:{width:"100%",height:48,background:"#0d1117",border:"1px solid #21262d",borderRadius:6,color:"#F1F5F9",fontSize:10,padding:8,resize:"none"}}))}),
    (function(){var A=cmpA&&decLU(cmpA),B=cmpB&&decLU(cmpB);if(!A||!B)return ce("div",{style:{fontSize:12,color:"#374151",textAlign:"center",padding:20}},"Paste both codes");var win=A.score>B.score?"A":B.score>A.score?"B":"TIE";return ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #FFB80044",borderRadius:12,padding:16,textAlign:"center"}},
     ce("div",{style:{display:"flex",justifyContent:"space-around",marginBottom:12}},
      ce("div",null,ce("div",{style:{fontSize:10,color:"#9CA3AF"}},"TEAM A"),ce("div",{style:{fontSize:28,fontWeight:700,color:win==="A"?"#4ade80":"#9CA3AF"}},A.score)),
      ce("div",{style:{fontSize:20,color:"#374151",alignSelf:"center"}},"VS"),
      ce("div",null,ce("div",{style:{fontSize:10,color:"#9CA3AF"}},"TEAM B"),ce("div",{style:{fontSize:28,fontWeight:700,color:win==="B"?"#4ade80":"#9CA3AF"}},B.score))),
     ce("div",{style:{fontSize:15,fontWeight:700,letterSpacing:3,color:"#FFB800"}},win==="TIE"?"🤝 TIE":"🏆 TEAM "+win+" WINS"))})()),

   scr==="more"&&ce("div",{style:{padding:"12px 14px",maxWidth:600,margin:"0 auto"}},
    ce("div",{style:{fontSize:16,fontWeight:700,letterSpacing:3,color:"#FFB800",marginBottom:12}},"STATS"),
    ce("div",{style:{background:"rgba(255,255,255,.03)",border:"1px solid #21262d",borderRadius:12,padding:16,marginBottom:16}},
     ce("div",{style:{display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:6}},ce("span",{style:{color:"#FFB800",fontWeight:700}},uniqueOwned+"/"+totalPlayers),ce("span",{style:{color:"#4ade80",fontWeight:700}},collPct+"%")),
     ce("div",{style:{height:10,background:"#0d1117",borderRadius:5,overflow:"hidden"}},ce("div",{style:{height:"100%",width:collPct+"%",background:"linear-gradient(90deg,#4ade80,#FFB800)"}})),
     ce("div",{style:{fontSize:11,color:"#9CA3AF",marginTop:10}},"Season WK"+swk+" · "+sw+" wins · "+streak+"d streak")),
    ce("div",{style:{fontSize:12,color:"#9CA3AF",marginBottom:8}},"ACHIEVEMENTS ("+ach.length+"/"+ACH.length+")"),
    ce("div",{style:{display:"flex",flexDirection:"column",gap:6}},ACH.map(function(a){var got=ach.indexOf(a.id)>=0;return ce("div",{key:a.id,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:10,background:got?"#15803d22":"rgba(255,255,255,.02)",border:"1px solid "+(got?"#4ade8044":"#21262d"),opacity:got?1:.65}},
     ce("div",null,ce("div",{style:{fontSize:13,fontWeight:700,color:got?"#4ade80":"#9CA3AF"}},(got?"✓ ":"🔒 ")+a.name),ce("div",{style:{fontSize:11,color:"#4a5568",marginTop:2}},a.desc)),
     ce("div",{style:{fontSize:12,color:got?"#fbbf24":"#374151",fontWeight:700}},"🪙"+fmt(a.coins)))})))
  ),
  /* BOTTOM NAV */
  ce("div",{className:"bot-nav",style:{flexShrink:0,background:"rgba(3,4,10,.96)",backdropFilter:"blur(14px)",borderTop:"1px solid #21262d",display:"flex",justifyContent:"space-around",padding:"6px 0 10px",zIndex:100}},
   NAV.map(function(n){return ce("button",{key:n.id,onClick:function(){setScr(n.id)},style:{background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:1,padding:"4px 6px",color:scr===n.id?"#FFB800":"#374151",minWidth:0}},ce("span",{style:{fontSize:20}},n.i),ce("span",{style:{fontSize:8,letterSpacing:1}},n.l))}))
 );
}
ReactDOM.createRoot(document.getElementById("root")).render(ce(App));
