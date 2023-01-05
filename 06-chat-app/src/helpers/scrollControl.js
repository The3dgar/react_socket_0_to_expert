import { animateScroll } from 'react-scroll';

export const scrollControl = (id, duration = 0) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration,
  });
};
