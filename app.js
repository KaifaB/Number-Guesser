//Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Give focus to Input upon load
guessInput.focus();

//Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener("click", function() {
    let guess = parseInt(guessInput.value);

    //Validate Input
    if(isNaN(guess) || guess < min || guess > max){
        console.log("change");
        setMessage(`Please enter a number betweeen ${min} and ${max}`, 'red');
    }
    //Right number
    if (guess === winningNum){
        //game over -- WON
        gameOver(true, `${winningNum} is correct!!, You WIN`)

    } else {
        //Wrong number
        guessesLeft -= 1;
        guessInput.focus();

        if(guessesLeft === 0){
            //Game over, LOST
            gameOver(false, `Game Over, you lost.. Correct number was ${winningNum}`);
        } else { //Game continue, wrong answer
            //Tell user it is the wrong number
            setMessage(`${guess} not correct, ${guessesLeft} guesses left`, "red");
            //clear input
            guessInput.value = '';
            //Change border color
            guessInput.style.borderColor = 'red';

        }
    }
});

//Game over function
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Change border and text color
    guessInput.style.borderColor = color;
    message.style.color = color;
    //Set winning message
    setMessage(msg);

    //Play again?
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

//Get winning number
function getRandomNum(){
    return Math.floor(Math.random() *((max-min) + 1) + min);
}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}