const header = document.querySelector('.nav'),
    menu = document.querySelector('.menu'),
    nav = document.querySelector('.nav nav');


// =========================================================
// NAVIGATION — SCROLL EFFECT
// =========================================================

addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 14);
});


// =========================================================
// MOBILE MENU
// =========================================================

menu?.addEventListener('click', () => {

  const open = nav.classList.toggle('open');

  menu.setAttribute('aria-expanded', open);

});


// =========================================================
// CLOSE MENU WHEN NAVIGATION LINK IS CLICKED
// =========================================================

document.querySelectorAll('nav a').forEach(a => {

  a.addEventListener('click', () => {

    nav.classList.remove('open');

    menu.setAttribute('aria-expanded', 'false');

  });

});


// =========================================================
// REDUCED MOTION
// =========================================================

const reduce =
  matchMedia('(prefers-reduced-motion: reduce)').matches;


// =========================================================
// NUMBER COUNTERS
// =========================================================

const counters =
  document.querySelectorAll('[data-target]');


if (!reduce) {

  const observer =
    new IntersectionObserver(

      entries => entries.forEach(entry => {

        if (!entry.isIntersecting) return;


        const el =
          entry.target;

        const target =
          +el.dataset.target;

        const start =
          performance.now();

        const duration =
          1150;


        const update = t => {

          const progress =
            Math.min(
              (t - start) / duration,
              1
            );


          el.textContent =
            Math.round(
              target * progress
            ).toString();


          if (progress < 1) {

            requestAnimationFrame(update);

          }

        };


        requestAnimationFrame(update);

        observer.unobserve(el);

      }),

      {
        threshold: 0.45
      }

    );


  counters.forEach(c =>
    observer.observe(c)
  );


} else {

  counters.forEach(c => {

    c.textContent =
      c.dataset.target;

  });

}
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

/* ==========================================================
   TESTIMONIAL SECTION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initTestimonials();

});

function initTestimonials() {

    revealTestimonials();

    animateStats();

    tiltCards();

    hoverGlow();

}

/* ==========================================================
   SCROLL REVEAL
========================================================== */

function revealTestimonials() {

    const cards = document.querySelectorAll(
        ".testimonial-card, .testimonial-stats > div"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            setTimeout(() => {

                entry.target.classList.add("visible");

            }, index * 120);

            observer.unobserve(entry.target);

        });

    }, {
        threshold: .15
    });

    cards.forEach(card => {

        card.classList.add("reveal");

        observer.observe(card);

    });

}

/* ==========================================================
   STATS COUNTER
========================================================== */

function animateStats() {

    const stats = document.querySelectorAll(".testimonial-stats strong");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            counter(entry.target);

            observer.unobserve(entry.target);

        });

    }, {

        threshold: .6

    });

    stats.forEach(stat => observer.observe(stat));

}

function counter(el) {

    const text = el.innerText;

    if (text.includes("★")) return;

    if (text.includes("%")) return;

    const target = parseInt(text.replace(/\D/g, ""));

    if (isNaN(target)) return;

    let value = 0;

    const step = Math.ceil(target / 35);

    const timer = setInterval(() => {

        value += step;

        if (value >= target) {

            value = target;

            clearInterval(timer);

        }

        if (text.includes("+")) {

            el.innerHTML = value + "+";

        }

        else {

            el.innerHTML = value;

        }

    }, 30);

}

/* ==========================================================
   TILT EFFECT
========================================================== */

function tiltCards() {

    document.querySelectorAll(".testimonial-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - .5) * -6;

            const rotateY = ((x / rect.width) - .5) * 6;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}

/* ==========================================================
   HOVER GLOW
========================================================== */

function hoverGlow() {

    document.querySelectorAll(".testimonial-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(circle at ${x}px ${y}px,
                rgba(124,58,237,.18),
                transparent 45%),
                linear-gradient(180deg,#17171f,#13131a)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "";

        });

    });

}

/* ==========================================================
   MY PROCESS
========================================================== */

const processData = [
    {
        step: "STEP 01",
        title: "Discover",
        description:
            "Every successful project starts with understanding the business. Before building anything, I identify business goals, customer journeys, operational bottlenecks, and growth opportunities to ensure every recommendation is aligned with measurable outcomes.",
        checklist: [
            "Business Audit",
            "Goals & KPIs",
            "Customer Journey",
            "Growth Opportunities"
        ]
    },

    {
        step: "STEP 02",
        title: "Strategy",
        description:
            "With a clear understanding of the business, I create a tailored strategy focused on measurable growth. Every recommendation is backed by data and aligned with your objectives before implementation begins.",
        checklist: [
            "Marketing Strategy",
            "Automation Planning",
            "Funnel Mapping",
            "Project Roadmap"
        ]
    },

    {
        step: "STEP 03",
        title: "Build",
        description:
            "This is where strategy becomes reality. Campaigns, CRM automations, dashboards, APIs, and workflows are built into one connected system designed to perform efficiently.",
        checklist: [
            "Paid Advertising",
            "CRM Automation",
            "Workflow Integration",
            "Analytics Dashboard"
        ]
    },

    {
        step: "STEP 04",
        title: "Scale",
        description:
            "After launch, successful campaigns are scaled while bottlenecks are removed. Every optimization is based on performance data to maximize growth and efficiency.",
        checklist: [
            "Budget Scaling",
            "Performance Review",
            "Campaign Expansion",
            "Revenue Growth"
        ]
    },

    {
        step: "STEP 05",
        title: "Optimize",
        description:
            "Optimization never stops. Every campaign, automation, and workflow is continuously measured, refined, and improved to maximize long-term ROI.",
        checklist: [
            "A/B Testing",
            "Reporting",
            "Continuous Improvement",
            "Performance Optimization"
        ]
    }
];


/* ==========================================================
   ELEMENTS
========================================================== */

const timelineSteps = document.querySelectorAll(".timeline-step");
const timelineProgress = document.querySelector(".timeline-progress");

const processStep = document.querySelector(".process-step");
const processTitle = document.querySelector(".process-title");
const processDescription = document.querySelector(".process-description");
const processChecklist = document.querySelector(".process-checklist");


/* ==========================================================
   UPDATE CONTENT
========================================================== */

function updateContent(index){

    const item = processData[index];

    // Fade Out

    [
        processStep,
        processTitle,
        processDescription,
        processChecklist

    ].forEach(el=>{

        el.style.opacity = "0";
        el.style.transform = "translateY(12px)";

    });

    setTimeout(()=>{

        processStep.textContent = item.step;

        processTitle.textContent = item.title;

        processDescription.textContent = item.description;

        processChecklist.innerHTML = "";

        item.checklist.forEach(text=>{

            const div = document.createElement("div");

            div.className = "check-item";

            div.innerHTML = `
                <span>✓</span>
                ${text}
            `;

            processChecklist.appendChild(div);

        });

        [
            processStep,
            processTitle,
            processDescription,
            processChecklist

        ].forEach(el=>{

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";

        });

    },200);

}


/* ==========================================================
   UPDATE TIMELINE
========================================================== */

function updateTimeline(index){

    timelineSteps.forEach((step,i)=>{

        step.classList.remove("active","completed");

        if(i < index){

            step.classList.add("completed");

        }

        if(i === index){

            step.classList.add("active");

        }

    });

    const progress =
        (index/(timelineSteps.length-1))*100;

    timelineProgress.style.setProperty(
        "--progress",
        `${progress}%`
    );

}


/* ==========================================================
   CHANGE STEP
========================================================== */

function changeStep(index){

    updateTimeline(index);

    updateContent(index);

}


/* ==========================================================
   EVENTS
========================================================== */

timelineSteps.forEach((step,index)=>{

    step.addEventListener("click",()=>{

        changeStep(index);

    });

});


/* ==========================================================
   INITIALIZE
========================================================== */

changeStep(0);

/* =========================================================
   CASE STUDY 02 — MARKETING AUTOMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const caseStudy = document.querySelector(".case-study-02");

  // Stop if Case 02 doesn't exist
  if (!caseStudy) return;


  /* =========================================================
     1. SCROLL REVEAL
     ========================================================= */

  const revealElements = [
    ".case-study-label",
    ".context-card",
    ".case-study-dashboard"
  ];


  revealElements.forEach((selector) => {

    const elements =
      caseStudy.querySelectorAll(selector);


    elements.forEach((element, index) => {

      element.classList.add("case02-reveal");

      element.style.transitionDelay =
        `${index * 100}ms`;

    });

  });


  /* =========================================================
     2. INTERSECTION OBSERVER
     ========================================================= */

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "case02-visible"
          );

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  caseStudy
    .querySelectorAll(".case02-reveal")
    .forEach((element) => {

      revealObserver.observe(element);

    });


  /* =========================================================
     3. METRIC CARD INTERACTION
     ========================================================= */

  const metricCards =
    caseStudy.querySelectorAll(".metric-card");


  metricCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

      card.classList.add("metric-active");

    });


    card.addEventListener("mouseleave", () => {

      card.classList.remove("metric-active");

    });

  });


  /* =========================================================
     4. TECHNOLOGY TAG INTERACTION
     ========================================================= */

  const tags =
    caseStudy.querySelectorAll(
      ".dashboard-tags span"
    );


  tags.forEach((tag) => {

    tag.addEventListener("mouseenter", () => {

      tag.classList.add("tag-active");

    });


    tag.addEventListener("mouseleave", () => {

      tag.classList.remove("tag-active");

    });

  });


  /* =========================================================
     5. CTA — SMOOTH SCROLL
     ========================================================= */

  const cta =
    caseStudy.querySelector(".case-study-cta");


  if (cta) {

    cta.addEventListener("click", (event) => {

      const href =
        cta.getAttribute("href");


      // Only handle internal anchors
      if (
        !href ||
        !href.startsWith("#")
      ) {
        return;
      }


      const target =
        document.querySelector(href);


      if (!target) return;


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }


  /* =========================================================
     6. REDUCED MOTION SUPPORT
     ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (reducedMotion.matches) {

    caseStudy
      .querySelectorAll(".case02-reveal")
      .forEach((element) => {

        element.classList.add(
          "case02-visible"
        );

        element.style.transitionDelay =
          "0ms";

      });

  }

});
