// Animate on scroll using IntersectionObserver
// Adds 'in-view' class to elements with .animate-on-scroll when they intersect

(function(){
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  };

  function applyObserver(selector = '.animate-on-scroll'){
    const elements = document.querySelectorAll(selector);
    if(!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        const el = entry.target;
        if(entry.isIntersecting){
          // handle optional delay in ms from data-delay or CSS var --delay
          const delayAttr = el.getAttribute('data-delay');
          if(delayAttr){
            el.style.setProperty('--delay', `${parseInt(delayAttr,10)}ms`);
            // ensure stagger class is present so transition-delay applies
            el.classList.add('stagger');
          }

          el.classList.add('in-view');

          // If data-once is 'true' (default) unobserve after first reveal
          const once = el.getAttribute('data-once');
          if(once === null || once === 'true'){
            obs.unobserve(el);
          }
        } else {
          // If data-once is explicitly 'false', allow toggling
          const once = el.getAttribute('data-once');
          if(once === 'false'){
            el.classList.remove('in-view');
          }
        }
      });
    }, defaultOptions);

    elements.forEach(el => observer.observe(el));
  }

  // Auto-init on DOMContentLoaded
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => applyObserver());
  } else {
    applyObserver();
  }

  window.EoHAnimateOnScroll = { init: applyObserver };
})();
const cards = document.querySelectorAll('.tip-timeline');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2 
});
cards.forEach(card => {
  observer.observe(card);
});
