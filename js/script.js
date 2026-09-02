/* =========================
   FAQ
========================= */
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
    });

    if (!isOpen) item.classList.add('open');
  });
});

/* =========================
   Slider
   STEPとレビューを同じ仕組みで操作
========================= */
function setupSlider(selector, dotsSelector) {
  const wrap = document.querySelector(selector)?.closest('.slider-wrap');
  const track = document.querySelector(selector);
  const dots = document.querySelector(dotsSelector);
  if (!wrap || !track) return;

  const cards = [...track.querySelectorAll('.slide-card')];
  const prev = wrap.querySelector('.slider-arrow.prev');
  const next = wrap.querySelector('.slider-arrow.next');
  if (!cards.length) return;

  const makeDots = () => {
    if (!dots) return;
    dots.innerHTML = '';
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        cards[index].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
      });
      dots.appendChild(dot);
    });
  };

  const updateDots = () => {
    if (!dots) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < distance) {
        distance = d;
        closest = index;
      }
    });
    dots.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === closest);
    });
  };

  const move = (direction) => {
    const cardWidth = cards[0].getBoundingClientRect().width + 20;
    track.scrollBy({left: direction * cardWidth, behavior:'smooth'});
  };

  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  track.addEventListener('scroll', () => requestAnimationFrame(updateDots));
  window.addEventListener('resize', updateDots);

  makeDots();
  updateDots();
}

setupSlider('.steps', '.step-dots');
setupSlider('.reviews', '.review-dots');
