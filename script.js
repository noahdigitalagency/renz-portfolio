const header = document.querySelector('.nav'), menu = document.querySelector('.menu'), nav = document.querySelector('.nav nav');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 14));
menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.textContent = open ? 'Close' : 'Menu' });
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.textContent = 'Menu'; menu.setAttribute('aria-expanded', 'false') }));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; const counters = document.querySelectorAll('[data-target]');
if (!reduce) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; const el = entry.target, target = +el.dataset.target, start = performance.now(), duration = 1150; const update = t => { el.textContent = Math.min(target, Math.round(target * ((t - start) / duration))).toString(); if (t - start < duration) requestAnimationFrame(update) }; requestAnimationFrame(update); observer.unobserve(el) }), { threshold: .45 }); counters.forEach(c => observer.observe(c)) } else counters.forEach(c => c.textContent = c.dataset.target);
/* ==========================================
   IMAGE MODAL
========================================== */

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeButton = document.querySelector(".modal-close");

document.querySelectorAll(".dashboard-button").forEach(button => {

    button.addEventListener("click", () => {

        const image = button.dataset.image;

        modalImage.src = image;

        modal.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

});

function closeModal(){

    modal.style.display = "none";

    document.body.style.overflow = "";

}

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        closeModal();

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

    }

});


/* ==========================================
   COUNTER ANIMATION
========================================== */

const metrics = document.querySelectorAll(".metric strong");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const el = entry.target;

        const text = el.innerText;

        animateValue(el,text);

        counterObserver.unobserve(el);

    });

},{
    threshold:.5
});

metrics.forEach(metric=>counterObserver.observe(metric));


function animateValue(element,text){

    // $95 → $55
    if(text.includes("→")) return;

    // $39K+
    if(text.includes("K")){

        const number=parseInt(text.replace(/\D/g,""));

        let current=0;

        const timer=setInterval(()=>{

            current++;

            element.innerHTML="$"+current+"K+";

            if(current>=number){

                clearInterval(timer);

            }

        },40);

        return;

    }

    // 617

    if(!isNaN(parseInt(text))){

        const target=parseInt(text);

        let current=0;

        const step=Math.ceil(target/40);

        const timer=setInterval(()=>{

            current+=step;

            if(current>=target){

                current=target;

                clearInterval(timer);

            }

            element.innerHTML=current;

        },30);

    }

}


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealItems=document.querySelectorAll(

".story-card,.performance-dashboard,.metric"

);

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

revealItems.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});


/* ==========================================
   KPI HOVER EFFECT
========================================== */

document.querySelectorAll(".metric").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=`

radial-gradient(

circle at ${x}px ${y}px,

rgba(124,58,237,.22),

#191923 55%

)

`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="#191923";

});

});

