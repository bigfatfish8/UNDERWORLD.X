document.addEventListener('DOMContentLoaded', () => {
  // ---- TYPEWRITER (runs if #typewriter exists) ----
  const typeEl = document.getElementById("typewriter");
  if (typeEl) {
    const text = "explore the underworld";
    const speed = 80;
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typeEl.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
  }

  // ---- GALLERY NAVIGATION (only if art pieces are present) ----
  const artPieces = document.querySelectorAll('.art-piece');
  const dots = document.querySelectorAll('.dot');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (artPieces.length && nextBtn && prevBtn && dots.length) {
    let currentIndex = 0;

    function showArt(index) {
      artPieces.forEach(p => p.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      artPieces[index].classList.add('active');
      dots[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % artPieces.length;
      showArt(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + artPieces.length) % artPieces.length;
      showArt(currentIndex);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        currentIndex = parseInt(e.target.dataset.index, 10);
        showArt(currentIndex);
      });
    });

    // show first piece
    showArt(currentIndex);
  }
});
