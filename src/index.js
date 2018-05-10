class baseballGame {
    player = [];
    answer = [];
    strike = 0;
    ball = 0;

    randomNumber(n) {
        let len = n;
        this.answer = new Array(len);
        this.answer.fill(0);

        for (let i = 0; i < len; i++) {
            this.answer[i] = Math.floor(Math.random() * 10).toString();
            for (let j = 0; j < i; j++) {
                if (this.answer[i] === this.answer[j]) {
                    i--;
                    break;
                }
            }
        }
        return this.answer;
    }
    check() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.player[i] === this.answer[j]) {
                    if (i === j) {
                        this.strike++;
                    } else {
                        this.ball++;
                    }
                }
            }
        }
    }
}

const game = new baseballGame();

const inputEls = document.querySelectorAll('.number')
const trialEl = document.querySelector('.trial');
const resetEl = document.querySelector('.reset');
const displayEl = document.querySelector('.display');

const round__countEl = document.querySelector('.round__count');
const round__displayEls = document.querySelectorAll('.round__display');
const round__resultEl = document.querySelector('.round__result');
const final__answerEl = document.querySelector('.final_answer');

init();
console.log(game.answer);

inputEls.forEach((el, index) => {
    el.addEventListener('input', e => {
        game.player[index] = e.target.value;
        console.log(game.player);
    })
})

trialEl.addEventListener('click', e => {
    displayEl.style.display = 'contents'
    if (cnt <= 8) {
        round__countEl.textContent = `${++cnt}회차`;
        round__displayEls.forEach((el, index) => {
            el.textContent = game.player[index];
        })
        game.check();
        round__resultEl.textContent = `${game.strike} S ${game.ball} B`
        game.strike = 0, game.ball = 0;
    } else {
        final__answerEl.textContent = game.answer;
        document.querySelector('.trial').disabled = true;
    }
})

//리셋 버튼 눌렀을 때 
//게임상태 초기화
resetEl.addEventListener('click', e => {
    trialEl.disabled = false;
    game.player = [];
    console.log('reset');
    round__displayEls.forEach((el, index) => {
        el.textContent = '';
    })
    inputEls.forEach((el, index) => {
        el.value = '';
    })
    round__countEl.textContent = '';
    round__resultEl.textContent = '';
    final__answerEl.textContent = '';
    init();
})

function init() {
    game.answer = game.randomNumber(3);
    cnt = 0;
    game.strike = 0;
    game.ball = 0;
    displayEl.style.display = 'none';
}