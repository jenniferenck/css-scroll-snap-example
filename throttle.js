// ES6 code
let current_scroll_position = 0;
let previous_scroll_position;
let scroll_direction;

function throttled(delay, fn) {
  let lastScrollCall = 0;
  return function(...args) {
    //   calc if enough time has passed, if not, exit
    const now = new Date().getTime();

    // set scroll position & direction
    previous_scroll_position = current_scroll_position;
    current_scroll_position = window.scrollY;

    scroll_direction =
      current_scroll_position - previous_scroll_position > 0 ? 'down' : 'up';

    if (now - lastScrollCall < delay) {
      return;
    }

    // execute scroll to next frame
    lastScrollCall = now;
    return fn(scroll_direction);
  };
}

const scrollToNextFrame = scroll_direction => {
  console.log(event, 'scrolling ' + current_scroll_position);
  // do something with the event
  if (scroll_direction === 'down') {
    if (current_scroll_position < 511) {
      let nextDiv = document.getElementById('slide-1');
      nextDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      //   window.scrollTo({
      //     top: 520,
      //     left: 0,
      //     behavior: 'smooth'
      //   });
    } else if (
      current_scroll_position >= 511 &&
      current_scroll_position < 1011
    ) {
      let nextDiv = document.getElementById('slide-2');
      nextDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      //   window.scrollTo({ top: 1011, left: 0, behavior: 'smooth' });
    }
  }

  if (scroll_direction === 'up') {
    if (current_scroll_position >= 900) {
      window.scrollTo({
        top: 521,
        left: 0,
        behavior: 'smooth'
      });
    } else if (
      current_scroll_position >= 521 &&
      current_scroll_position < 1011
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
};

const scrollHandler = throttled(1500, scrollToNextFrame);

window.addEventListener('scroll', scrollHandler);
