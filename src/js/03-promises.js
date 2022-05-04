import Notiflix from 'notiflix';

const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  let amountValue = Number(form.amount.value);
  let delayValue = Number(form.delay.value);
  let stepValue = Number(form.step.value);
  let delayNow = delayValue;
  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayNow)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNow += stepValue;
  }
  event.preventDefault();
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
