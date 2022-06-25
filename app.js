const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".content .wpm span");
const cpmTag = document.querySelector(".content .cpm span");
const tryAgainBtn = document.querySelector("button");

let charIndex = 0;
let mistake = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;

function randomParagraph() {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randomIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => {
    inputField.focus();
  });
  typingText.addEventListener("click", () => {
    inputField.focus();
  });
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedCharacter = inputField.value.split("")[charIndex];

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedCharacter == null) {
      charIndex--;
      if (mistake > 0) {
        mistake--;
      } else {
        mistake = 0;
      }
      characters[charIndex].classList.remove("incorrect");
      characters[charIndex].classList.remove("correct");
    } else {
      if (characters[charIndex].innerText === typedCharacter) {
        characters[charIndex].classList.add("correct");
      } else {
        mistake++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => {
      span.classList.remove("active");
    });
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistake;
    cpmTag.innerText = charIndex - mistake;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  inputField.value = "";
  clearInterval(timer);
  randomParagraph();
  timeLeft = maxTime;
  charIndex = mistake = 0;
  isTyping = false;
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = mistake;
  cpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
