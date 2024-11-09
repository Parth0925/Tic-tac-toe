let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Check if box is empty
            box.innerText = turnO ? "O" : "X"; // Set text based on turn
            box.classList.add(turnO ? 'o' : 'x'); // Add class for styling
            turnO = !turnO; // Switch turn
            box.disabled = true;

            checkWinner();
        }
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide"); 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Check if box is empty
            box.innerText = turnO ? "O" : "X"; // Set text based on turn
            turnO = !turnO; // Switch turn
            box.disabled = true;

            checkWinner();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val && pos2Val && pos3Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Exit function after finding a winner
        }
    }

    // Check for a draw
    const allBoxesFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allBoxesFilled) {
        showDraw();
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newbtn.addEventListener("click", resetGame);
rstbtn.addEventListener("click", resetGame); 
