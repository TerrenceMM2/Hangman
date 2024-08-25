export const handleSound = (id, action, loop = false) => {
  const audioEl = document.getElementById(id);
  audioEl.currentTime = 0;

  switch (action) {
    case "play":
      audioEl.play();
      break;
    case "stop":
      audioEl.pause();
      break;
    default:
      break;
  }

  if (loop) {
    audioEl.loop = loop;
  }
};
