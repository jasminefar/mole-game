// game.js

document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.getElementById('score');
    let score = 0;
    let lastHole;
    let timeUp = false;

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }

    function peep() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        hole.classList.add('up');
        const mole = document.createElement('div');
        mole.classList.add('mole');
        mole.addEventListener('click', bonk);
        hole.appendChild(mole);
        setTimeout(() => {
            hole.classList.remove('up');
            if (mole.parentNode) {
                hole.removeChild(mole);
            }
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        scoreBoard.textContent = 'Score: 0';
        timeUp = false;
        score = 0;
        peep();
        setTimeout(() => timeUp = true, 10000); // game lasts 10 seconds
    }

    function bonk(e) {
        if (!e.isTrusted) return; // cheater!
        score++;
        this.parentNode.removeChild(this);
        scoreBoard.textContent = `Score: ${score}`;
    }

    startGame();
});
