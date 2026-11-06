(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
// menu mobile
const burger=$('.burger'),nav=$('.nav');
burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.setAttribute('aria-expanded',false)}));
// link ativo
const links=$$('.nav a'),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>io.observe(s));
// filtros da galeria
const items=$$('.gallery figure');
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{
 $$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 items.forEach(f=>f.hidden=b.dataset.f!=='todas'&&f.dataset.cat!==b.dataset.f);
}));
// lightbox
const lb=$('.lb'),lbi=$('img',lb);let list=[],idx=0,last;
function show(){const im=$('img',list[idx]);lbi.src=im.src;lbi.alt=im.alt}
function open(f){list=items.filter(x=>!x.hidden);idx=list.indexOf(f);show();lb.classList.add('open');last=document.activeElement;$('.x',lb).focus()}
function close(){lb.classList.remove('open');last&&last.focus()}
function go(d){idx=(idx+d+list.length)%list.length;show()}
items.forEach(f=>$('button',f).addEventListener('click',()=>open(f)));
$('.x',lb).onclick=close;$('.p',lb).onclick=()=>go(-1);$('.n',lb).onclick=()=>go(1);
lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;
 if(e.key==='Escape')close();if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
// header ao rolar
const hd=$('.site-header');const sc=()=>hd.classList.toggle('sc',scrollY>30);sc();addEventListener('scroll',sc,{passive:true});
// animações de entrada
const rev=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rev.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
const R=(sel,cls='')=>$$(sel).forEach((el,i)=>{el.classList.add('rv');cls&&el.classList.add(cls);el.style.setProperty('--d',(i%4)*.1+'s');rev.observe(el)});
R('section h2');R('.lead');R('.strip li');R('.card');R('.why article');R('.about img','rv-l');R('.about > div','rv-r');
R('.filters');R('.gallery figure','rv-z');R('.who li','rv-z');R('details');R('.quote .wrap > *');R('.contact > div','rv-l');R('.map','rv-r');R('.fgrid > div');
$('#ano').textContent=new Date().getFullYear();
})();
