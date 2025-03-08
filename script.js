let hrs = 0,
mins = 0,
sec = 0,
ms = 0,
running = false,
laps = 0,
intervalId;

function addTrailingZero(num) {
    return num < 10 ? "0" + num : num;
}

function update() {
    document.querySelector('#hour').textContent = addTrailingZero(hrs);
    document.querySelector('#min').textContent = addTrailingZero(mins);
    document.querySelector('#sec').textContent = addTrailingZero(sec);
    document.querySelector('#milisec').textContent = addTrailingZero(ms);
}

function stopwatch() {
    if(++ms === 100) {
        ms = 0;
        if(++sec === 60) {
            sec = 0;
            if(++mins === 60) {
                mins = 0;
                hrs++;
            }
        }
    }
    update();
}

function startStopwatch() {
    if(!running) {
        intervalId = setInterval(stopwatch, 10);
        running = true;
        document.querySelector('.start').classList.add('hidden');
        document.querySelector('.stop').classList.remove('hidden');
        document.querySelector('.reset').classList.remove('hidden');
        document.querySelector('.lap-btn').classList.remove('hidden');
    }
}

function stopStopwatch() {
    if(running) {
        clearInterval(intervalId);
        running = false;
        document.querySelector('.start').classList.remove('hidden');
        document.querySelector('.stop').classList.add('hidden');
        document.querySelector('.lap-btn').classList.add('hidden');
    }
}

function resetStopwatch() {
    stopStopwatch();
    hrs = mins = sec = ms = laps = 0;
    update();

    document.querySelector('.laps').innerHTML = '';

    document.querySelector('.start').classList.remove('hidden');
    document.querySelector('.stop').classList.add('hidden');
    document.querySelector('.reset').classList.add('hidden');
    document.querySelector('.lap-btn').classList.add('hidden');
}

function lap() {
    if(running) {
        document.querySelector('.laps').innerHTML = `<div class="lap"><p>Lap ${++laps}</p><p>${addTrailingZero(hrs)}:${addTrailingZero(mins)}:${addTrailingZero(sec)}:${addTrailingZero(ms)}</p></div>` + document.querySelector('.laps').innerHTML;
    }
}

document.querySelector('.start').addEventListener('click', startStopwatch);
document.querySelector('.stop').addEventListener('click', stopStopwatch);
document.querySelector('.reset').addEventListener('click', resetStopwatch);
document.querySelector('.lap-btn').addEventListener('click', lap);