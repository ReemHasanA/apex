document.addEventListener("DOMContentLoaded", function () {
  const text = document.querySelector('.animated-text');
  const textContent = text.textContent;
  text.textContent = '';

  // Split the text by spaces and process each word separately
  const words = textContent.split(' ');

  words.forEach((word, wordIndex) => {
    // For each word, loop through its letters
    const span = document.createElement('span');
    span.classList.add('word');
    span.textContent = word;
    span.style.animationDelay = `${(wordIndex * 0.5 )}s`; // Delay per word
    text.appendChild(span);


    // After each word, add a space
    if (wordIndex < words.length - 1) {
      const space = document.createElement('span');
      space.classList.add('space');
      space.textContent = ' '; // Space as a span
      space.style.animationDelay = `${(wordIndex * 0.5 + word.length * 0.1)}s`; // Delay for space
      text.appendChild(space);
    }
  });
});

document.getElementById('y').textContent = new Date().getFullYear()

new WOW().init();