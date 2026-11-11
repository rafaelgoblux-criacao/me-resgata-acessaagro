(function(){
  var C={tilt:'./assets/coin-tilt-lg.webp',front:'./assets/coin-front.webp',side:'./assets/coin-side.webp'};
  // [sectionId, img, css position, size(px desktop), depth, rotate, blur, mobile]
  var L=[
    ['presente','side',{right:'3%',top:'7%'},170,1.2,14,0,1],
    ['presente','tilt',{left:'2%',bottom:'10%'},90,0.6,-20,1,0],
    ['como-resgatar','front',{left:'-2.5%',top:'14%'},200,1.4,-12,0,1],
    ['como-resgatar','tilt',{right:'4%',bottom:'8%'},80,0.7,24,1,0],
    ['premios','tilt',{right:'4%',top:'5%'},160,1.3,10,0,1],
    ['premios','side',{left:'4%',top:'36%'},76,0.6,-18,1,0],
    ['nosso-time','front',{right:'5%',top:'6%'},150,1.1,-10,0,0]
  ];
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches, items=[];
  function place(){
    L.forEach(function(c,i){
      var s=document.getElementById(c[0]); if(!s||s.querySelector('[data-aa-coin="'+i+'"]'))return;
      var w=document.createElement('div'); w.className='aa-bigcoin'+(c[6]?' aa-bigcoin-blur':'')+(c[7]?'':' aa-bigcoin-desk');
      w.setAttribute('data-aa-coin',i); w.setAttribute('aria-hidden','true');
      for(var k in c[2]) w.style[k]=c[2][k];
      w.style.setProperty('--s',c[3]+'px'); w.style.setProperty('--r',c[5]+'deg'); w.style.setProperty('--d',(4.5+i%4*0.8)+'s'); w.style.setProperty('--dl',(i*0.37%2)+'s');
      w.innerHTML='<div class="aa-bigcoin-par"><div class="aa-bigcoin-pop"><img src="'+C[c[1]]+'" alt="" draggable="false"></div></div>';
      s.appendChild(w); items.push({el:w,par:w.firstChild,sec:s,depth:c[4]});
    });
  }
  function tick(){
    var vh=innerHeight;
    items.forEach(function(it){
      var r=it.sec.getBoundingClientRect();
      var p=(vh-r.top)/(vh+r.height); p=Math.max(0,Math.min(1,p));
      if(!reduce) it.par.style.transform='translate3d(0,'+((0.5-p)*160*it.depth).toFixed(1)+'px,0) rotate('+((p-0.5)*30*it.depth).toFixed(1)+'deg)';
    });
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('aa-in');io.unobserve(e.target);}})},{threshold:0.2});
  function init(){
    place(); items.forEach(function(it){io.observe(it.el)}); tick();
    if(items.length<L.length) setTimeout(init,400);
  }
  var raf=0; addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(function(){raf=0;tick()})},{passive:true});
  addEventListener('resize',tick);
  if(document.readyState==='complete') setTimeout(init,300); else addEventListener('load',function(){setTimeout(init,300)});
})();
