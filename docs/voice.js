let recognizer;
let answer;
let prev;
let prev2;
const OPERATORS = ['+', '-', '*'];

const KEY = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}

function predictWord() {
  const words = recognizer.wordLabels();
  recognizer.listen(({ scores }) => {
    scores = Array.from(scores).map((s, i) => ({ score: s, word: words[i] }));

    scores.sort((s1, s2) => s2.score - s1.score);
    document.querySelector('#console').textContent = scores[0].word;

    if (("" + answer).length == 1 && KEY[scores[0].word] === answer) {
      writeEq();
      document.querySelector('#info').textContent = `Nice Job`;
    }
    else if (("" + answer).length == 2 && +(KEY[prev] + "" + KEY[scores[0].word]) === answer) {
      writeEq();
      document.querySelector('#info').textContent = `Nice Job`;
    } else if (+(KEY[prev2] + "" + KEY[prev] + "" + KEY[scores[0].word]) === answer) {
      writeEq();
      document.querySelector('#info').textContent = `Nice Job`;
    } else {
      document.querySelector('#info').textContent = `Not Quite`;
    }
    prev2 = prev;
    prev = scores[0].word;


  }, { probabilityThreshold: 0.75 });

}

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max));
}

function writeEq() {
  let operator = OPERATORS[getRandomInt(0, OPERATORS.length)];
  if (operator === '+') {
    var a = getRandomInt(0, 80);
    var b = getRandomInt(0, 80);

    answer = a + b;

  } else if (operator === '-') {
    var a = getRandomInt(0, 80);
    var b = getRandomInt(0, a);

    answer = a - b;

  } else if (operator === '*') {
    var a = getRandomInt(2, 12);
    var b = getRandomInt(2, 12);
  
    answer = a * b;

  
  }


  document.querySelector('#equation').textContent = `${a} ${operator} ${b} = (say individually)`;

}

async function app() {
  recognizer = speechCommands.create("BROWSER_FFT")
  await recognizer.ensureModelLoaded();

  writeEq();
  predictWord();


}


app();