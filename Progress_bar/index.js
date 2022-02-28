const progress = document.getElementById('progress');
const pre = document.getElementById('pre');
const next = document.getElementById('next');
const curcles = document.querySelectorAll('.cicyle');

let number = 1;

next.addEventListener('click', () => {
    number++;

    if(number > curcles.length) {
        number = curcles.length;
    }

    update();
});

pre.addEventListener('click', () => {
    number--;

    if(number < 1) {
        number = 1;
    }

    update();
});

function update() {

    curcles.forEach((circle, idx) => {
        if(idx < number) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');

    progress.style.width = ((actives.length - 1) / (curcles.length - 1)) * 100 + "%";

    if(number === 1) {
        pre.disabled = true;
    } else if (number === curcles.length) {
        next.disabled = true;
    } else {
        pre.disabled = false;
        next.disabled = false;
    }
}