const words = [
  "Abendbrot",
  "Brueckentag",
  "Erklaerungsnot",
  "Fingerspitzengefuehl",
  "Fremdschaemen",
  "Geborgenheit",
  "Geschmacksverirrung",
  "Schweinehund",
  "Kopfkino",
  "Kummerspeck",
  "Schnapsidee",
  "Torschlusspanik",
  "verabredet",
  "verschlimmbessern",
  "Vorfreude",
  "Weltschmerz",
  "Zeitgeist",
  "Zugzwang",
];



let selectedWord: string;
let displayedWord: string[];
let wrongGuesses: number;
const maxWrongGuesses = 6;

function startNewGame(): void {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.length).fill("_");
    wrongGuesses = 0;
    updateDisplay();
    createAlphabetButtons();
    resetHangman();
}


//#
function updateDisplay(): void {
    const wordDisplay = document.querySelector("#word-display") as HTMLElement;
    wordDisplay.innerText = displayedWord.join(" ");
    const wrongGuessesDisplay = document.querySelector("#wrong-guesses") as HTMLElement;
    wrongGuessesDisplay.innerText = wrongGuesses.toString();
}
//#
function createAlphabetButtons(): void {
    const alphabetContainer = document.querySelector("#alphabet") as HTMLElement;
    alphabetContainer.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.innerText = letter;
        button.className = "px-[1vw] py-[0.5vh] bg-gray-200/[.8] rounded-[100px] shadow-2xl";
        button.onclick = () => handleGuess(letter, button);
        alphabetContainer.appendChild(button);
    });
}
//#
function resetHangman(): void {
    const hangmanParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    hangmanParts.forEach(part => {
        const element = document.querySelector(`#${part}`) as SVGElement;
        if (element) {
            element.setAttribute("visibility", "hidden");
        }
    });
}

function handleGuess(letter: string, button: HTMLButtonElement): void {
    button.disabled = true;
    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            displayedWord[i] = letter;
            correctGuess = true;
        }
    }

    if (correctGuess) {
        button.style.backgroundColor = "green";
    } else {
        button.style.backgroundColor = "red";
        wrongGuesses++;
        updateHangman();
    }

    updateDisplay();

    setTimeout(() => {
        if (wrongGuesses >= maxWrongGuesses) {
            alert("Game Over! The word was: " + selectedWord);
            startNewGame();
        } else if (!displayedWord.includes("_")) {
            alert("You Win! The word was: " + selectedWord);
            startNewGame();
        }
    }, 500);
}

function updateHangman(): void {
    const hangmanParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    const part = hangmanParts[wrongGuesses - 1];
    const element = document.querySelector(`#${part}`) as HTMLElement | null;
    if (element) {
        (element).setAttribute("visibility", "visible");
    }
}


const startGameButton = document.querySelector("#start-game-btn") as HTMLButtonElement;
if (startGameButton) {
    startGameButton.onclick = () => {
        window.location.reload();
    };
}

startNewGame();
