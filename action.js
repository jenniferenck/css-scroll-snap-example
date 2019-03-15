// Setup a timer
let isScrolling = false;
let pauseScrollListener;
let last_known_scroll_position = 0;
let endScrollHandle;

async function scrollToNextFrame(scroll_pos, direction) {
  // Do something with the scroll position
  console.log('scroll position', scroll_pos, direction);
  window.removeEventListener('scroll', handleScroll);

  //   If UP or DOWN
  if (direction === 'down') {
    if (scroll_pos < 511) {
      await window.scrollTo({ top: 511, left: 0, behavior: 'smooth' });
    } else if (scroll_pos >= 511 && scroll_pos < 1011) {
      await window.scrollTo({ top: 1011, left: 0, behavior: 'smooth' });
    }
  }

  if (direction === 'up') {
    if (scroll_pos >= 511 && scroll_pos <= 1011) {
      await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (scroll_pos >= 1011) {
      await window.scrollTo({ top: 511, left: 0, behavior: 'smooth' });
    }
  }
}

// Listen for resize events
window.addEventListener('scroll', handleScroll);

function handleScroll() {
  // Setup the new requestAnimationFrame()
  if (isScrolling) {
    return;
  }
  isScrolling = true;

  //   clear timeout;
  clearTimeout(endScrollHandle);

  // keep track of previous scroll position and calc direction
  let direction = 'down';
  let previous_scroll_position = last_known_scroll_position;
  last_known_scroll_position = window.scrollY;

  if (previous_scroll_position > last_known_scroll_position) {
    direction = 'up';
  }

  // Run our scroll functions
  scrollToNextFrame(last_known_scroll_position, direction);
  endScrollHandle = setTimeout(function() {
    isScrolling = false;
    console.log('changed scroll back to false');
  }, 200);
  //   });
}
