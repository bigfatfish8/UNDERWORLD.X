// gallery.js

document.addEventListener('DOMContentLoaded', () => {
    const artPieces = document.querySelectorAll('.art-piece');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;
  
    function showArt(index) {
      artPieces.forEach(p => p.classList.remove('active'));
      artPieces[index].classList.add('active');
    }
  
    if (artPieces.length && nextBtn && prevBtn) {
      // Display the first piece initially
      showArt(currentIndex);
  
      // Next arrow
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % artPieces.length;
        showArt(currentIndex);
      });
  
      // Previous arrow
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + artPieces.length) % artPieces.length;
        showArt(currentIndex);
      });
    }
  });
  