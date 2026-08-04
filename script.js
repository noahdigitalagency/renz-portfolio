const header=document.querySelector('.nav'),menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>14));
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'Close':'Menu'});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='Menu';menu.setAttribute('aria-expanded','false')}));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const counters=document.querySelectorAll('[data-target]');
if(!reduce){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=+el.dataset.target,start=performance.now(),duration=1150;const update=t=>{el.textContent=Math.min(target,Math.round(target*((t-start)/duration))).toString();if(t-start<duration)requestAnimationFrame(update)};requestAnimationFrame(update);observer.unobserve(el)}),{threshold:.45});counters.forEach(c=>observer.observe(c))}else counters.forEach(c=>c.textContent=c.dataset.target);
