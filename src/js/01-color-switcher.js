const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let colorTimer = null;

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  btnDisabled(stopBtn, startBtn);
  colorTimer = setInterval(onChangeBgColor, 1000);
});

stopBtn.addEventListener('click', () => {
  btnDisabled(startBtn, stopBtn);
  clearInterval(colorTimer);
});

function btnDisabled(start, stop) {
  start.disabled = false;
  stop.disabled = true;
}
